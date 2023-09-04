import { getFilterTemplate } from '../template/filter-template.js';
import AbstractView from '../framework/view/abstract-view';

export default class FilterView extends AbstractView {
  get template() {
    return getFilterTemplate();
  }
}
