export default class EventModel {
  #service = null;
  #events = null;

  constructor(service) {
    this.#service = service;
    this.#events = this.#service.getEvents();
  }

  /**
   * Property events
   * @public
   * @readonly
   * @returns {Array<Object>}
   */
  get events() {
    return this.#events;
  }
}
