import {createElement} from '../render.js';
import {getEmptyTripListTemplate} from '../template/empty-list-point-template.js';

export default class EmptyTripListView {
  getTemplate() {
    return getEmptyTripListTemplate();
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
