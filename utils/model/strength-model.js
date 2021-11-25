import {Ajax} from "../ajax";
import {Base} from "../base";
class Strength extends Base {
  constructor() {
      super();
  }

  //banner_img
  getPage(callBack) {
    let ajax = new Ajax(`strength.server.php?client_id=${this.client_id}`, "getPage");
    ajax.setParamData();
    ajax.bindSCallBack(callBack);
    ajax.request();
  }

}

export { Strength };