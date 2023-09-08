import FilterView from './view/filter-view.js';
import BriefView from './view/brief-view.js';
import AddButtonView from './view/add-view.js';
import { render, RenderPosition } from './framework/render.js';
import StoryPresenter from './presenter/story-presenter.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';
import EventModel from './model/event-model.js';
import MockService from './service/mock-service.js';
import { generateFilter } from './mock/filter.js';

const boxFilterElement = document.querySelector('.trip-controls__filters');
const boxTripMainElement = document.querySelector('.trip-main');
const boxTripEventElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const offerModel = new OfferModel(mockService);
const eventModel = new EventModel(mockService);

const storyPresenter = new StoryPresenter({
  container: boxTripEventElement,
  destinationModel,
  offerModel,
  eventModel: eventModel,
});

const filters = generateFilter(eventModel.events);

render(new BriefView(), boxTripMainElement, RenderPosition.AFTERBEGIN);
render(new AddButtonView(), boxTripMainElement);
render(new FilterView({ filters }), boxFilterElement);

storyPresenter.init();
