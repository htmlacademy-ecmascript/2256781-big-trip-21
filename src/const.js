/**
 * Количество моковых событий для вывода
 * в борду
 * @type {string}
 */
const EVENT_COUNT = 1;

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

const DATE_TIME_DURATION = 'DD MMM';

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

const InformationMessage = {
  INITIALIZE_SUCCESS:
    'SUCCESS! route points, destinations and offers - received from the server',
  INITIALIZE_FAILURE:
    'FAILURE! route points, destinations or offers - returned empty after a request to the server',
  UPDATE_FAILURE: 'FAILURE! When updating an event',
  UPDATE_SUCCESS: 'SUCCESS! When updating an event',
  ADD_FAILURE: 'FAILURE! When adding an event',
  ADD_SUCCESS: 'SUCCESS! When adding an event',
  DELETE_FAILURE: 'FAILURE! When deleting an event',
  DELETE_SUCCESS: 'SUCCESS! When deleting an event',
};

/**
 * @enum {string} Режим в котором открыта форма
 */
const FormMode = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
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
const TypeOfChange = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  ADDING: 'ADDING',
  REJECTION: 'REJECTION',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  CREATING: 'CREATING',
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

const getCredential = () => ({
  AUTHORIZATION: 'Basic MQP4ERqKpF5kRG7',
  END_POINT: 'https://21.objects.pages.academy/big-trip',
});

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const DESTINATION_LENGTH = 3;

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const ButtonLabel = {
  CANCEL_DEFAULT: 'Cancel',
  DELETE_DEFAULT: 'Delete',
  DELETE_IN_PROGRESS: 'Deleting...',
  SAVE_DEFAULT: 'Save',
  SAVE_IN_PROGRESS: 'Saving...',
};

const BLANK_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

const BLANK_DESTINATION = {
  description: '',
  name: '',
  pictures: [],
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
  TypeOfChange,
  NoEventText,
  getCredential,
  Method,
  DESTINATION_LENGTH,
  DATE_TIME_DURATION,
  ButtonLabel,
  BLANK_POINT,
  BLANK_DESTINATION,
  InformationMessage,
};
