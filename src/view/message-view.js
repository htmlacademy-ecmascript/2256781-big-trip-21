import { getEmptyListTemplate } from '../template/empty-list-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class MessageView extends AbstractView {
  #filter = null;

  constructor({ filter }) {
    super();
    this.#filter = filter;
  }

  get template() {
    return getEmptyListTemplate({ filter: this.#filter });
  }
}
