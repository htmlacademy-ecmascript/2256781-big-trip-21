import EventView from '../view/event-view.js';
import EventFormView from '../view/form-view.js';
import { remove, render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { FormMode, EventMode, UserAction, TypeOfChange } from '../const.js';
import { isBigDifference } from '../utils/event.js';

export default class EventPresenter {
  #eventListContainer = null;

  #eventComponent = null;
  #eventFormComponent = null;
  #event = null;
  #mode = null;

  #handleDataChange = null;
  #handleModeChange = null;
  #handleGetAllDestinations = null;
  #handleGetAllOffersByType = null;
  #handleGetDestinationByName = null;
  #handleGetCheckedOffers = null;
  #handleGetDestinationById = null;

  constructor({
    eventListContainer,
    onDataChange,
    onModeChange,
    getAllDestinations,
    getAllOffersByType,
    getDestinationByName,
    getCheckedOffers,
    getDestinationById,
  }) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#handleGetAllDestinations = getAllDestinations;
    this.#handleGetAllOffersByType = getAllOffersByType;
    this.#handleGetCheckedOffers = getCheckedOffers;
    this.#handleGetDestinationByName = getDestinationByName;
    this.#handleGetDestinationById = getDestinationById;

    this.#mode = EventMode.CARD;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevFormComponent = this.#eventFormComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      getDestinationById: this.#handleGetDestinationById,
      getCheckedOffers: this.#handleGetCheckedOffers,
      onRolloutClick: this.#buttonRolloutClickHandler,
      onFavoriteClick: this.#buttonFavoriteClickHandler,
    });

    this.#eventFormComponent = new EventFormView({
      event: this.#event,
      formMode: FormMode.EDITING,
      getAllDestinations: this.#handleGetAllDestinations,
      getAllOffersByType: this.#handleGetAllOffersByType,
      getCheckedOffers: this.#handleGetCheckedOffers,
      getDestinationByName: this.#handleGetDestinationByName,
      onRollupClick: this.#buttonRollupClickHandler,
      onSaveClick: this.#buttonSaveClickHandler,
      onResetClick: this.#buttonResetClickHandler,
      onDeleteClick: this.#buttonDeleteClickHandler,
    });

    if (prevEventComponent === null || prevFormComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === EventMode.CARD) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === EventMode.FORM) {
      replace(this.#eventComponent, prevFormComponent);
      this.#mode = EventMode.CARD;
    }

    remove(prevEventComponent);
    remove(prevFormComponent);
  }

  setSaving() {
    if (this.#mode === EventMode.FORM) {
      this.#eventFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === EventMode.FORM) {
      this.#eventFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === EventMode.CARD) {
      this.#eventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#eventFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventFormComponent.shake(resetFormState);
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

  #buttonRolloutClickHandler = () => {
    this.#replaceCardToForm();
  };

  /**
   * Обрабатывает нажатие пользователем на звёздочку
   */
  #buttonFavoriteClickHandler = () => {
    this.#handleDataChange(UserAction.CHANGE, TypeOfChange.PATCH, {
      ...this.#event,
      isFavorite: !this.#event.isFavorite,
    });
  };

  /**
   * Обрабатывает нажатие пользователем на стрелочку вверх
   */
  #buttonRollupClickHandler = () => {
    this.#eventFormComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  /**
   * Обрабатывает нажатие пользователем на кнопку Cancel
   */
  #buttonResetClickHandler = () => {
    this.#eventFormComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  /**
   * Обрабатывает нажатие пользователем на кнопку Save (Submit)
   * @param {Event} event
   */
  #buttonSaveClickHandler = (event) => {
    const isMinor = isBigDifference(event, this.#event);

    this.#handleDataChange(
      UserAction.CHANGE,
      isMinor ? TypeOfChange.MINOR : TypeOfChange.PATCH,
      event
    );
  };

  /**
   * Обрабатывает нажатие пользователем на кнопку Delete
   * @param {*} event
   */
  #buttonDeleteClickHandler = (event) => {
    this.#handleDataChange(UserAction.DELETE, TypeOfChange.MINOR, event);
  };

  /**
   * Обрабатывает нажатие пользователем на клавишу Esc
   * @param {Event} evt
   */
  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#eventFormComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  };

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = EventMode.CARD;
  }

  #replaceCardToForm() {
    replace(this.#eventFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = EventMode.FORM;
  }
}
