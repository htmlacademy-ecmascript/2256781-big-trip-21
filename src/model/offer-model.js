export default class OfferModel {
  #service = null;
  #offers = [];

  constructor(service) {
    this.#service = service;
  }

  async init() {
    try {
      this.#offers = await this.#service.offers;
    } catch (error) {
      this.#offers = [];
    }

    return this.#offers;
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type)?.offers;
  }
}
