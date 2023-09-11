import AbstractView from '../framework/view/abstract-view.js';
import { getBriefTemplate } from '../template/brief-template.js';

export default class BriefView extends AbstractView {
  #destinationChain = '<empty>';
  #duration = '... - ...';
  #bottomLine = 0;

  constructor({ destinationChain, duration, bottomLine }) {
    super();
    this.#destinationChain = destinationChain;
    this.#duration = duration;
    this.#bottomLine = bottomLine;
  }

  get template() {
    return getBriefTemplate({
      destinationChain: this.#destinationChain,
      duration: this.#duration,
      bottomLine: this.#bottomLine,
    });
  }
}
