import dayjs from 'dayjs';
import { getRandomInteger } from './common';

const getDateDiff = (fromDate, toDate, unit = 'ms') =>
  dayjs(toDate).diff(dayjs(fromDate), unit);

const formatDate = (date, typeFormating) =>
  date ? dayjs(date).format(typeFormating) : '';

const getDate = ({ next }) => {
  const currentDate = new Date();

  return next
    ? dayjs(currentDate)
      .add(getRandomInteger(0, 60), 'minute')
      .add(getRandomInteger(0, 24), 'hour')
      .add(getRandomInteger(0, 28), 'day')
      .toDate()
    : dayjs().toDate();
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
export {
  formatDate,
  getDateDiff,
  getFormattedDateDifference,
  getDate,
  BLANK_POINT,
  BLANK_DESTINATION,
};
