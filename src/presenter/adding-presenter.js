import AddingView from '../view/adding-view.js';
import { remove, render, replace } from '../framework/render.js';

export default class AddingPresenter {
  #container = null;
  #addingComponent = null;
  #handleButtonClick = null;
  #addingModel = null;

  constructor({ container, addingModel, onButtonClick }) {
    this.#container = container;
    this.#handleButtonClick = onButtonClick;
    this.#addingModel = addingModel;
  }

  init() {
    const prevAddingComponent = this.#addingComponent;

    this.#addingComponent = new AddingView({
      onClick: this.#buttonClickHandler,
    });

    if (this.#addingModel.isPressed) {
      this.disableButton();
    } else {
      this.enableButton();
    }

    if (prevAddingComponent === null) {
      render(this.#addingComponent, this.#container);
      return;
    }

    replace(this.#addingComponent, prevAddingComponent);
    remove(prevAddingComponent);
  }

  destroy() {
    remove(this.#addingComponent);
  }

  disableButton() {
    this.#addingComponent.setDisabled(true);
  }

  enableButton() {
    this.#addingComponent.setDisabled(false);
  }

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };
}
