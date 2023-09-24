import { getSortTemplate } from '../template/sort-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class SortView extends AbstractView {
  #sorts = null;
  #handleChangeSort = null;

  constructor({ sorts, onChangeSort }) {
    super();
    this.#sorts = sorts;
    this.#handleChangeSort = onChangeSort;

    this.element.addEventListener('click', this.#changeSortHandler);
  }

  get template() {
    return getSortTemplate({ sorts: this.#sorts });
  }

  /**
   * Вариант форматирования даты для dayjs
   * @param {Event} evt Объект события
   */
  #changeSortHandler = (evt) => {
    if (evt.target.dataset?.sortType && evt.target.tagName === 'INPUT') {
      evt.stopPropagation();
      evt.preventDefault();
      this.#handleChangeSort(evt.target.dataset.sortType);
    }
  };
}
