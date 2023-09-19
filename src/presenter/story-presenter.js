import ListView from '../view/list-view.js';
import { remove, render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { getSortDescription } from '../mock/sort.js';
import { FilterType, SortType, TypeChange, UserAction } from '../const.js';
import { sort } from '../utils/sort.js';
import EventPresenter from './event-presenter.js';
import { filter } from '../utils/filter.js';

export default class StoryPresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;
  #eventModel = null;

  #eventListComponent = null;

  #sortComponent = null;
  #noEventComponent = null;

  #eventPresenters = new Map();

  #currentSortType = SortType.DAY;
  #isCreating = false; //событие в процессе создания?

  // REVIEW:
  // перенести поинт презентер из main.js
  // подписать на изменение модели filterModel
  constructor({ container, destinationModel, offerModel, eventModel }) {
    this.#container = container;
    this.#destinationsModel = destinationModel;
    this.#offersModel = offerModel;
    this.#eventModel = eventModel;
    //this.#events = sort[SortType.DAY]([...this.#eventModel.events]);

    // сюда перенести создание поинт презентера
    // из main.js

    this.#eventModel.addObserver(this.#modelEventHandler);
    //по аналогии со строкой выше, сюда можно внести
    //колбэк для вызова при событии из this.#filterModel
  }

  init() {
    this.#renderBoard();
  }

  // REVIEW:
  // отредактировать когда создам filterModel
  get events() {
    // const filterType = this.#filterModel.filters;
    const filterType = FilterType.EVERYTHING;
    const filteredEvents = filter[filterType](this.#eventModel.events);

    return sort[this.#currentSortType](filteredEvents);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventListComponent,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#viewActionHandler,
      onModeChange: this.#modeChangeHandler,
    });

    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  }

  // REVIEW: Нужна ли?
  #sortEvents = (sortType) => {
    this.#currentSortType = sortType;
    this.events = sort[this.#currentSortType](this.events);
  };

  #renderSort() {
    const prevSortComponent = this.#sortComponent;

    const sortingDescription = getSortDescription(this.#currentSortType);

    this.#sortComponent = new SortView({
      sorts: sortingDescription,
      onChangeSort: this.#sortEventsHandler,
    });

    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#container);
    }
  }

  #renderEventContainer() {
    this.#eventListComponent = new ListView();
    render(this.#eventListComponent, this.#container);
  }

  #renderBoard() {
    this.#noEventComponent = new EmptyListView();
    if (this.#isNoPoints()) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEventContainer();
    this.#renderEvents();
  }

  #renderEvents() {
    this.events.forEach((event) => this.#renderEvent(event));
  }

  // REVIEW:
  // когда будет презентер новой точки, здесь его нужно destroy
  #clearEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  };

  // REVIEW:
  // когда будет messageComponent его тоже нужно удалять здесь
  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#clearEvents();
    // remove(this.#messageComponent);
    remove(this.#sortComponent);
    this.#sortComponent = null;

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderNoEvents() {
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
  #viewActionHandler = (action = UserAction.CHANGE, updateType, update) => {
    switch (action) {
      case UserAction.DELETE:
        this.#eventModel.delete(updateType, update);
        break;
      case UserAction.DELETE:
        this.#eventModel.delete(updateType, update);
        break;
      default:
        this.#eventModel.update(updateType, update);
        break;
    }
  };

  #sortEventsHandler = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#sortEvents(sortType);
      this.#clearEvents();
      this.#renderSort();
      this.#renderEvents();
    }
  };

  #modeChangeHandler = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * INFO: Отвечает за перерисовку интерфейса после изменения модели
   * Обработчик который передается как колбэк
   * в модель(и) через addObserver
   * Он служит для реагирования на изменения модели
   * По контракту у него должно быть 2 параметра
   * (второй параметр НЕ обязательный)
   * @param {UserAction} action
   * @param {Event} [payload = null]
   */
  #modelEventHandler = (action = TypeChange.PATCH, payload = null) => {
    switch (action) {
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
    return this.events.length === 0;
  }
}
