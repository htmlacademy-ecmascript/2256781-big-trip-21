import { createElement } from '../render.js';
import { getTripItemTemplate } from '../template/point-template.js';

export default class TripItemView {
  constructor({ point, offers, destinations }) {
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return getTripItemTemplate({
      point: this.point,
      offers: this.offers,
      destinations: this.destinations,
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
