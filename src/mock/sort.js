import { sort } from '../utils/sort.js';
import { enableSortType, SortType } from '../const.js';

function generateSort(points) {
  return Object.entries(sort).map(([type, sortPoints]) => {
    const isEnabled = enableSortType[type];
    const isChecked = type === SortType.DAY;
    const sortedPoints = isEnabled ? sortPoints(points) : [];
    return {
      type,
      points: sortedPoints,
      isEnabled,
      isChecked,
    };
  });
}

export { generateSort };
