import Observable from '../framework/observable.js';
import { updateListItem, deleteListItem } from '../utils/common.js';

export default class EventModel extends Observable {
  #service = null;
  #events = null;

  constructor(service) {
    super();
    this.#service = service;
    this.#events = this.#service.getEvents();
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
    // INFO: связь с сервером
    const updatedEvent = this.#service.updateEvent(payload);

    // INFO: обновляется набор событий полученным объектом
    this.#events = updateListItem(this.#events, updatedEvent);

    // INFO: информирование подписчиков о происшедшем событии
    this._notify(type, updatedEvent);
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
