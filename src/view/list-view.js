import AbstractView from '../framework/view/abstract-view.js';
import { getListTemplate } from '../template/list-template.js';

export default class ListView extends AbstractView {
  get template() {
    return getListTemplate();
  }
}
