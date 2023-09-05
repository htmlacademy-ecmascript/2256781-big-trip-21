const POINT_COUNT = 3;
const PICTURE_COUNT = 8;

const TYPE_POINTS = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const MONTH_FORMAT = 'MMM';

const DAY_FORMAT = 'DD';

const TIME_FORMAT = 'HH:mm';

const CALENDAR_FORMAT = 'DD/MM/YY HH:mm';

const DATE_TIME_FORMAT = 'YYYY-MM-DD';

const DATE_TIME_FORMAT_WITH_TIME = 'YYYY-MM-DDTHH:mm';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const enableSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFER]: false,
};

export {
  POINT_COUNT,
  PICTURE_COUNT,
  MONTH_FORMAT,
  DAY_FORMAT,
  TIME_FORMAT,
  CALENDAR_FORMAT,
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT_WITH_TIME,
  TYPE_POINTS,
  FilterType,
  Mode,
  SortType,
  enableSortType,
};
