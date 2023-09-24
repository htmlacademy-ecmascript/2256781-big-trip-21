import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFormTemplate } from '../template/form-template.js';
import { BLANK_POINT } from '../utils/event.js';
import { FormMode } from '../const.js';

export default class EventFormView extends AbstractStatefulView {
  #handleSaveClick = null;
  #handleResetClick = null;
  #handleRollupClick = null;
  #handleDeleteClick = null;

  #handleGetAllDestinations = null;
  #handleGetAllOffersByType = null;
  #handleGetCheckedOffers = null;
  #handleGetDestinationByName = null;

  #formMode = undefined;

  constructor({
    event = BLANK_POINT,
    formMode = FormMode.EDITING,
    getAllDestinations = () => {},
    getAllOffersByType = () => {},
    getCheckedOffers = () => {},
    getDestinationByName = () => {},
    onRollupClick = () => {},
    onResetClick = () => {},
    onSaveClick = () => {},
    onDeleteClick = () => {},
  }) {
    super();

    this._setState(EventFormView.parseEventToState({ event }));

    this.#handleSaveClick = onSaveClick;
    this.#handleRollupClick = onRollupClick;
    this.#handleResetClick = onResetClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleGetAllDestinations = getAllDestinations;
    this.#handleGetAllOffersByType = getAllOffersByType;
    this.#handleGetCheckedOffers = getCheckedOffers;
    this.#handleGetDestinationByName = getDestinationByName;

    this.#formMode = formMode;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    const isEditing = this.#formMode === FormMode.EDITING;
    const cbReset = this.#resetHandler;
    const cbDelete = this.#deleteHandler;

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#saveHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', isEditing ? cbDelete : cbReset);

    this.element
      .querySelectorAll('.event__type-input')
      .forEach((input) =>
        input.addEventListener('change', this.#changeTypeHandler)
      );

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#changeDestinationHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#changePriceHandler);

    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((offer) =>
        offer.addEventListener('change', this.#changeOfferHandler)
      );

    this.element
      .querySelectorAll('.event__input--time')
      .forEach((date) =>
        date.addEventListener('change', this.#changeDateHandler)
      );
  }

  get template() {
    const event = this._state.event;
    const destinationId = event.destination;
    const destinations = this.#handleGetAllDestinations();
    const destination = destinations.find((item) => item.id === destinationId);
    const checkedOffers = this.#handleGetCheckedOffers(
      event.type,
      event.offers
    );
    const allOffersByType = this.#handleGetAllOffersByType(event.type);
    const formMode = this.#formMode;

    return getFormTemplate({
      event,
      formMode,
      destination,
      destinations,
      checkedOffers,
      allOffersByType,
    });
  }

  /**
   *
   * @param {Event} evt
   */
  #saveHandler = (evt) => {
    evt.preventDefault();

    const event = EventFormView.parseStateToEvent(this._state);

    this.#handleSaveClick(event);
  };

  /**
   *
   * @param {Event} evt
   */
  #rollupHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  /**
   *
   * @param {Event} evt
   */
  #changeTypeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      event: {
        ...this._state.event,
        type: evt.target.value,
        offers: [],
      },
    });
  };

  /**
   *
   * @param {Event} evt
   */
  #changeDestinationHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      event: {
        ...this._state.event,
        destination: this.#handleGetDestinationByName(evt.target.value)?.id,
      },
    });
  };

  #resetHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick();
  };

  #deleteHandler = (evt) => {
    const event = EventFormView.parseStateToEvent(this._state);

    evt.preventDefault();

    this.#handleDeleteClick(event);
  };

  #changePriceHandler = (evt) => {
    evt.preventDefault();

    const event = this._state.event;
    const price = evt.target.value;

    this._setState({
      event: {
        ...event,
        basePrice: price,
      },
    });
  };

  #changeOfferHandler = (evt) => {
    evt.preventDefault();

    const id = +evt.target.dataset.id;
    const event = this._state.event;
    const isChecked = evt.target.checked;
    const offerIds = [...event.offers];

    this._setState({
      event: {
        ...event,
        offers: isChecked
          ? [...offerIds, id]
          : offerIds.filter((n) => n !== id),
      },
    });
  };

  #changeDateHandler = (evt) => {
    evt.preventDefault();
  };

  reset(event) {
    this.updateElement({ event });
  }

  static parseEventToState = ({ event }) => ({ event });

  static parseStateToEvent = (state) => state.event;
}
