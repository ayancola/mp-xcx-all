import {Ajax} from "../ajax";
import {Base} from "../base";
class Index extends Base {
  constructor() {
      super();
  }

    //banner_img
    getImg(callBack) {
      let ajax = new Ajax(`index.server.php?client_id=${this.client_id}`, "mGetIndexData");
      ajax.setParamData();
      ajax.bindSCallBack(callBack);
      ajax.request();
    }

    //产品分类
    productClassList(callBack){
      let ajax = new Ajax(`index.server.php?client_id=${this.client_id}`, "productClassList");
      ajax.setParamData();
      ajax.bindSCallBack(callBack);
      ajax.request();
    }

    //推荐产品
    hotProduct(callBack) {
      let ajax = new Ajax(`index.server.php?client_id=${this.client_id}`, "hotProduct");
      ajax.setParamData();
      ajax.bindSCallBack(callBack);
      ajax.request();
    }

    // 首页关于我们
    indexAbout(callBack) {
      let ajax = new Ajax(`index.server.php?client_id=${this.client_id}`, "indexAbout");
      ajax.setParamData();
      ajax.bindSCallBack(callBack);
      ajax.request();
    }

    // 新闻资讯
    newsList(callBack) {
      let ajax = new Ajax(`index.server.php?client_id=${this.client_id}`, "newsList");
      ajax.setParamData();
      ajax.bindSCallBack(callBack);
      ajax.request();
    }

}


export {Index};