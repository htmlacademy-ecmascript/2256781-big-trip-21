import { AppMode } from '../const.js';
import Observable from '../framework/observable.js';

export default class AddModel extends Observable {
  #appMode = undefined;

  init() {
    this.#appMode = AppMode.VIEW;
  }

  get appMode() {
    return this.#appMode;
  }

  update(type, payload) {
    // INFO: обновляется набор событий полученным объектом
    this.#appMode = payload;

    // INFO: информирование подписчиков о происшедшем событии
    this._notify(type, payload);
  }
}

// REVIEW: ТЗ
// Ссылка на лайв 50 минута
// https://up.htmlacademy.ru/profession/react/13/ecmascript/21/module/7/item/11

// создание точки - первое событие
// в конструкторе создать NewPointPresenter (в него передать viewActionHandler and newPointDestroyHandler)
// презентер кнопки - блокировать кнопку disableButton
// пр. фильтра - сбросить фильтр на Everything
// пр. стори - сбросить сортировку на Day
// показывает форму создания новой точки т.е. заново newPointPresenter.init()

// отмена точки - второе событие
// разблокировать кнопку
// удалить форму создания новой точки newPointDestroyHandler
