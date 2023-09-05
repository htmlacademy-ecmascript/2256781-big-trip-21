import { SortType } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from './point.js';

const sortEvent = SortType.EVENT;
const sortOffer = SortType.OFFER;

const sort = {
  [SortType.DAY]: (points) => points.toSorted(sortByDay),
  [SortType.PRICE]: (points) => points.toSorted(sortByPrice),
  [SortType.TIME]: (points) => points.toSorted(sortByTime),
  [sortEvent]: () => {
    throw new Error(`Sort by ${sortEvent} isn't implemented!`);
  },
  [sortOffer]: () => {
    throw new Error(`Sort by ${sortOffer} isn't implemented!`);
  },
};

export { sort };
