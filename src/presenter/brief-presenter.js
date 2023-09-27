import BriefView from '../view/brief-view.js';
import { remove, render, replace } from '../framework/render.js';
import AddingPresenter from './adding-presenter.js';
import FilterPresenter from './filter-presenter.js';
import { getMappedObjectsByIds } from '../utils/event.js';
import { FilterType, TypeChange } from '../const.js';

export default class BriefPresenter {
  #container = null;
  #eventModel = null;
  #destinationModel = null;
  #addingModel = null;
  #offerModel = null;
  #filterModel = null;
  #renderPosition = undefined;

  #addingPresenter = null;
  #filterPresenter = null;

  #briefComponent = null;

  constructor({
    container,
    eventModel,
    destinationModel,
    offerModel,
    filterModel,
    addingModel,
    renderPosition,
  }) {
    this.#container = container;

    this.#eventModel = eventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;
    this.#addingModel = addingModel;

    this.#renderPosition = renderPosition;

    this.#eventModel.addObserver(this.#changingModelsHandler);
    this.#filterModel.addObserver(this.#changingModelsHandler);
    this.#addingModel.addObserver(this.#changingModelsHandler);
  }

  init() {
    this.#renderBrief();
    this.#renderAddButton();
    this.#renderFilter();
  }

  #renderFilter() {
    const boxFilterElement = document.querySelector('.trip-controls__filters');
    const prevFilterPresenter = this.#filterPresenter;

    this.#filterPresenter = new FilterPresenter({
      container: boxFilterElement,
      eventModel: this.#eventModel,
      filterModel: this.#filterModel,
    });

    if (prevFilterPresenter) {
      prevFilterPresenter.destroy();
    }

    this.#filterPresenter.init();
  }

  #renderAddButton() {
    const prevAddingPresenter = this.#addingPresenter;

    this.#addingPresenter = new AddingPresenter({
      container: this.#container,
      onButtonClick: this.#addingClickHandler,
      addingModel: this.#addingModel,
    });

    if (prevAddingPresenter) {
      prevAddingPresenter.destroy();
    }

    this.#addingPresenter.init();
  }

  #renderBrief() {
    const prevBriefComponent = this.#briefComponent;

    this.#briefComponent = new BriefView({
      getRoute: this.#getRouteHandler,
      getDuration: this.#getDurationHandler,
      getTotal: this.#getBottomLineHandler,
    });

    if (prevBriefComponent === null) {
      render(this.#briefComponent, this.#container, this.#renderPosition);
      return;
    }

    replace(this.#briefComponent, prevBriefComponent);
    remove(prevBriefComponent);
  }

  /**
   * INFO: Отвечает за действия после изменения модели
   * Обработчик который передается как колбэк
   * в модель(и) через addObserver
   * Он служит для реагирования на изменения модели
   * По контракту у него должно быть 2 параметра
   * (второй параметр НЕ обязательный)
   * @param {TypeChange} type
   * @param {Event} [payload = null]
   */
  #changingModelsHandler = (type) => {
    if (type === TypeChange.ADDING) {
      this.#filterModel.update(TypeChange.MAJOR, FilterType.EVERYTHING);
      return;
    }

    this.init();
  };

  #addingClickHandler = () => {
    this.#addingModel.update(TypeChange.ADDING, !this.#addingModel.isPressed);
  };

  // TODO: Реализовать получение цепочки маршрутов
  #getRouteHandler = () => 'Moscow - Dublin - Austin';

  // TODO: Реализовать получение длительности маршрутов
  #getDurationHandler = () => 'Mar 18&nbsp;—&nbsp;Apr 20';

  // Реализация получение итоговой стоимости маршрутов и выбранных опций
  #getBottomLineHandler = () => {
    if (this.#eventModel.events?.length === 0) {
      return 0;
    }

    const basePriceTotal = this.#eventModel.events?.reduce(
      (acc, curEvent) => acc + Number(curEvent.basePrice),
      0
    );

    const optionPrices = this.#eventModel.events?.map((curItem) => {
      const offers = getMappedObjectsByIds(
        this.#offerModel.getByType(curItem.type),
        curItem.offers
      );

      return offers
        .map((curOption) => curOption.price)
        .reduce((accumulator, current) => accumulator + current, 0);
    });

    const optionPriceTotal = optionPrices?.reduce(
      (accTotal, curTotal) => accTotal + curTotal
    );

    return basePriceTotal + optionPriceTotal;
  };
}
