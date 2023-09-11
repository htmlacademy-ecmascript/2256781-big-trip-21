import BriefView from '../view/brief-view.js';
import { render } from '../framework/render.js';
import AddingPresenter from './adding-presenter.js';
import FilterPresenter from './filter-presenter.js';

export default class BriefPresenter {
  #container = null;
  #eventModel = null;
  #destinationModel = null;
  #offerModel = null;
  #renderPosition = undefined;

  #addingPresenter = null;
  #filterPresenter = null;

  #events = [];
  #destinations = [];
  #offers = [];

  constructor({
    container,
    eventModel,
    destinationModel,
    offerModel,
    renderPosition,
  }) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#renderPosition = renderPosition;
  }

  init() {
    this.#events = this.#eventModel.events;
    this.#destinations = this.#destinationModel.destinations;
    this.#offers = this.#offerModel.offers;

    this.#renderBrief();
  }

  #renderFilter() {
    this.#filterPresenter = new FilterPresenter({
      container: this.#container,
      eventModel: this.#eventModel,
    });

    this.#filterPresenter.init();
  }

  #renderAddingButton() {
    this.#addingPresenter = new AddingPresenter({ container: this.#container });

    this.#addingPresenter.init();
  }

  #renderBrief() {
    const briefComponent = new BriefView({
      destinationChain: this.#getDestinationChain(),
      duration: this.#getTotalDuration(),
      bottomLine: this.#getOffersBottomLine(),
    });

    render(briefComponent, this.#container, this.#renderPosition);

    this.#renderAddingButton();
    this.#renderFilter();
  }

  #getDestinationChain() {
    return 'Moscow - Dublin - Austin';
  }

  #getTotalDuration() {
    return 'Mar 18&nbsp;—&nbsp;Apr 20';
  }

  #getOffersBottomLine() {
    return '2500';
  }
}
