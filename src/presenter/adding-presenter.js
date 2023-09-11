import AddingButtonView from '../view/adding-view.js';
import { render } from '../framework/render.js';

export default class AddingPresenter {
  #container = null;
  #addingComponent = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#addingComponent = new AddingButtonView({});

    render(this.#addingComponent, this.#container);
  }
}
