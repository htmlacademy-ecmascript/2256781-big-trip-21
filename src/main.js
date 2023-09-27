import { RenderPosition } from './framework/render.js';
import RoutePresenter from './presenter/route-presenter.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';
import EventModel from './model/event-model.js';
import MockService from './service/mock-service.js';
import BriefPresenter from './presenter/brief-presenter.js';
import FilterModel from './model/filter-model.js';
import AddingModel from './model/adding-model.js';

const boxTripMainElement = document.querySelector('.trip-main');
const boxTripEventElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const offerModel = new OfferModel(mockService);
const eventModel = new EventModel(mockService);
const filterModel = new FilterModel();
const addingModel = new AddingModel();

const briefPresenter = new BriefPresenter({
  container: boxTripMainElement,
  renderPosition: RenderPosition.AFTERBEGIN,
  destinationModel,
  offerModel,
  eventModel,
  filterModel,
  addingModel,
});

const routePresenter = new RoutePresenter({
  container: boxTripEventElement,
  destinationModel,
  offerModel,
  eventModel,
  filterModel,
  addingModel,
});

briefPresenter.init();

routePresenter.init();
