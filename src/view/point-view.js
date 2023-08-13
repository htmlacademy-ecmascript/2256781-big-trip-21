import {createElement} from '../render.js';
import {getTripItemTemplate} from '../template/point-template.js';

export default class TripItemView {
  getTemplate() {
    return getTripItemTemplate();
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
