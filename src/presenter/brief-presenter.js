import BriefView from '../view/brief-view.js';
import { remove, render, replace } from '../framework/render.js';
import AddPresenter from './add-presenter.js';
import FilterPresenter from './filter-presenter.js';
import { getMappedObjectsByIds } from '../utils/event.js';

export default class BriefPresenter {
  #container = null;
  #eventModel = null;
  #destinationModel = null;
  #offerModel = null;
  #filterModel = null;
  #renderPosition = undefined;

  #addPresenter = null;
  #filterPresenter = null;

  #briefComponent = null;

  constructor({
    container,
    eventModel,
    destinationModel,
    offerModel,
    filterModel,
    renderPosition,
  }) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;
    this.#renderPosition = renderPosition;

    this.#eventModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
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
    const prevAddPresenter = this.#addPresenter;

    this.#addPresenter = new AddPresenter({ container: this.#container });

    if (prevAddPresenter) {
      prevAddPresenter.destroy();
    }

    this.#addPresenter.init();
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
  #modelEventHandler = () => {
    this.init();
  };

  // TODO: Реализовать получение цепочки маршрутов
  #getRouteHandler = () => 'Moscow - Dublin - Austin';

  // TODO: Реализовать получение длительности маршрутов
  #getDurationHandler = () => 'Mar 18&nbsp;—&nbsp;Apr 20';

  // Реализация получение итоговой стоимости маршрутов и выбранных опций
  #getBottomLineHandler = () =>
    this.#eventModel.events?.reduce(
      (accEvent, curEvent) =>
        accEvent +
        curEvent.basePrice +
        getMappedObjectsByIds(
          this.#offerModel.getByType(curEvent.type),
          curEvent.offers
        )?.reduce((accOption, curOption) => accOption + curOption.price, 0),
      0
    );
}
