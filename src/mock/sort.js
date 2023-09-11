import { sort } from '../utils/sort.js';
import { enableSortType } from '../const.js';

function generateSort(events, currentSortType) {
  return Object.entries(sort).map(([type, sortEvents]) => {
    const isEnabled = enableSortType[type];
    const isChecked = type === currentSortType;
    const sortedEvents = isEnabled ? sortEvents(events) : [];
    return {
      type,
      events: sortedEvents,
      isEnabled,
      isChecked,
    };
  });
}

function getSortDescription(currentSortType) {
  return Object.entries(sort).map(([type]) => {
    const isEnabled = enableSortType[type];
    const isChecked = type === currentSortType;
    return {
      type,
      isEnabled,
      isChecked,
    };
  });
}

export { generateSort, getSortDescription };
