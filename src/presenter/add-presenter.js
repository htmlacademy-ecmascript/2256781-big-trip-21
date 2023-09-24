import AddButtonView from '../view/add-view.js';
import { remove, render, replace } from '../framework/render.js';

export default class AddPresenter {
  #container = null;
  #addComponent = null;
  #handleButtonClick = null;
  #addModel = null;

  constructor({ container, onButtonClick, addModel }) {
    this.#container = container;
    this.#handleButtonClick = onButtonClick;
    this.#addModel = addModel;
  }

  init() {
    const prevAddComponent = this.#addComponent;

    this.#addComponent = new AddButtonView({
      onClick: this.#buttonClickHandler,
    });

    if (prevAddComponent === null) {
      render(this.#addComponent, this.#container);
      return;
    }

    replace(this.#addComponent, prevAddComponent);
    remove(prevAddComponent);
  }

  destroy() {
    remove(this.#addComponent);
  }

  disableButton() {
    this.#addComponent.setDisabled(true);
  }

  enableButton() {
    this.#addComponent.setDisabled(false);
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}
