import {createElement} from '../render.js';
import {getAddButtonTemplate} from '../template/add-button-template.js';

export default class AddButtonView {
  getTemplate() {
    return getAddButtonTemplate();
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
