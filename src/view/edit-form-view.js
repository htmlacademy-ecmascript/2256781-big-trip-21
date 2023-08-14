import {createElement} from '../render.js';
import {getTripEditFormItemTemplate} from '../template/edit-form-template.js';

export default class TripEditFormItemView {
  constructor({data}) {
    this.data = data;
  }

  getTemplate() {
    return getTripEditFormItemTemplate(this.data);
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
