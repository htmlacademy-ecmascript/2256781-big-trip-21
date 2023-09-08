import { getAddButtonTemplate } from '../template/add-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class AddButtonView extends AbstractView {
  get template() {
    return getAddButtonTemplate();
  }
}
