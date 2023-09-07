import AbstractView from '../framework/view/abstract-view.js';
import { getFormItemTemplate } from '../template/form-template.js';

export default class EventFormView extends AbstractView {
  #event = null;
  #destination = null;
  #offers = null;
  #offersByType = null;
  #handlerFormSubmit = null;
  #handlerFormHide = null;

  constructor({ event, destination, offers, offersByType, onFormSubmit, onFormHide }) {
    super();
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#offersByType = offersByType;
    this.#handlerFormSubmit = onFormSubmit;
    this.#handlerFormHide = onFormHide;

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submitFormHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#hideFormHandler);
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

  #hideFormHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFormHide();
  };
}
