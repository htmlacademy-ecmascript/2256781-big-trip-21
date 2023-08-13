import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/info-point-view.js';
import AddButtonView from '../view/add-button-view.js';
import TripListView from '../view/list-point-view.js';
import TripItemView from '../view/point-view.js';
import TripEditFormItemView from '../view/edit-form-view.js';
import {render, RenderPosition} from '../render.js';
import {POINTS_COUNT} from '../const.js';

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
