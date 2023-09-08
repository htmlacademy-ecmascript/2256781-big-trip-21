/**
 * Количество моковых событий для вывода
 * в борду
 * @type {string}
 */
const EVENT_COUNT = 3;

/** @enum {string} Перечисление возможных типов событий */
const TYPE_EVENTS = [
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

/**
 * Вариант форматирования даты для dayjs
 * @type {string}
 */
const MONTH_FORMAT = 'MMM';

/**
 * Вариант форматирования даты для dayjs
 * @type {string}
 */
const DAY_FORMAT = 'DD';

/**
 * Вариант форматирования даты для dayjs
 * @type {string}
 */
const TIME_FORMAT = 'HH:mm';

/**
 * Вариант форматирования даты для dayjs
 * @type {string}
 */
const CALENDAR_FORMAT = 'DD/MM/YY HH:mm';

/**
 * Вариант форматирования даты для dayjs
 * @type {string}
 */
const DATE_TIME_FORMAT = 'YYYY-MM-DD';

/**
 * Вариант форматирования даты для dayjs
 * @type {string}
 */
const DATE_TIME_FORMAT_WITH_TIME = 'YYYY-MM-DDTHH:mm';

/** @enum {string} Перечисление возможных фильтров */
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

/** @enum {string} Перечисление возможных режимов карточки события */
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

/** @enum {string} Перечисление возможных сортировок */
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

/** @enum {string} Перечисление описывающее доступность вариантов сортировки */
const enableSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFER]: false,
};

export {
  EVENT_COUNT,
  MONTH_FORMAT,
  DAY_FORMAT,
  TIME_FORMAT,
  CALENDAR_FORMAT,
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT_WITH_TIME,
  TYPE_EVENTS,
  FilterType,
  Mode,
  SortType,
  enableSortType,
};
