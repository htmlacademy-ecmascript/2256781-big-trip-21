import FilterView from './view/filter-view.js';
import TripInfoView from './view/info-point-view.js';
import AddButtonView from './view/add-button-view.js';
import {render, RenderPosition} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import {getData} from './mock/data';

const boxFilterElement = document.querySelector('.trip-controls__filters');
const boxTripMainElement = document.querySelector('.trip-main');
const boxTripEventElement = document.querySelector('.trip-events');

const data = getData('data');
const boardPresenter = new BoardPresenter({container: boxTripEventElement, data: {...data}});

render(new TripInfoView, boxTripMainElement, RenderPosition.AFTERBEGIN);
render(new AddButtonView, boxTripMainElement);
render(new FilterView(), boxFilterElement);

boardPresenter.init();
