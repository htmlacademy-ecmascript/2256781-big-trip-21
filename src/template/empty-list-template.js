import { NoEventText } from '../const.js';

const getEmptyListTemplate = ({ filter }) =>
  `<p class="trip-events__msg">${NoEventText[filter]}</p>`;

export { getEmptyListTemplate };
