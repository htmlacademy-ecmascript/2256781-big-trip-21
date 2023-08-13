import {createElement} from '../render.js';
import {getLoadingTripListTemplate} from '../template/loading-list-point-template.js';

export default class LoadingTripListView {
  getTemplate() {
    return getLoadingTripListTemplate();
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
