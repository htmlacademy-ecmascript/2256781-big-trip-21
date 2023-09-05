import AbstractView from '../framework/view/abstract-view.js';
import { getTripInfoTemplate } from '../template/info-template.js';

export default class TripInfoView extends AbstractView {
  get template() {
    return getTripInfoTemplate();
  }
}
