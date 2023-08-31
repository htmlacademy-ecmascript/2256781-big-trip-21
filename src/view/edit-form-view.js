import AbstractView from '../framework/view/abstract-view.js';
import { getTripEditFormItemTemplate } from '../template/edit-form-template.js';

export default class TripEditFormItemView extends AbstractView {
  #point = null;
  #destination = null;
  #offersByType = null;

  constructor({ point, destination, offersByType }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersByType = offersByType;
  }

  get template() {
    return getTripEditFormItemTemplate({
      point: this.#point,
      destination: this.#destination,
      offersByType: this.#offersByType,
    });
  }
}
