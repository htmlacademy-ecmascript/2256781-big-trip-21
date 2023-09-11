import { SortType } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from './event.js';

const sortEvent = SortType.EVENT;
const sortOffer = SortType.OFFER;

const sort = {
  [SortType.DAY]: (events) => events.toSorted(sortByDay),
  [SortType.PRICE]: (events) => events.toSorted(sortByPrice),
  [SortType.TIME]: (events) => events.toSorted(sortByTime),
  [sortEvent]: () => {
    throw new Error(`Sort by ${sortEvent} isn't implemented!`);
  },
  [sortOffer]: () => {
    throw new Error(`Sort by ${sortOffer} isn't implemented!`);
  },
};

export { sort };
