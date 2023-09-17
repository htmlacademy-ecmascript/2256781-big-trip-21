import AbstractView from '../framework/view/abstract-view.js';
import { getEventTemplate } from '../template/event-template.js';

export default class EventView extends AbstractView {
  #event = null;
  #handleRolloutClick = null;
  #handleFavoriteClick = null;
  #handleGetCheckedOffers = null;
  #handleGetDestinationById = null;

  constructor({
    event,
    getDestinationById,
    getCheckedOffers,
    onRolloutClick,
    onFavoriteClick,
  }) {
    super();

    this.#event = event;
    this.#handleGetDestinationById = getDestinationById;
    this.#handleGetCheckedOffers = getCheckedOffers;
    this.#handleRolloutClick = onRolloutClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rolloutClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    const checkedOffers = this.#handleGetCheckedOffers(
      this.#event.type,
      this.#event.offers
    );
    return getEventTemplate({
      event: this.#event,
      destination: this.#handleGetDestinationById(this.#event.destination),
      checkedOffers,
    });
  }

  #rolloutClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRolloutClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };
}
