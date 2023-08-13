import {createElement} from '../render.js';
import {getFilterTemplate} from '../template/filter-template.js';

export default class FilterView {
  getTemplate() {
    return getFilterTemplate();
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
