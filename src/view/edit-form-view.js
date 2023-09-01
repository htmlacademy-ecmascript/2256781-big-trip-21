import AbstractView from '../framework/view/abstract-view.js';
import { getTripEditFormItemTemplate } from '../template/edit-form-template.js';

export default class PointFormView extends AbstractView {
  #point = null;
  #destination = null;
  #offersByType = null;
  #handlerFormSubmit = null;

  constructor({ point, destination, offersByType, onFormSubmit }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersByType = offersByType;
    this.#handlerFormSubmit = onFormSubmit;

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submitFormHandler);
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
}
