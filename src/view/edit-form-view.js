import {createElement} from '../render.js';
import {getTripEditFormItemTemplate} from '../template/edit-form-template.js';

export default class TripEditFormItemView {
  getTemplate() {
    return getTripEditFormItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
