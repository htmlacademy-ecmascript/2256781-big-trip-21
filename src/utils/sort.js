import { SortType } from '../const.js';

const sortEvent = SortType.EVENT;
const sortOffer = SortType.OFFER;

const sort = {
  [SortType.DAY]: (points) => [...points],
  [SortType.PRICE]: (points) => [...points],
  [SortType.TIME]: (points) => [...points],
  [sortEvent]: () => {
    throw new Error(`Sort by ${sortEvent} isn't implemented!`);
  },
  [sortOffer]: () => {
    throw new Error(`Sort by ${sortOffer} isn't implemented!`);
  },
};

export { sort };
