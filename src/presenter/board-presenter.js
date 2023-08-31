import TripListView from '../view/list-point-view.js';
import TripItemView from '../view/point-view.js';
import TripEditFormItemView from '../view/edit-form-view.js';
import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';

export default class BoardPresenter {
  #tripList = new TripListView();
  #container = null;
  #destinationModel = null;
  #offerModel = null;
  #pointModel = null;

  constructor({ container, destinationModel, offerModel, pointModel }) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#pointModel = pointModel;
  }

  init() {
    const firstPoint = this.#pointModel.points[0];
    const points = this.#pointModel.points;

    render(new SortView(), this.#container);

    render(
      new TripEditFormItemView({
        point: firstPoint,
        destination: this.#destinationModel.getById(firstPoint.destination),
        offersByType: this.#offerModel.getByType(firstPoint.type),
      }),
      this.#tripList.element,
      RenderPosition.AFTERBEGIN
    );

    points.forEach((point) =>
      render(
        new TripItemView({
          point,
          offers: this.#offerModel.offers,
          destinations: this.#destinationModel.destinations,
        }),
        this.#tripList.element
      )
    );

    render(this.#tripList, this.#container);
  }
}
