const capitalizeFirstLetter = (string = '') =>
  string.length > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : '';

const findObject = (arr, key, value) => arr.find((obj) => obj[key] === value);

const isEscapeKey = (evt) => evt.key === 'Escape';

const sleep = (interval) => {
  const now = (date = new Date()) => date.getTime();
  const end = now() + interval;
  while (now() < end) {
    continue;
  }
};

const updateListItem = (listItems, updatedItem, key = 'id') =>
  listItems.map((item) =>
    item[key] === updatedItem[key] ? updatedItem : item
  );

const deleteListItem = (listItems, deletedItem) =>
  listItems.filter((item) => item.id !== deletedItem.id);

export {
  capitalizeFirstLetter,
  findObject,
  isEscapeKey,
  sleep,
  updateListItem,
  deleteListItem,
};
