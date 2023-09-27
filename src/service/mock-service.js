import { generateEvent } from '../mock/data.js';
import { EVENT_COUNT } from '../const.js';
import { DESTINATIONS, OFFERS } from '../mock/data.js';

export default class MockService {
  #destinations = [];
  #events = [];
  #offers = [];

  constructor() {
    this.#destinations = DESTINATIONS;
    this.#offers = OFFERS;
    this.#events = this.#generateEvents();
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
  }

  getEvents() {
    return this.#events;
  }

  #generateEvents() {
    return Array.from({ length: EVENT_COUNT }, () => generateEvent());
  }

  updateEvent(event) {
    return event;
  }

  addEvent(data) {
    return { ...data, id: crypto.randomUUID() };
  }

  deleteEvent() {
    // ...
  }
}
