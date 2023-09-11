import FilterView from '../view/filter-view.js';
import { render } from '../framework/render.js';
import { generateFilter } from '../mock/filter.js';

export default class FilterPresenter {
  #container = null;
  #eventModel = null;

  #filterComponent = null;

  #filters = [];
  #events = [];

  constructor({ container, eventModel }) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init() {
    this.#events = this.#eventModel.events;
    this.#filters = generateFilter(this.#events);
    this.#filterComponent = new FilterView({ filters: this.#filters });

    render(this.#filterComponent, this.#container);
  }
}
