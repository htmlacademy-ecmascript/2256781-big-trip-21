import { TypeOfChange } from '../const.js';
import Observable from '../framework/observable.js';
import { updateListItem, deleteListItem } from '../utils/common.js';

export default class EventModel extends Observable {
  #service = null;
  #destinationModel = null;
  #offerModel = null;
  #events = [];

  constructor({ service, destinationModel, offerModel }) {
    super();
    this.#service = service;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationModel.init(),
        this.#offerModel.init(),
      ]);
      const events = await this.#service.events;
      this.#events = events.map(this.#service.adaptToClient);
      this._notify(TypeOfChange.SUCCESS, {
        isError: false,
        message:
          'SUCCESS! route points, destinations and offers - received from the server',
      });
    } catch (error) {
      this.#events = [];
      this._notify(TypeOfChange.FAILURE, {
        isError: true,
        message:
          'FAILURE! route points, destinations or offers - left empty after a request to the server',
      });
    }
  }

  /**
   * Отдаёт все события содержащиеся в модели
   * @public
   * @readonly
   * @returns {Array<Object>}
   */
  get events() {
    return this.#events;
  }

  update(type, payload) {
    try {
      // INFO: связь с сервером
      const updatedEvent = this.#service.updateEvent(payload);

      // INFO: обновляется набор событий полученным объектом
      this.#events = updateListItem(this.#events, updatedEvent);

      // INFO: информирование подписчиков о происшедшем событии
      this._notify(type, updatedEvent);
    } catch (error) {
      throw new Error('Cannot update event');
    }
  }

  add(type, payload) {
    // INFO: связь с сервером
    const addedEvent = this.#service.addEvent(payload);

    // INFO: обновляется набор событий добавляется объект
    this.#events.push(addedEvent);

    // INFO: информирование подписчиков о происшедшем событии
    this._notify(type, addedEvent);
  }

  delete(type, payload) {
    // INFO: связь с сервером
    this.#service.deleteEvent(payload);

    // INFO: обновляется набор событий удаляется объект
    this.#events = deleteListItem(this.#events, payload);

    // INFO: информирование подписчиков о происшедшем событии
    this._notify(type);
  }
}
