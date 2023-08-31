import AbstractView from '../framework/view/abstract-view.js';
import { getTripItemTemplate } from '../template/point-template.js';

export default class TripItemView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;

  constructor({ point, offers, destinations }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return getTripItemTemplate({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
    });
  }
}
