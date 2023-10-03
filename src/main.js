import { RenderPosition } from './framework/render.js';
import RoutePresenter from './presenter/route-presenter.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';
import EventModel from './model/event-model.js';
import ProductionService from './service/production-service.js';
import BriefPresenter from './presenter/brief-presenter.js';
import FilterModel from './model/filter-model.js';
import AddingModel from './model/adding-model.js';
import { getCredential } from './const.js';

const boxTripMainElement = document.querySelector('.trip-main');
const boxTripEventElement = document.querySelector('.trip-events');

const main = async () => {
  const credential = getCredential();
  const productionService = new ProductionService(
    credential.END_POINT,
    credential.AUTHORIZATION
  );
  const destinationModel = new DestinationModel(productionService);
  const offerModel = new OfferModel(productionService);
  const eventModel = new EventModel({
    service: productionService,
    destinationModel,
    offerModel,
  });

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

  routePresenter.init();
  briefPresenter.init();
  eventModel.init();
};

//!
main();
