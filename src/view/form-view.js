import AbstractView from '../framework/view/abstract-view.js';
import { getFormItemTemplate } from '../template/form-template.js';

export default class EventFormView extends AbstractView {
  #event = null;
  #destination = null;
  #offers = null;
  #offersByType = null;
  #handlerFormSubmit = null;
  #handlerFormReset = null;

  constructor({
    event,
    destination,
    offers,
    offersByType,
    onResetClick,
    onSubmitClick,
  }) {
    super();
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#offersByType = offersByType;
    this.#handlerFormSubmit = onSubmitClick;
    this.#handlerFormReset = onResetClick;

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submitFormHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#resetFormHandler);
  }

  get template() {
    return getFormItemTemplate({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      offersByType: this.#offersByType,
    });
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFormSubmit();
  };

  #resetFormHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFormReset();
  };
}
