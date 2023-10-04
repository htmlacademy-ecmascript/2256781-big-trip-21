import { SortType } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from './event.js';

const sortEvent = SortType.EVENT;
const sortOffer = SortType.OFFER;

const sort = {
  [SortType.DAY]: (events) => events.toSorted(sortByDay),
  [sortEvent]: () => {
    throw new Error(`Sort by ${sortEvent} isn't implemented!`);
  },
  [SortType.TIME]: (events) => events.toSorted(sortByTime),
  [SortType.PRICE]: (events) => events.toSorted(sortByPrice),
  [sortOffer]: () => {
    throw new Error(`Sort by ${sortOffer} isn't implemented!`);
  },
};

export { sort };
