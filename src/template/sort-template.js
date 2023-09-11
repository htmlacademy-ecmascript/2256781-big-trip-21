const createSortItemTemplate = (sort = {}) => {
  const { type = '', isEnabled = false, isChecked = false} = sort;

  return `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${type}" value="sort-${type}"${!isEnabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${type}">${type}</label>
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
