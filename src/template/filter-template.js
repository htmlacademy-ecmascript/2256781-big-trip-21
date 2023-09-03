const createFilterItemTemplate = (filter, isChecked) => {
  const { type, count } = filter;

  return `
  <div class="trip-filters__filter">
    <input
      type="radio"
      id="filter-${type}"
      class="trip-filters__filter-input visually-hidden"
      name="trip-filter" ${isChecked ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}<span class="filter__${type}-count"> (${count})</span></label>
  </div>
`;
};

const getFilterTemplate = ({ filters }) => {
  const filterItemsTemplate = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `
  <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;
};

export { getFilterTemplate };
