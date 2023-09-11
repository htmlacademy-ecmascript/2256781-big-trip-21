import { getAddButtonTemplate } from '../template/adding-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class AddingButtonView extends AbstractView {
  get template() {
    return getAddButtonTemplate();
  }
}
