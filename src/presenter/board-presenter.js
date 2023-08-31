import TripListView from '../view/list-point-view.js';
import TripItemView from '../view/point-view.js';
import TripEditFormItemView from '../view/edit-form-view.js';
import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';

export default class BoardPresenter {
  #tripListComponent = new TripListView();
  #container = null;
  #destinationModel = null;
  #offerModel = null;
  #pointModel = null;
  #boardPoints = [];

  constructor({ container, destinationModel, offerModel, pointModel }) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoints = [...this.#pointModel.points];

    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointComponent = new TripItemView({
      point,
      offers: this.#offerModel.offers,
      destinations: this.#destinationModel.destinations,
    });

    render(pointComponent, this.#tripListComponent.element);
  }

  #renderBoard() {
    const firstPoint = this.#pointModel.points[0];

    render(new SortView(), this.#container);

    render(
      new TripEditFormItemView({
        point: firstPoint,
        destination: this.#destinationModel.getById(firstPoint.destination),
        offersByType: this.#offerModel.getByType(firstPoint.type),
      }),
      this.#tripListComponent.element,
      RenderPosition.AFTERBEGIN
    );

    this.#boardPoints.forEach((point) => this.#renderPoint(point));

    render(this.#tripListComponent, this.#container);
  }
}
