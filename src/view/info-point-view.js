import AbstractView from '../framework/view/abstract-view.js';
import { getTripInfoTemplate } from '../template/info-point-template.js';

export default class TripInfoView extends AbstractView {
  get template() {
    return getTripInfoTemplate();
  }
}
