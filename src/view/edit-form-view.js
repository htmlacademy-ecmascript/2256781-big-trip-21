import { createElement } from '../render.js';
import { getTripEditFormItemTemplate } from '../template/edit-form-template.js';

export default class TripEditFormItemView {
  constructor({ point, destination, offersByType }) {
    this.point = point;
    this.destination = destination;
    this.offersByType = offersByType;
  }

  getTemplate() {
    return getTripEditFormItemTemplate({
      point: this.point,
      destination: this.destination,
      offersByType: this.offersByType,
    });
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
