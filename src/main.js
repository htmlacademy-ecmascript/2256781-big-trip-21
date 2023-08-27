import FilterView from './view/filter-view.js';
import TripInfoView from './view/info-point-view.js';
import AddButtonView from './view/add-button-view.js';
import { render, RenderPosition } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';
import PointModel from './model/point-model.js';
import MockService from './service/mock-service.js';

const boxFilterElement = document.querySelector('.trip-controls__filters');
const boxTripMainElement = document.querySelector('.trip-main');
const boxTripEventElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const offerModel = new OfferModel(mockService);
const pointModel = new PointModel(mockService);

const boardPresenter = new BoardPresenter({
  container: boxTripEventElement,
  destinationModel,
  offerModel,
  pointModel,
});

render(new TripInfoView(), boxTripMainElement, RenderPosition.AFTERBEGIN);
render(new AddButtonView(), boxTripMainElement);
render(new FilterView(), boxFilterElement);

boardPresenter.init();
