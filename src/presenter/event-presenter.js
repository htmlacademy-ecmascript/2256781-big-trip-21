import EventView from '../view/event-view.js';
import EventFormView from '../view/form-view.js';
import { remove, render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { FormMode, EventMode, UserAction, TypeChange } from '../const.js';
import { getMappedObjectsByIds } from '../utils/event.js';

export default class EventPresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;

  #eventComponent = null;
  #eventFormComponent = null;
  #event = null;
  #mode = EventMode.DEFAULT;

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onModeChange,
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevFormComponent = this.#eventFormComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      getDestinationById: this.#getDestinationById,
      getCheckedOffers: this.#getCheckedOffers,
      onRolloutClick: this.#rolloutHandler,
      onFavoriteClick: this.#favoriteHandler,
    });

    this.#eventFormComponent = new EventFormView({
      event: this.#event,
      formMode: FormMode.EDITING,
      getAllDestinations: this.#getAllDestinations,
      getAllOffersByType: this.#getAllOffersByType,
      getCheckedOffers: this.#getCheckedOffers,
      getDestinationByName: this.#getDestinationByName,
      onRollupClick: this.#rollupHandler,
      onSaveClick: this.#saveHandler,
      onResetClick: this.#resetHandler,
      onDeleteClick: this.#deleteHandler,
    });

    if (prevEventComponent === null || prevFormComponent === null) {
      render(this.#eventComponent, this.#container.element);
      return;
    }

    if (this.#mode === EventMode.CARD) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === EventMode.FORM) {
      replace(this.#eventFormComponent, prevFormComponent);
    }

    remove(prevEventComponent);
    remove(prevFormComponent);
  }

  resetView = () => {
    if (this.#mode !== EventMode.DEFAULT) {
      this.#eventFormComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventFormComponent);
  };

  #rolloutHandler = () => {
    this.#replaceCardToForm();
  };

  /**
   * Обрабатывает нажатие пользователем на звёздочку
   */
  #favoriteHandler = () => {
    this.#handleDataChange(UserAction.CHANGE, TypeChange.PATCH, {
      ...this.#event,
      isFavorite: !this.#event.isFavorite,
    });
  };

  /**
   * Обрабатывает нажатие пользователем на стрелочку вверх
   */
  #rollupHandler = () => {
    this.#eventFormComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  /**
   * Обрабатывает нажатие пользователем на кнопку Cancel
   */
  #resetHandler = () => {
    this.#eventFormComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  // REVIEW:
  // применить ф-ию для вычисления типа изменения
  /**
   * Обрабатывает нажатие пользователем на кнопку Save
   * @param {Event} event
   */
  #saveHandler = (event) => {
    this.#handleDataChange(UserAction.CHANGE, TypeChange.MINOR, event);
    this.#replaceFormToCard();
  };

  /**
   * Обрабатывает нажатие пользователем на кнопку Delete
   * @param {*} event
   */
  #deleteHandler = (event) => {
    this.#handleDataChange(UserAction.DELETE, TypeChange.MAJOR, event);
    this.#replaceFormToCard();
  };

  /**
   * Обрабатывает нажатие пользователем на клавишу Esc
   * @param {Event} evt
   */
  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @param {string} type
   * @returns {Array<Offer>}
   */
  #getAllOffersByType = (type) => this.#offersModel.getByType(type);

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @returns {Array<Destination>}
   */
  #getAllDestinations = () => this.#destinationsModel.destinations;

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @returns {Destination}
   */
  #getDestinationById = (id) => this.#destinationsModel.getById(id);

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @param {String} name
   * @returns {Destination}
   */
  #getDestinationByName = (name) => this.#destinationsModel.getByName(name);

  /**
   * Маппит по типу и по переданным ids объекты offer
   * Обработчик передаётся во вьюхи EventFormView, EventView
   * @param {string} type Тип события
   * @param {Array<number>} checkedOfferIds Массив выделенных предложений (вернее их ids)
   */
  #getCheckedOffers = (type, checkedOfferIds) => {
    const offersByType = this.#offersModel.getByType(type);
    return getMappedObjectsByIds(offersByType, checkedOfferIds);
  };

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = EventMode.DEFAULT;
  }

  #replaceCardToForm() {
    this.#handleModeChange();
    replace(this.#eventFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = EventMode.EDITING;
  }
}
