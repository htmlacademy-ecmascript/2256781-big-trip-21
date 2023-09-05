import AbstractView from '../framework/view/abstract-view.js';
import { getTripListTemplate } from '../template/list-template.js';

export default class TripListView extends AbstractView {
  get template() {
    return getTripListTemplate();
  }
}
