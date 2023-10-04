import ListView from '../view/list-view.js';
import {
  remove,
  render,
  replace,
  RenderPosition,
} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import { InformationMessage, TimeLimit, enableSortType } from '../const.js';
import MessageView from '../view/message-view.js';
import { SortType, TypeOfChange, UserAction } from '../const.js';
import { sort } from '../utils/sort.js';
import EventPresenter from './event-presenter.js';
import { filter } from '../utils/filter.js';
import CreatingPresenter from './creating-presenter.js';
import { getMappedObjectsByIds } from '../utils/event.js';
import { NoEventText } from '../const.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class RoutePresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;
  #eventModel = null;
  #filterModel = null;
  #addingModel = null;

  #eventListComponent = new ListView();
  #sortComponent = null;
  #messageComponent = null;
  #eventPresenters = new Map();
  #creatingPresenter = null;

  #currentSortType = SortType.DAY;

  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({
    container,
    destinationModel,
    offerModel,
    eventModel,
    filterModel,
    addingModel,
  }) {
    this.#container = container;
    this.#destinationsModel = destinationModel;
    this.#offersModel = offerModel;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;
    this.#addingModel = addingModel;

    this.#creatingPresenter = new CreatingPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#userActionHandler,
      onDestroy: this.#creatingFormDestroyHandler,
      getAllDestinations: this.#getDestinationsHandler,
      getAllOffersByType: this.#getOffersByTypeHandler,
      getDestinationByName: this.#getDestinationByNameHandler,
    });

    this.#eventModel.addObserver(this.#changingModelHandler);
    this.#addingModel.addObserver(this.#changingModelHandler);
    this.#filterModel.addObserver(this.#changingModelHandler);
  }

  async init() {
    this.#renderBoard();
  }

  get events() {
    const filterType = this.#filterModel.filter;
    const filteredEvents = filter[filterType](this.#eventModel.events);

    return sort[this.#currentSortType](filteredEvents);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#userActionHandler,
      onModeChange: this.#modeChangeHandler,
      getAllDestinations: this.#getDestinationsHandler,
      getAllOffersByType: this.#getOffersByTypeHandler,
      getDestinationByName: this.#getDestinationByNameHandler,
      getCheckedOffers: this.#getCheckedOffersHandler,
      getDestinationById: this.#getDestinationByIdHandler,
    });

    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderSort() {
    const prevSortComponent = this.#sortComponent;

    const sortingDescription = this.#getSortDescription(this.#currentSortType);

    this.#sortComponent = new SortView({
      sorts: sortingDescription,
      onChangeSort: this.#sortEventHandler,
    });

    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    }
  }

  #renderBoard() {
    const quantityEvents = this.#filterModel.getQuantityByCurrentType([
      ...this.#eventModel.events,
    ]);

    render(this.#eventListComponent, this.#container);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (quantityEvents === 0 && !this.#addingModel.isPressed) {
      this.#renderNoEvents();
      return;
    }

    if (this.#messageComponent !== null) {
      remove(this.#messageComponent);
    }

    this.#renderSort();
    this.#renderEvents();
  }

  #renderEvents() {
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #clearEvents = () => {
    this.#creatingPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  };

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#clearEvents();

    remove(this.#sortComponent);
    this.#sortComponent = null;

    if (this.#messageComponent) {
      remove(this.#messageComponent);
      this.#messageComponent = null;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #createMessageComponent(message) {
    if (this.#messageComponent !== null) {
      remove(this.#messageComponent);
    }

    this.#messageComponent = new MessageView({ message });
    render(this.#messageComponent, this.#container);
  }

  #renderNoEvents() {
    const message = NoEventText[this.#filterModel.filter];
    this.#createMessageComponent(message);
  }

  #renderError() {
    const message = InformationMessage.INITIALIZE_FAILURE;
    this.#createMessageComponent(message);
  }

  #renderLoading() {
    const message = 'Loading...';
    this.#createMessageComponent(message);
  }

  /**
   * INFO: Отвечает за обработку действия пользователя
   * Сюда приходят "действия" пользователя
   * из вьюхи EventFormView
   * В соответсвии с действием пользователя
   * нужно сделать то или иное действие
   * с данными через модель
   * @param {UserAction} action
   * @param {TypeOfChange} updateType
   * @param {Event} data
   */
  #userActionHandler = async (action = UserAction.CHANGE, updateType, data) => {
    this.#uiBlocker.block();

    switch (action) {
      case UserAction.DELETE:
        this.#eventPresenters.get(data.id).setDeleting();
        try {
          await this.#eventModel.delete(updateType, data);
        } catch (error) {
          this.#eventPresenters.get(data.id).setAborting();
        }
        break;
      case UserAction.ADD:
        this.#creatingPresenter.setSaving();
        try {
          await this.#eventModel.add(updateType, data);
          this.#addingModel.update(
            TypeOfChange.CREATING,
            !this.#addingModel.isPressed
          );
        } catch (error) {
          this.#creatingPresenter.setAborting();
        }
        break;
      case UserAction.CHANGE:
        this.#eventPresenters.get(data.id).setSaving();
        try {
          await this.#eventModel.update(updateType, data);
        } catch (error) {
          this.#eventPresenters.get(data.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #sortEventHandler = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#clearEvents();
      this.#renderSort();
      this.#renderEvents();
    }
  };

  #modeChangeHandler = () => {
    if (this.#creatingPresenter !== null) {
      this.#creatingPresenter.destroy();
    }

    if (this.events.length === 0) {
      this.#renderNoEvents();
    }

    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * INFO: Отвечает за перерисовку интерфейса после изменения модели
   * Обработчик который передается как колбэк
   * в модель(и) через addObserver
   * Он служит для реагирования на изменения модели
   * По контракту у него должно быть 2 параметра
   * (второй параметр НЕ обязательный)
   * @param {TypeOfChange} type
   * @param {Event} [payload = null]
   */
  #changingModelHandler = (type = TypeOfChange.PATCH, payload = null) => {
    switch (type) {
      case TypeOfChange.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case TypeOfChange.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case TypeOfChange.PATCH:
        this.#eventPresenters.get(payload.id).init(payload);
        break;
      case TypeOfChange.ADDING:
        this.#clearBoard();
        this.#prepareAddingEvent();
        this.#renderBoard();
        break;
      case TypeOfChange.REJECTION:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case TypeOfChange.SUCCESS:
        this.#isLoading = false;
        remove(this.#messageComponent);
        this.#renderBoard();
        break;
      case TypeOfChange.FAILURE:
        this.#isLoading = false;
        remove(this.#messageComponent);
        this.#renderError();
        break;
    }
  };

  #prepareAddingEvent = () => {
    this.#creatingPresenter.init();
  };

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @param {string} type
   * @returns {Array<Offer>}
   */
  #getOffersByTypeHandler = (type) => this.#offersModel.getByType(type);

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @returns {Array<Destination>}
   */
  #getDestinationsHandler = () => this.#destinationsModel.destinations;

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @returns {Destination}
   */
  #getDestinationByIdHandler = (id) => this.#destinationsModel.getById(id);

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @param {String} name
   * @returns {Destination}
   */
  #getDestinationByNameHandler = (name) =>
    this.#destinationsModel.getByName(name);

  /**
   * Маппит по типу и по переданным ids объекты offer
   * Обработчик передаётся во вьюхи EventFormView, EventView
   * @param {string} type Тип события
   * @param {Array<number>} checkedOfferIds Массив выделенных предложений (вернее их ids)
   */
  #getCheckedOffersHandler = (type, checkedOfferIds) => {
    const offersByType = this.#offersModel.getByType(type);
    return getMappedObjectsByIds(offersByType, checkedOfferIds);
  };

  #creatingFormDestroyHandler = () => {
    this.#addingModel.update(
      TypeOfChange.REJECTION,
      !this.#addingModel.isPressed
    );
  };

  #getSortDescription(currentSortType) {
    return Object.entries(sort).map(([type]) => {
      const isEnabled = enableSortType[type];
      const isChecked = type === currentSortType;
      return {
        type,
        isEnabled,
        isChecked,
      };
    });
  }
}
