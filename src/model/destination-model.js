export default class DestinationModel {
  #service = null;
  #destinations = [];

  constructor(service) {
    this.#service = service;
  }

  async init() {
    try {
      this.#destinations = await this.#service.destinations;
    } catch (error) {
      this.#destinations = [];
    }

    return this.#destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return (
      this.#destinations.find((destination) => destination.id === id) || null
    );
  }

  getByName(name) {
    return (
      this.#destinations.find((destination) => destination.name === name) ||
      null
    );
  }
}
