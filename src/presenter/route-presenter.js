import ListView from '../view/list-view.js';
import { remove, render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import MessageView from '../view/message-view.js';
import { getSortDescription } from '../mock/sort.js';
import { SortType, TypeChange, UserAction } from '../const.js';
import { sort } from '../utils/sort.js';
import EventPresenter from './event-presenter.js';
import { filter } from '../utils/filter.js';
import CreatingPresenter from './creating-presenter.js';
import { getMappedObjectsByIds } from '../utils/event.js';

export default class RoutePresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;
  #eventModel = null;
  #filterModel = null;
  #addingModel = null;

  #eventListComponent = new ListView();
  #sortComponent = null;
  #noEventComponent = null;

  #eventPresenters = new Map();
  #creatingPresenter = null;

  #currentSortType = SortType.DAY;

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
      onDataChange: this.#dataChangeHandler,
      onDestroy: this.#creatingFormDestroyHandler,
      getAllDestinations: this.#getDestinationsHandler,
      getAllOffersByType: this.#getOffersByTypeHandler,
      getDestinationByName: this.#getDestinationByNameHandler,
    });

    this.#eventModel.addObserver(this.#changingModelsHandler);
    this.#addingModel.addObserver(this.#changingModelsHandler);
    this.#filterModel.addObserver(this.#changingModelsHandler);
  }

  init() {
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
      onDataChange: this.#dataChangeHandler,
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

    const sortingDescription = getSortDescription(this.#currentSortType);

    this.#sortComponent = new SortView({
      sorts: sortingDescription,
      onChangeSort: this.#sortEventHandler,
    });

    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#container);
    }
  }

  #renderBoard() {
    if (this.#isNoPoints()) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEvents();
  }

  #renderEvents() {
    render(this.#eventListComponent, this.#container);

    this.events.forEach((event) => this.#renderEvent(event));
  }

  #clearEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  };

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#clearEvents();

    remove(this.#sortComponent);
    this.#sortComponent = null;

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
      this.#noEventComponent = null;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderNoEvents() {
    this.#noEventComponent = new MessageView({
      filter: this.#filterModel.filter,
    });
    render(this.#noEventComponent, this.#container);
  }

  /**
   * INFO: Отвечает за обработку действия пользователя
   * Сюда приходят "действия" пользователя
   * из вьюхи EventFormView
   * В соответсвии с действием пользователя
   * нужно сделать то или иное действие
   * с данными через модель
   * @param {UserAction} action
   * @param {TypeChange} updateType
   * @param {Event} update
   */
  #dataChangeHandler = (action = UserAction.CHANGE, updateType, update) => {
    switch (action) {
      case UserAction.DELETE:
        this.#eventModel.delete(updateType, update);
        break;
      case UserAction.ADD:
        this.#eventModel.add(updateType, update);
        break;
      case UserAction.CHANGE:
        this.#eventModel.update(updateType, update);
        break;
    }
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
    this.#creatingPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * INFO: Отвечает за перерисовку интерфейса после изменения модели
   * Обработчик который передается как колбэк
   * в модель(и) через addObserver
   * Он служит для реагирования на изменения модели
   * По контракту у него должно быть 2 параметра
   * (второй параметр НЕ обязательный)
   * @param {TypeChange} type
   * @param {Event} [payload = null]
   */
  #changingModelsHandler = (type = TypeChange.PATCH, payload = null) => {
    switch (type) {
      case TypeChange.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case TypeChange.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case TypeChange.PATCH:
        this.#eventPresenters?.get(payload.id)?.init(payload);
        break;
      case TypeChange.ADDING:
        this.#clearBoard();
        this.#prepareAddingEvent();
        this.#renderBoard();
        break;
      case TypeChange.REJECTION:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #prepareAddingEvent = () => {
    this.#creatingPresenter.init();
  };

  #isNoPoints() {
    return this.events.length === 0 && !this.#addingModel.isPressed;
  }

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
      TypeChange.REJECTION,
      !this.#addingModel.isPressed
    );
  };
}
