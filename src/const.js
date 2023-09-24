/**
 * Количество моковых событий для вывода
 * в борду
 * @type {string}
 */
const EVENT_COUNT = 2;

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

/**
 * @enum {string} Текст в маршруте когда нет ни одного события
 */
const NoEventText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

/**
 * @enum {string} Режим в котором открыта форма
 */
const FormMode = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

/**
 * @enum {string} Режим приложения
 */
const AppMode = {
  VIEW: 'VIEW',
  PRODUCTION: 'PRODUCTION',
};

/** @enum {string} Перечисление возможных режимов карточки события */
const EventMode = {
  CARD: 'CARD',
  FORM: 'FORM',
};

/** @enum {string} Перечисление возможных действия пользователя с событием */
const UserAction = {
  DELETE: 'DELETE',
  CHANGE: 'CHANGE',
  ADD: 'ADD',
};

/** @enum {string} Перечисление возможных типов перерисовки интерфейса */
const TypeChange = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
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
  EventMode,
  SortType,
  enableSortType,
  FormMode,
  UserAction,
  TypeChange,
  AppMode,
  NoEventText,
};
