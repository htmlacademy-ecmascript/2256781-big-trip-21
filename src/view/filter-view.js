import { getFilterTemplate } from '../template/filter-template.js';
import AbstractView from '../framework/view/abstract-view';

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return getFilterTemplate({ filters: this.#filters });
  }
}
