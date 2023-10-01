import FilterView from '../view/filter-view.js';
import { remove, render, replace } from '../framework/render.js';
import { TypeOfChange } from '../const.js';
import { getViewFilters } from '../utils/filter.js';

export default class FilterPresenter {
  #container = null;
  #filterComponent = null;
  #filterModel = null;
  #eventModel = null;

  constructor({ container, filterModel, eventModel }) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#eventModel = eventModel;

    // INFO: Если презентер будет перемещён из BriefPresenter то эти строки понадобятся. Сейчас эти строки дублируют BriefPresenter
    //this.#filterModel.addObserver(this.#modelEventHandler);
    //this.#eventModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: getViewFilters(this.#eventModel.events),
      filter: this.#filterModel.filter,
      onChange: this.#filterChangeHandler,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  destroy() {
    remove(this.#filterComponent);
  }

  // INFO: Если презентер будет перемещён из BriefPresenter то эти строки понадобятся. Сейчас эти строки дублируют BriefPresenter
  // #modelEventHandler = () => {
  //   this.init();
  // };

  #filterChangeHandler = (filter) => {
    if (this.#filterModel.filter === filter) {
      return;
    }

    this.#filterModel.update(TypeOfChange.MAJOR, filter);
  };
}
