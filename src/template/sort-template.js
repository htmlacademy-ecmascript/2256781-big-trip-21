import { encode } from 'he';

const createSortItemTemplate = (sort = {}) => {
  const { type = '', isEnabled = false, isChecked = false} = sort;

  return `
  <div class="trip-sort__item  trip-sort__item--${encode(type)}">
    <input id="sort-${encode(type)}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${encode(type)}" value="sort-${encode(type)}"${!isEnabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${encode(type)}">${encode(type)}</label>
  </div>
`;
};

const getSortTemplate = ({ sorts }) => {
  const sortItemsTemplate = sorts.map((sort) => createSortItemTemplate(sort)).join('');

  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>
`;
};

export { getSortTemplate };
