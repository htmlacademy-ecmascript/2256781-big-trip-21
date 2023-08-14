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

export { createRandomNumberFromRange, getRandomArrayElement };
