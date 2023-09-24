import { FilterType } from '../const.js';
import { isPointPast } from './event.js';
import { isPointPresent } from './event.js';
import { isPointFuture } from './event.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
  [FilterType.PRESENT]: (points) =>
    points.filter((point) => isPointPresent(point)),
  [FilterType.FUTURE]: (points) =>
    points.filter((point) => isPointFuture(point)),
};

function getViewFilters(points) {
  return Object.entries(filter).map(([filterType, filterPoints]) => {
    const filteredPoints = filterPoints(points);
    return {
      type: filterType,
      points: filteredPoints,
      count: filteredPoints?.length ? filteredPoints?.length : 0,
    };
  });
}

export { filter, getViewFilters };
