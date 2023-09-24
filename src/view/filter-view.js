import { getFilterTemplate } from '../template/filter-template.js';
import AbstractView from '../framework/view/abstract-view';

export default class FilterView extends AbstractView {
  #filters = null;
  #filter = null;
  #handleChange = null;

  constructor({ filters, filter, onChange }) {
    super();
    this.#filters = filters;
    this.#filter = filter;
    this.#handleChange = onChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return getFilterTemplate({
      filters: this.#filters,
      filter: this.#filter,
    });
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleChange(evt.target.value);
  };
}
