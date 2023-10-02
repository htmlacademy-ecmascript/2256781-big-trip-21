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
      this._notify(TypeOfChange.SUCCESS);
    } catch (error) {
      this.#events = [];
      this._notify(TypeOfChange.FAILURE);
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

  async update(type, payload) {
    try {
      // INFO: связь с сервером
      const response = await this.#service.updateEvent(payload);
      const updatedEvent = this.#service.adaptToClient(response);

      // INFO: обновляется набор событий - объектом с сервера после адаптации
      this.#events = updateListItem(this.#events, updatedEvent);

      // INFO: информирование подписчиков о происшедшем событии
      this._notify(type, updatedEvent);
    } catch (error) {
      throw new Error('Cannot add event', error);
    }
  }

  async add(type, payload) {
    try {
      // INFO: связь с сервером
      const response = await this.#service.addEvent(payload);
      const addedEvent = this.#service.adaptToClient(response);

      // INFO: обновляется набор событий - добавляется объект после адаптации
      this.#events.push(addedEvent);

      // INFO: информирование подписчиков о происшедшем событии
      this._notify(type, addedEvent);
    } catch (error) {
      throw new Error('Cannot add event', error);
    }
  }

  async delete(type, payload) {
    try {
      // INFO: связь с сервером
      await this.#service.deleteEvent(payload);

      // INFO: обновляется набор событий - удаляется объект
      this.#events = deleteListItem(this.#events, payload);

      // INFO: информирование подписчиков о происшедшем событии
      this._notify(type, payload);
    } catch (error) {
      throw new Error('Cannot delete event', error);
    }
  }
}
