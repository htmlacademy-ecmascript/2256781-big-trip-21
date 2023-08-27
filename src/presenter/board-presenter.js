import TripListView from '../view/list-point-view.js';
// import TripItemView from '../view/point-view.js';
// import TripEditFormItemView from '../view/edit-form-view.js';
// import { render, RenderPosition } from '../render.js';
// import { POINTS_COUNT } from '../const.js';
// import SortView from '../view/sort-view.js';

export default class BoardPresenter {
  tripList = new TripListView();

  constructor({ container, destinationModel, offerModel, pointModel }) {
    this.container = container;
    this.destinationModel = destinationModel;
    this.offerModel = offerModel;
    this.pointModel = pointModel;
  }

  init() {
    const firstPoint = this.pointModel.get()[0];
    console.log(firstPoint);
    
    // render(new SortView(), this.container);
    // render(
    //   new TripEditFormItemView({
    //     point: firstPoint,
    //     destination: this.destinationModel.getById(firstPoint.destination),
    //     offers: this.offerModel.getByType(firstPoint.type),
    //   }),
    //   this.tripList.getElement(),
    //   RenderPosition.AFTERBEGIN
    // );

    // for (let i = 1; i <= POINTS_COUNT; i++) {
    //   render(new TripItemView(), this.tripList.getElement());
    // }

    // render(this.tripList, this.container);
  }
}
