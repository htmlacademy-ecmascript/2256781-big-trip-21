import AbstractView from '../framework/view/abstract-view.js';
import { getBriefTemplate } from '../template/brief-template.js';

export default class BriefView extends AbstractView {
  #handleRouteGetting = '<empty>';
  #handleDurationGetting = '... - ...';
  #handleTotalGetting = 0;

  constructor({ getRoute, getDuration, getTotal }) {
    super();
    this.#handleRouteGetting = getRoute;
    this.#handleDurationGetting = getDuration;
    this.#handleTotalGetting = getTotal;
  }

  get template() {
    return getBriefTemplate({
      destinationChain: this.#handleRouteGetting(),
      duration: this.#handleDurationGetting(),
      bottomLine: this.#handleTotalGetting(),
    });
  }
}
