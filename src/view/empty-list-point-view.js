import { getEmptyTripListTemplate } from '../template/empty-list-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EmptyTripListView extends AbstractView {
  get template() {
    return getEmptyTripListTemplate();
  }
}
