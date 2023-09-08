import EventView from '../view/event-view.js';
import EventFormView from '../view/form-view.js';
import { remove, render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { Mode } from '../const.js';
import { getMappedObjectsByIds } from '../utils/event.js';

export default class EventPresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;

  #eventComponent = null;
  #eventFormComponent = null;
  #event = null;
  #mode = Mode.DEFAULT;

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onModeChange,
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevFormComponent = this.#eventFormComponent;
    const offersByIds = this.#getOffersByIds();

    this.#eventComponent = new EventView({
      event: this.#event,
      destination: this.#destinationsModel.getById(this.#event.destination),
      offers: offersByIds,
      onEditClick: this.#buttonEditClickHandler,
      onFavoriteClick: this.#buttonFavoriteClickHandler,
    });

    this.#eventFormComponent = new EventFormView({
      event: this.#event,
      destination: this.#destinationsModel.getById(this.#event.destination),
      offers: offersByIds,
      offersByType: this.#offersModel.getByType(this.#event.type),
      onResetClick: this.#buttonResetClickHandler,
      onSubmitClick: this.#formSubmitHandler,
    });

    if (prevEventComponent === null || prevFormComponent === null) {
      render(this.#eventComponent, this.#container.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventFormComponent, prevFormComponent);
    }

    remove(prevEventComponent);
    remove(prevFormComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventFormComponent);
  };

  #buttonEditClickHandler = () => {
    this.#replaceCardToForm();
  };

  #buttonFavoriteClickHandler = () => {
    this.#handleDataChange({
      ...this.#event,
      isFavorite: !this.#event.isFavorite,
    });
  };

  #buttonResetClickHandler = () => {
    this.#replaceFormToCard();
  };

  #formSubmitHandler = (event) => {
    this.#handleDataChange(event);
    this.#replaceFormToCard();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #getOffersByIds() {
    return getMappedObjectsByIds(
      this.#offersModel.getByType(this.#event.type),
      this.#event.offers
    );
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #replaceCardToForm() {
    this.#handleModeChange();
    replace(this.#eventFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  }
}
