import AbstractView from '../framework/view/abstract-view.js';
import { getLoadingTemplate } from '../template/loading-list-point-template.js';

export default class LoadingView extends AbstractView {
  get template() {
    return getLoadingTemplate();
  }
}
