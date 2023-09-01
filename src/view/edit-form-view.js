import AbstractView from '../framework/view/abstract-view.js';
import { getTripEditFormItemTemplate } from '../template/edit-form-template.js';

export default class PointFormView extends AbstractView {
  #point = null;
  #destination = null;
  #offersByType = null;
  #handlerFormSubmit = null;
  #handlerFormHide = null;

  constructor({ point, destination, offersByType, onFormSubmit, onFormHide }) {
    super();
    this.#point = point;
    this.#destination = destination;
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
    return getTripEditFormItemTemplate({
      point: this.#point,
      destination: this.#destination,
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
