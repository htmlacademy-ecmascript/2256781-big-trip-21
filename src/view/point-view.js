import AbstractView from '../framework/view/abstract-view.js';
import { getTripItemTemplate } from '../template/point-template.js';

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;

  constructor({ point, offers, destinations, onEditClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return getTripItemTemplate({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
