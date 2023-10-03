import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { CALENDAR_FORMAT } from '../const';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const parseDateForm = (dateString) =>
  dayjs.utc(dateString, CALENDAR_FORMAT).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

const getDateDiff = (fromDate, toDate, unit = 'ms') =>
  dayjs(toDate).diff(dayjs(fromDate), unit);

/**
 * Форматирует дату по переданному формату
 * @param {dayjs.ConfigType} date
 * @param {string} typeFormating
 * @returns {string}
 */
const formatDate = (date, typeFormating) =>
  date ? dayjs(date).format(typeFormating) : '';

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

const isPointPast = ({ dateFrom, dateTo }) =>
  dayjs().isAfter(dayjs(dateFrom)) && dayjs().isAfter(dayjs(dateTo));

const isPointPresent = ({ dateFrom, dateTo }) =>
  dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));

const isPointFuture = ({ dateFrom, dateTo }) =>
  dayjs().isBefore(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));

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
  dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) -
  dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const getMappedObjectsByIds = (listItems, ids, key = 'id') =>
  ids.map((id) => listItems.find((item) => item[key] === id));

const isBigDifference = (eventA, eventB) =>
  eventA.dateFrom !== eventB.dateFrom ||
  eventA.basePrice !== eventB.basePrice ||
  getDateDiff(eventA.dateFrom, eventA.dateTo) !==
    getDateDiff(eventB.dateFrom, eventB.dateTo);

export {
  formatDate,
  getDateDiff,
  getFormattedDateDifference,
  isPointPast,
  isPointPresent,
  isPointFuture,
  sortByDay,
  sortByPrice,
  sortByTime,
  getMappedObjectsByIds,
  isBigDifference,
  parseDateForm,
};
