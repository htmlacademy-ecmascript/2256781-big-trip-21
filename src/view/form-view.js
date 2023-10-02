import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFormTemplate } from '../template/form-template.js';
import { parseDateForm } from '../utils/event.js';
import { FormMode, BLANK_POINT } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
  #datepickers = [];

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

    this.#destroyCalendars();
    this._restoreHandlers();
  }

  _restoreHandlers() {
    const isEditing = this.#formMode === FormMode.EDITING;
    const cbReset = this.#buttonResetHandler;
    const cbDelete = this.#buttonDeleteHandler;

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#buttonSaveHandler);

    if (isEditing) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#buttonRollupHandler);
    }

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', isEditing ? cbDelete : cbReset);

    this.element
      .querySelectorAll('.event__type-input')
      .forEach((input) =>
        input.addEventListener('change', this.#typeChangeHandler)
      );

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((offer) =>
        offer.addEventListener('change', this.#offerChangeHandler)
      );

    this.element
      .querySelectorAll('.event__input--time')
      .forEach((date) =>
        date.addEventListener('change', this.#dateChangeHandler)
      );

    this.#setDatepicker();
  }

  get template() {
    const { event, isDisabled, isSaving, isDeleting } = this._state;

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
      isDisabled,
      isSaving,
      isDeleting,
    });
  }

  /**
   *
   * @param {Event} evt
   */
  #buttonSaveHandler = (evt) => {
    evt.preventDefault();
    const event = EventFormView.parseStateToEvent(this._state);
    this.#handleSaveClick(event);
  };

  /**
   *
   * @param {Event} evt
   */
  #buttonRollupHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  /**
   *
   * @param {Event} evt
   */
  #typeChangeHandler = (evt) => {
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
  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      event: {
        ...this._state.event,
        destination: this.#handleGetDestinationByName(evt.target.value)?.id,
      },
    });
  };

  #buttonResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick();
  };

  #buttonDeleteHandler = (evt) => {
    const event = EventFormView.parseStateToEvent(this._state);

    evt.preventDefault();

    this.#handleDeleteClick(event);
  };

  #priceChangeHandler = (evt) => {
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

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const id = evt.target.dataset.id;
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

  #dateChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.name === 'event-start-time') {
      this._setState({
        event: {
          ...this._state.event,
          dateFrom: parseDateForm(evt.target.value),
          dateTo: parseDateForm(evt.target.value),
        },
      });

      this.#datepickers[1].set('minDate', this._state.event.dateFrom);
    } else {
      this._setState({
        event: {
          ...this._state.event,
          dateTo: parseDateForm(evt.target.value),
        },
      });

      this.#datepickers[0].set('maxDate', this._state.event.dateTo);
    }
  };

  reset(event) {
    this.updateElement({
      event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  }

  #setDatepicker() {
    const dateInputs = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
      allowInput: true,
    };

    this.#destroyCalendars();

    this.#datepickers = [...dateInputs].map((input, id) => {
      const minDate = id === 0 ? this._state.event.dateFrom : null;
      const maxDate = id === 1 ? this._state.event.dateTo : null;

      return flatpickr(input, {
        ...commonConfig,
        defaultDate: minDate ? minDate : maxDate,
      });
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickers.length === 0) {
      return;
    }

    this.#datepickers.forEach((datepicker) => datepicker.destroy());
    this.#datepickers = [];
  }

  #destroyCalendars() {
    if (this.#datepickers.length === 0) {
      return;
    }

    this.#datepickers.forEach((datepicker) => datepicker.destroy());
    this.#datepickers = [];
  }

  static parseEventToState = ({
    event,
    isDisabled = false,
    isSaving = false,
    isDeleting = false,
  }) => ({ event, isDisabled, isSaving, isDeleting });

  static parseStateToEvent = (state) => state.event;
}
