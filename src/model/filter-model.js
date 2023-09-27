import { FilterType } from '../const.js';
import Observable from '../framework/observable.js';
import { filter } from '../utils/filter.js';

export default class FilterModel extends Observable {
  #filters = null;
  #currentFilter = null;

  constructor() {
    super();
    this.#filters = filter;
    this.#currentFilter = FilterType.EVERYTHING;
  }

  init(filterType = FilterType.EVERYTHING) {
    this.#currentFilter = filterType;
  }

  get filter() {
    return this.#currentFilter;
  }

  get filters() {
    return this.#filters;
  }

  getFilteredEvents(events) {
    return this.#filters[this.#currentFilter](events);
  }

  update(type, payload) {
    // INFO: обновляется набор событий полученным объектом
    this.#currentFilter = payload;

    // INFO: информирование подписчиков о происшедшем событии
    this._notify(type, payload);
  }
}
