import { getSortTemplate } from '../template/sort-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class SortView extends AbstractView {
  #sorts = null;
  #handlerChangeSort = null;

  constructor({ sorts, onChangeSort }) {
    super();
    this.#sorts = sorts;
    this.#handlerChangeSort = onChangeSort;

    this.element.addEventListener('click', this.#changeSort);
  }

  get template() {
    return getSortTemplate({ sorts: this.#sorts });
  }

  /**
   * Вариант форматирования даты для dayjs
   * @param {Event} evt Объект события
   */
  #changeSort = (evt) => {
    if (evt.target.dataset?.sortType && evt.target.tagName === 'INPUT') {
      evt.stopPropagation();
      evt.preventDefault();
      this.#handlerChangeSort(evt.target.dataset.sortType);
    }
  };
}
