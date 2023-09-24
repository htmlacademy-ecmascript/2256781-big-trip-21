import EventView from '../view/event-view.js';
import EventFormView from '../view/form-view.js';
import { remove, render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { FormMode, EventMode, UserAction, TypeChange } from '../const.js';
import { getMappedObjectsByIds, isBigDifference } from '../utils/event.js';

export default class EventPresenter {
  #eventListContainer = null;

  #destinationsModel = null;
  #offersModel = null;

  #eventComponent = null;
  #eventFormComponent = null;
  #event = null;
  #mode = null;

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({
    eventListContainer,
    destinationsModel,
    offersModel,
    onDataChange,
    onModeChange,
  }) {
    this.#eventListContainer = eventListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;

    this.#mode = EventMode.CARD;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevFormComponent = this.#eventFormComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      getDestinationById: this.#getDestinationByIdHandler,
      getCheckedOffers: this.#getCheckedOffersHandler,
      onRolloutClick: this.#rolloutClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    this.#eventFormComponent = new EventFormView({
      event: this.#event,
      formMode: FormMode.EDITING,
      getAllDestinations: this.#getDestinationsHandler,
      getAllOffersByType: this.#getOffersByTypeHandler,
      getCheckedOffers: this.#getCheckedOffersHandler,
      getDestinationByName: this.#getDestinationByNameHandler,
      onRollupClick: this.#rollupClickHandler,
      onSaveClick: this.#savingClickHandler,
      onResetClick: this.#resetClickHandler,
      onDeleteClick: this.#deleteClickHandler,
    });

    if (prevEventComponent === null || prevFormComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
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

  resetView() {
    if (this.#mode !== EventMode.CARD) {
      this.#eventFormComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventFormComponent);
  }

  #rolloutClickHandler = () => {
    this.#replaceCardToForm();
  };

  /**
   * Обрабатывает нажатие пользователем на звёздочку
   */
  #favoriteClickHandler = () => {
    this.#handleDataChange(UserAction.CHANGE, TypeChange.PATCH, {
      ...this.#event,
      isFavorite: !this.#event.isFavorite,
    });
  };

  /**
   * Обрабатывает нажатие пользователем на стрелочку вверх
   */
  #rollupClickHandler = () => {
    this.#eventFormComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  /**
   * Обрабатывает нажатие пользователем на кнопку Cancel
   */
  #resetClickHandler = () => {
    this.#eventFormComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  /**
   * Обрабатывает нажатие пользователем на кнопку Save (Submit)
   * @param {Event} event
   */
  #savingClickHandler = (event) => {
    const isMinor = isBigDifference(event, this.#event);
    this.#handleDataChange(
      UserAction.CHANGE,
      isMinor ? TypeChange.MINOR : TypeChange.PATCH,
      event
    );
    this.#replaceFormToCard();
  };

  /**
   * Обрабатывает нажатие пользователем на кнопку Delete
   * @param {*} event
   */
  #deleteClickHandler = (event) => {
    this.#handleDataChange(UserAction.DELETE, TypeChange.MINOR, event);
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
      // document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @param {string} type
   * @returns {Array<Offer>}
   */
  #getOffersByTypeHandler = (type) => this.#offersModel.getByType(type);

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @returns {Array<Destination>}
   */
  #getDestinationsHandler = () => this.#destinationsModel.destinations;

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @returns {Destination}
   */
  #getDestinationByIdHandler = (id) => this.#destinationsModel.getById(id);

  /**
   * Обработчик передаётся во вьюху EventFormView
   * @param {String} name
   * @returns {Destination}
   */
  #getDestinationByNameHandler = (name) => this.#destinationsModel.getByName(name);

  /**
   * Маппит по типу и по переданным ids объекты offer
   * Обработчик передаётся во вьюхи EventFormView, EventView
   * @param {string} type Тип события
   * @param {Array<number>} checkedOfferIds Массив выделенных предложений (вернее их ids)
   */
  #getCheckedOffersHandler = (type, checkedOfferIds) => {
    const offersByType = this.#offersModel.getByType(type);
    return getMappedObjectsByIds(offersByType, checkedOfferIds);
  };

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = EventMode.CARD;
  }

  #replaceCardToForm() {
    this.#handleModeChange();
    replace(this.#eventFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = EventMode.FORM;
  }
}
