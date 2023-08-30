import { createElement } from '../render.js';
import { getTripInfoTemplate } from '../template/info-point-template.js';

export default class TripInfoView {
  getTemplate() {
    return getTripInfoTemplate();
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
