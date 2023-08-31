import { getAddButtonTemplate } from '../template/add-button-template.js';
import AbstractView from '../framework/view/abstract-view';

export default class AddButtonView extends AbstractView {
  get template() {
    return getAddButtonTemplate();
  }
}
