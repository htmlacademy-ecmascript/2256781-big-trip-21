import { remove, render, RenderPosition } from '../framework/render.js';
import EventFormView from '../view/form-view.js';
import { UserAction, FormMode, TypeOfChange } from '../const.js';

export default class CreatingPresenter {
  #eventListContainer = null;

  #handleDataChange = null;
  #handleDestroy = null;
  #handleGetAllDestinations = null;
  #handleGetAllOffersByType = null;
  #handleGetDestinationByName = null;

  #eventFormComponent = null;

  constructor({
    eventListContainer,
    onDataChange,
    onDestroy,
    getAllDestinations,
    getAllOffersByType,
    getDestinationByName,
  }) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#handleGetAllDestinations = getAllDestinations;
    this.#handleGetAllOffersByType = getAllOffersByType;
    this.#handleGetDestinationByName = getDestinationByName;
  }

  init() {
    if (this.#eventFormComponent !== null) {
      return;
    }

    this.#eventFormComponent = new EventFormView({
      event: undefined,
      formMode: FormMode.CREATING,
      getAllDestinations: this.#handleGetAllDestinations,
      getAllOffersByType: this.#handleGetAllOffersByType,
      getCheckedOffers: undefined,
      getDestinationByName: this.#handleGetDestinationByName,
      onRollupClick: undefined,
      onSaveClick: this.#saveClickHandler,
      onResetClick: this.#destroyClickHandler,
      onDeleteClick: undefined,
    });

    render(
      this.#eventFormComponent,
      this.#eventListContainer,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventFormComponent === null) {
      return;
    }

    remove(this.#eventFormComponent);
    this.#eventFormComponent = null;

    this.#handleDestroy();

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#eventFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventFormComponent.shake(resetFormState);
  }

  #saveClickHandler = (event) => {
    this.#handleDataChange(UserAction.ADD, TypeOfChange.MINOR, {
      ...event,
    });
  };

  #destroyClickHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
