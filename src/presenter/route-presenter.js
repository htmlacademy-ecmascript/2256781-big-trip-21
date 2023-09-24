import ListView from '../view/list-view.js';
import { remove, render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import MessageView from '../view/message-view.js';
import { getSortDescription } from '../mock/sort.js';
import { AppMode, SortType, TypeChange, UserAction } from '../const.js';
import { sort } from '../utils/sort.js';
import EventPresenter from './event-presenter.js';
import { filter } from '../utils/filter.js';

export default class RoutePresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;
  #eventModel = null;
  #filterModel = null;
  #addModel = null;

  #eventListComponent = new ListView();
  #sortComponent = null;
  #noEventComponent = null;

  #eventPresenters = new Map();

  #currentSortType = SortType.DAY;

  constructor({
    container,
    destinationModel,
    offerModel,
    eventModel,
    filterModel,
    addModel,
  }) {
    this.#container = container;
    this.#destinationsModel = destinationModel;
    this.#offersModel = offerModel;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;
    this.#addModel = addModel;

    this.#eventModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
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
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#dataChangeHandler,
      onModeChange: this.#modeChangeHandler,
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
    remove(this.#noEventComponent);
    remove(this.#sortComponent);
    this.#sortComponent = null;

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
      default:
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
    // this.#eventPresenters.forEach((presenter) => presenter.resetView());
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
  #modelEventHandler = (type = TypeChange.PATCH, payload = null) => {
    switch (type) {
      case TypeChange.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case TypeChange.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      default:
        this.#eventPresenters?.get(payload.id)?.init(payload);
        break;
    }
  };

  #isNoPoints() {
    // return (
    //   this.events.length === 0 &&
    //   !this.#addModel.appModel === AppMode.PRODUCTION
    // );
    return this.events.length === 0;
  }
}
