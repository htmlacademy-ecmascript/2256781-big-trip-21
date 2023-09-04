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

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const findObject = (arr, key, value) => arr.find((obj) => obj[key] === value);

const isEscapeKey = (evt) => evt.key === 'Escape';

const sleep = (interval) => {
  const now = (date = new Date()) => date.getTime();
  const end = now() + interval;
  while (now() < end) {
    continue;
  }
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createRandomNumberFromRange,
  capitalizeFirstLetter,
  findObject,
  isEscapeKey,
  sleep,
};
