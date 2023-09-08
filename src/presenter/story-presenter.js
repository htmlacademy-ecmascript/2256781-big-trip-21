import ListView from '../view/list-view.js';
import { remove, render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { generateSort } from '../mock/sort.js';
import { SortType } from '../const.js';
import { sort } from '../utils/sort.js';
import EventPresenter from './event-presenter.js';
import { updateListItem } from '../utils/common.js';

export default class StoryPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventModel = null;
  #events = null;
  #eventListComponent = null;
  #sortComponent = null;
  #noEventComponent = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ container, destinationModel, offerModel, eventModel }) {
    this.#container = container;
    this.#destinationsModel = destinationModel;
    this.#offersModel = offerModel;
    this.#eventModel = eventModel;
    this.#events = sort[SortType.DAY]([...this.#eventModel.events]);
  }

  init() {
    this.#renderBoard();
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventListComponent,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#eventChangeHandler,
      onModeChange: this.#modeChangeHandler,
    });

    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #sortEvents = (sortType) => {
    this.#currentSortType = sortType;
    this.#events = sort[this.#currentSortType](this.#events);
  };

  #renderSort() {
    const prevSortComponent = this.#sortComponent;

    // const sorts = generateSort([...this.#events]);
    const sorts = generateSort([...this.#events]);
    // const test2 = Object.values(SortType).map((type) => ({
    //   type,
    //   isEnabled: type === this.#currentSortType,
    //   isDisabled: !enableSortType[type],
    // }));

    this.#sortComponent = new SortView({ sorts });

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
    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #clearEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  };

  #renderNoEvents() {
    render(this.#noEventComponent, this.#container);
  }

  #eventChangeHandler = (updatedEvent) => {
    this.#events = updateListItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEventsByTypeHandler = (sortType) => {
    this.#sortEvents(sortType);
    this.#clearEvents();
    this.#renderSort();
    this.#renderEvents();
  };

  #modeChangeHandler = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #isNoPoints() {
    return this.#events.length === 0;
  }
}
