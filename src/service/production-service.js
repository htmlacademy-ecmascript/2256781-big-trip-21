import ApiService from '../framework/api-service.js';
import { Method } from '../const.js';

export default class ProductionService extends ApiService {
  get events() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  get destinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  async addEvent() {}

  async deleteEvent() {}

  #adaptToServer(event) {
    const adaptedEvent = {
      ...event,
      'base_price': Number(event.basePrice),
      'date_from': event.dateFrom,
      'date_to': event.dateTo,
      'is_favorite': event.isFavorite,
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }

  adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      basePrice: Number(event.base_price),
      dateFrom: event.date_from,
      dateTo: event.date_to,
      isFavorite: event.is_favorite,
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
