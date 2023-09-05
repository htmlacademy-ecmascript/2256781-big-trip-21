import { filter } from '../utils/filter.js';

function generateFilter(points) {
  return Object.entries(filter).map(([filterType, filterPoints]) => {
    const filteredPoints = filterPoints(points);
    return {
      type: filterType,
      points: filteredPoints,
      count: filteredPoints?.length ? filteredPoints?.length : 0,
    };
  });
}

export { generateFilter };
