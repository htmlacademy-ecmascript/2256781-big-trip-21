import { encode } from 'he';

const createFilterItemTemplate = (filter, isChecked) => {
  const { type, count } = filter;

  return `
  <div class="trip-filters__filter">
    <input
      id="filter-${encode(type)}"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="${encode(type)}"
      data-item="${encode(type)}"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${encode(type)}">${encode(type)}</label>
  </div>
`;
};

const getFilterTemplate = ({ filters, filter }) => {
  const filterIndex = filters.findIndex((f) => f.type === filter);
  const filterItemsTemplate = filters
    .map((item, index) => createFilterItemTemplate(item, index === filterIndex))
    .join('');

  return `
  <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;
};

export { getFilterTemplate };
