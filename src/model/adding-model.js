import Observable from '../framework/observable.js';

export default class AddingModel extends Observable {
  #isPressedButton = undefined;

  init() {
    this.#isPressedButton = false;
  }

  /**
   * @returns {boolean}
   */
  get isPressed() {
    return this.#isPressedButton;
  }

  update(type, payload) {
    // INFO: обновляется набор событий полученным объектом
    this.#isPressedButton = payload;

    // INFO: информирование подписчиков о происшедшем событии
    this._notify(type, payload);
  }
}
