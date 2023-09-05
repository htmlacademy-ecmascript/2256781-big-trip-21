import { getSortTemplate } from '../template/sort-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class SortView extends AbstractView {
  #sorts = null;

  constructor({ sorts }) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return getSortTemplate({ sorts: this.#sorts });
  }
}
