import dayjs from 'dayjs';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createRandomNumberFromRange = (
  startNumber,
  endNumber,
  isUnique = true
) => {
  const previousValues = [];

  if (
    !isFinite(startNumber) ||
    !isFinite(endNumber) ||
    !Number.isInteger(startNumber) ||
    !Number.isInteger(endNumber)
  ) {
    return NaN;
  }

  return function () {
    let currentValue = getRandomInteger(startNumber, endNumber);

    if (isUnique) {
      if (previousValues.length >= endNumber - startNumber + 1) {
        return null;
      }

      while (previousValues.includes(currentValue)) {
        currentValue = getRandomInteger(startNumber, endNumber);
      }
      previousValues.push(currentValue);
    }

    return currentValue;
  };
};

const humanizeDiffDate = (fromDate, toDate) =>
  dayjs(toDate).diff(dayjs(fromDate), 'h');

const humanizeDate = (date, typeFormating) =>
  date ? dayjs(date).format(typeFormating) : '';

const getDate = ({ next }) => {
  const currentDate = new Date();

  return next
    ? dayjs(currentDate).add(getRandomInteger(0, 60), 'minute').add(getRandomInteger(0, 24), 'hour').add(getRandomInteger(0, 28), 'day').toDate()
    : dayjs().toDate();
};

export {
  createRandomNumberFromRange,
  getRandomArrayElement,
  humanizeDate,
  humanizeDiffDate,
  getDate,
};
