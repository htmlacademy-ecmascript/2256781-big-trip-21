import AbstractView from '../framework/view/abstract-view.js';
import { getLoadingTripListTemplate } from '../template/loading-list-point-template.js';

export default class LoadingTripListView extends AbstractView {
  get template() {
    return getLoadingTripListTemplate();
  }
}
