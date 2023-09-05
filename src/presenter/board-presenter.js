import TripListView from '../view/list-point-view.js';
import PointView from '../view/point-view.js';
import PointFormView from '../view/edit-form-view.js';
import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EmptyTripListView from '../view/empty-list-point-view.js';
import { isEscapeKey } from '../utils/common.js';
import { generateSort } from '../mock/sort.js';
import { SortType } from '../const.js';
import { sort } from '../utils/sort.js';

export default class BoardPresenter {
  #container = null;
  #destinationModel = null;
  #offerModel = null;
  #pointModel = null;
  #boardPoints = [];
  #eventListComponent = null;
  #currentSortType = SortType.DAY;
  #sortComponent = null;

  constructor({ container, destinationModel, offerModel, pointModel }) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#pointModel = pointModel;
    this.#boardPoints = sort[SortType.DAY]([...this.#pointModel.points]);
  }

  init() {
    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      offers: this.#offerModel.offers,
      destinations: this.#destinationModel.destinations,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const pointFormComponent = new PointFormView({
      point,
      destination: this.#destinationModel.getById(point.destination),
      offersByType: this.#offerModel.getByType(point.type),
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormHide: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replaceFormToCard() {
      replace(pointComponent, pointFormComponent);
    }

    function replaceCardToForm() {
      replace(pointFormComponent, pointComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }

  #renderBoard() {
    if (this.#isNoPoints()) {
      render(new EmptyTripListView(), this.#container);
      return;
    }

    this.#eventListComponent = new TripListView();

    const sorts = generateSort([...this.#boardPoints]);
    this.#sortComponent = new SortView({ sorts });
    render(this.#sortComponent, this.#container);

    this.#boardPoints.forEach((point) => this.#renderPoint(point));

    render(this.#eventListComponent, this.#container);
  }

  #isNoPoints() {
    return this.#boardPoints.length === 0;
  }
}
