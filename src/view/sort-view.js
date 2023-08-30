import { createElement } from '../render.js';
import { getSortTemplate } from '../template/sort-template.js';

export default class SortView {
  getTemplate() {
    return getSortTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
