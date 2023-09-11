import dayjs from 'dayjs';
import { getRandomInteger } from './common';

const getDateDiff = (fromDate, toDate, unit = 'ms') =>
  dayjs(toDate).diff(dayjs(fromDate), unit);

/**
 * @param {dayjs.ConfigType} date
 * @param {string} typeFormating
 * @returns {string}
 */
const formatDate = (date, typeFormating) =>
  date ? dayjs(date).format(typeFormating) : '';

const getDate = ({ next }) => {
  const isPlus = !getRandomInteger(0, 1);

  return next
    ? dayjs()
      .add(getRandomInteger(0, 28), 'day')
      .add(getRandomInteger(0, 24), 'hour')
      .add(getRandomInteger(0, 60), 'minute')
      .toDate()
    : dayjs()
      .add(isPlus ? getRandomInteger(0, 1) : -1, 'day')
      .toDate();
};

const getFormattedDateDifference = (dateFrom, dateTo) => {
  const dayCount = getDateDiff(dateFrom, dateTo, 'd');
  const hourCount = getDateDiff(dateFrom, dateTo, 'h');
  const minuteCount = getDateDiff(dateFrom, dateTo, 'm');
  let formattedDate;

  if (dayCount === 0 && hourCount === 0) {
    formattedDate = `${minuteCount}M`;
  } else if (dayCount === 0) {
    formattedDate = `${hourCount}H ${minuteCount - hourCount * 60}M`;
  } else {
    formattedDate = `${dayCount}D ${hourCount - dayCount * 24}H ${
      minuteCount - hourCount * 60
    }M`;
  }
  return formattedDate;
};

const BLANK_POINT = {
  id: crypto.randomUUID(),
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: '',
  isFavorite: false,
  offers: [],
  type: '',
};

const BLANK_DESTINATION = {
  id: crypto.randomUUID(),
  description: '',
  name: '',
  pictures: [],
};

const isPointPast = ({ dateFrom }) => dayjs().isAfter(dateFrom, 'day');

const isPointPresent = ({ dateFrom }) => dayjs().isSame(dateFrom, 'day');

const isPointFuture = ({ dateFrom }) => dayjs().isBefore(dateFrom, 'day');

const sortByDay = (pointA, pointB) => {
  if (dayjs(pointA.dateFrom).isAfter(dayjs(pointB.dateFrom))) {
    return 1;
  }

  if (dayjs(pointA.dateFrom) === dayjs(pointB.dateFrom)) {
    return 0;
  }

  if (dayjs(pointA.dateFrom).isBefore(dayjs(pointB.dateFrom))) {
    return -1;
  }
};

const sortByTime = (pointA, pointB) =>
  dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)) -
  dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

const sortByPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

const getMappedObjectsByIds = (listItems, ids, key = 'id') =>
  ids.map((id) => listItems.find((item) => item[key] === id));

export {
  formatDate,
  getDateDiff,
  getFormattedDateDifference,
  getDate,
  BLANK_POINT,
  BLANK_DESTINATION,
  isPointPast,
  isPointPresent,
  isPointFuture,
  sortByDay,
  sortByPrice,
  sortByTime,
  getMappedObjectsByIds,
};
