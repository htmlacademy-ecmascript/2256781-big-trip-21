import { formatDate, getFormattedDateDifference } from '../utils/event.js';
import {
  DAY_FORMAT,
  MONTH_FORMAT,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT_WITH_TIME,
} from '../const.js';

const getEventOfferTemplate = ({ title, price }) => `
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    +€&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`;

// const cbEventOfferTemplate =
//   ({ offers, type }) =>
//   (offerId) => {
//     const offerByType = findObject(offers, 'type', type);

//     if (!offerByType) {
//       return;
//     }

//     const offer =
//       offerByType?.offers && offerByType.offers.length > 0
//         ? findObject(offerByType.offers, 'id', offerId)
//         : '';

//     return getEventOfferTemplate(offer);
//   };

const getEventTemplate = ({ event, destination, offers }) => {
  const { basePrice, dateFrom, dateTo, isFavorite, type} = event;
  const { name: destinationName } = destination;

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${formatDate(dateFrom, DATE_TIME_FORMAT)}">${formatDate(dateFrom, MONTH_FORMAT)}${formatDate(dateFrom, DAY_FORMAT)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinationName}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formatDate(dateFrom, DATE_TIME_FORMAT_WITH_TIME)}">${formatDate(dateFrom, TIME_FORMAT)}</time>
          —
          <time class="event__end-time" datetime="${formatDate(dateTo, DATE_TIME_FORMAT_WITH_TIME)}">${formatDate(dateTo, TIME_FORMAT)}</time>
        </p>
        <p class="event__duration">${getFormattedDateDifference(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.map(getEventOfferTemplate).join('')}
      </ul>
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`;
};

export { getEventTemplate };
