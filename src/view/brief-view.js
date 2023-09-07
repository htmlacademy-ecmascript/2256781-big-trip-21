import AbstractView from '../framework/view/abstract-view.js';
import { getBriefTemplate } from '../template/brief-template.js';

export default class BriefView extends AbstractView {
  get template() {
    return getBriefTemplate();
  }
}
