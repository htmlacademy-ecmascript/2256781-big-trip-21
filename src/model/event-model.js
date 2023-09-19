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

  update(action, event) {
    // INFO: связь с сервером
    const updatedEvent = this.#service.updateEvent(event);

    // INFO: обновляется набор событий полученным объектом
    this.#events = updateListItem(this.#events, updatedEvent);

    // INFO: информирование подписчиков о происшедшем событии
    this._notify(action, updatedEvent);
  }

  add(action, event) {
    // INFO: связь с сервером
    const addedEvent = this.#service.addEvent(event);

    // INFO: обновляется набор событий добавляется объект
    this.#events.push(addedEvent);

    // INFO: информирование подписчиков о происшедшем событии
    this._notify(action, addedEvent);
  }

  delete(action, event) {
    // INFO: связь с сервером
    this.#service.deleteEvent(event);

    // INFO: обновляется набор событий удаляется объект
    this.#events = deleteListItem(this.#events, event);

    // INFO: информирование подписчиков о происшедшем событии
    this._notify(action);
  }
}
