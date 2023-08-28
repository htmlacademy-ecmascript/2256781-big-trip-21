import { createElement } from '../render.js';

const createEmptyTripListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyTripListView {
  getTemplate() {
    return createEmptyTripListTemplate();
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
