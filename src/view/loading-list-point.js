import { createElement } from '../render.js';

const createLoadingTripListTemplate = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

export default class LoadingTripListView {
  getTemplate() {
    return createLoadingTripListTemplate();
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
