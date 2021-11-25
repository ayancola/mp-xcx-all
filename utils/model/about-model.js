import {Ajax} from "../ajax";
import {Base} from "../base";
class About extends Base {
  constructor() {
      super();
  }

  //企业简介
  getPage(callBack) {
    // let ajax = new Ajax(`about.server.php?client_id=${this.client_id}`, "getPage");
    let ajax = new Ajax(`about.server.php?client_id=${this.client_id}`, "getPage2");
    ajax.setParamData();
    ajax.bindSCallBack(callBack);
    ajax.request();
  }

  //企业相册
  getPhoto(rid,callBack) {
    let ajax = new Ajax(`about.server.php?client_id=${this.client_id}`, "photoAndHonor");
    ajax.setParamData([rid]);
    ajax.bindSCallBack(callBack);
    ajax.request();
  }

  //内页Banner
  getBanner(callBack) {
    let ajax = new Ajax(`about.server.php?client_id=${this.client_id}`, "getBanner");
    // ajax.setParamData([rid]);
    ajax.bindSCallBack(callBack);
    ajax.request();
  }

  // //资质荣誉
  // getHonor(rid,callBack) {
  //   let ajax = new Ajax(`about.server.php?client_id=${this.client_id}`, "photoAndHonor");
  //   ajax.setParamData([rid]);
  //   ajax.bindSCallBack(callBack);
  //   ajax.request();
  // }

}

export { About };