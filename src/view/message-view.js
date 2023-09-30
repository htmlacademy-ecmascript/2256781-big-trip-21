import { getMessageTemplate } from '../template/message-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class MessageView extends AbstractView {
  #message = null;

  constructor({ message }) {
    super();
    this.#message = message;
  }

  get template() {
    return getMessageTemplate({ message: this.#message });
  }
}
