import { createElement } from '../render.js';
import { getTripListTemplate } from '../template/list-point-template.js';

export default class TripListView {
  getTemplate() {
    return getTripListTemplate();
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
