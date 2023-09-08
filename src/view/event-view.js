import AbstractView from '../framework/view/abstract-view.js';
import { getEventTemplate } from '../template/event-template.js';

export default class EventView extends AbstractView {
  #event = null;
  #offers = null;
  #destination = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ event, offers, destination, onEditClick, onFavoriteClick }) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destination = destination;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return getEventTemplate({
      event: this.#event,
      offers: this.#offers,
      destination: this.#destination,
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };
}
