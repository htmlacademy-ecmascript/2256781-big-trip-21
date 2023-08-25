export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = '';
    this.#offers = '';
    this.#points = '';
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#destinations;
  }

  getPoints() {
    return this.#points;
  }

  #generateDestinations() {}

  #generateOffers() {}

  #generatePoints() {}
}
