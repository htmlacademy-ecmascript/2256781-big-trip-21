import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import TripInfoView from '../view/info-point.js';
import AddButtonView from '../view/add-button.js';
import TripListView from '../view/list-point.js';
import TripItemView from '../view/point.js';
import TripEditFormItemView from '../view/edit-form.js';
import {render, RenderPosition} from '../render.js';

const POINTS_COUNT = 3;

const boxFilterElement = document.querySelector('.trip-controls__filters');
const boxTripEventElement = document.querySelector('.trip-events');
const boxTripMainElement = document.querySelector('.trip-main');

export default class BoardPresenter {
  tripList = new TripListView();

  init() {
    render(new TripInfoView, boxTripMainElement, RenderPosition.AFTERBEGIN);
    render(new AddButtonView, boxTripMainElement);
    render(new FilterView(), boxFilterElement);
    render(new SortView(), boxTripEventElement);
    render(new TripEditFormItemView(), this.tripList.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new TripItemView(), this.tripList.getElement());
    }

    render(this.tripList, boxTripEventElement);
  }
}
