import { TYPE_EVENTS, FormMode, CALENDAR_FORMAT } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { BLANK_POINT, BLANK_DESTINATION, formatDate } from '../utils/event.js';

const getOfferTemplate = ({ type, id, title, price, offers }) =>
  `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-luggage" data-id="${id}" ${offers.some((offer) => offer.id === id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${type}-${id}">
        <span class="event__offer-title">${title}</span>
        +€&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;

const getEventTypeTemplate = () =>
  `
    ${TYPE_EVENTS.map((type) => `
      <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>`).join('')}
  `;

const getDestinationListTemplate = ({ destinations }) =>
  `
    <datalist id="destination-list-1">
      ${destinations?.map((item) => `<option value="${item.name}"></option>`).join('')}
    </datalist>
  `;

const getFormTemplate = ({
  event = BLANK_POINT,
  destination = BLANK_DESTINATION,
  formMode,
  destinations = [],
  checkedOffers = [],
  allOffersByType = [],
}) => {
  const { type, basePrice, dateFrom, dateTo } = event;
  const { name, description, pictures } = destination;
  const isEditingMode = formMode === FormMode.EDITING;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${getEventTypeTemplate()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${capitalizeFirstLetter(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          ${getDestinationListTemplate({destinations})}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, CALENDAR_FORMAT)}">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, CALENDAR_FORMAT)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${isEditingMode ? 'Delete' : 'Cancel'}</button>
        ${isEditingMode ? '<button class="event__rollup-btn" type="button">' : ''}
        <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        ${allOffersByType && allOffersByType.length > 0 ? `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${allOffersByType?.map(({ id, title, price }) => getOfferTemplate({ type, id, title, price, offers: checkedOffers })).join('')}
          </div>
        </section>` : ''}
        ${description ? `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
        ` : ''}
        ${pictures && pictures.length > 0 ? `<div class="event__photos-container"><div class="event__photos-tape">${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}</div></div></section>` : ''}
      </section>
    </form>
  </li>`;
};

export { getFormTemplate };