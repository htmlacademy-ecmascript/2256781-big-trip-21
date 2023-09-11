import { RenderPosition } from './framework/render.js';
import StoryPresenter from './presenter/story-presenter.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';
import EventModel from './model/event-model.js';
import MockService from './service/mock-service.js';
import BriefPresenter from './presenter/brief-presenter.js';

const boxTripMainElement = document.querySelector('.trip-main');
const boxTripEventElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const offerModel = new OfferModel(mockService);
const eventModel = new EventModel(mockService);

const briefPresenter = new BriefPresenter({
  container: boxTripMainElement,
  renderPosition: RenderPosition.AFTERBEGIN,
  destinationModel,
  offerModel,
  eventModel,
});

const storyPresenter = new StoryPresenter({
  container: boxTripEventElement,
  destinationModel,
  offerModel,
  eventModel,
});

briefPresenter.init();

storyPresenter.init();
