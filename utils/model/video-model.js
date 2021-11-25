import {Ajax} from "../ajax";
import {Base} from "../base";
class Video extends Base {
    constructor() {
        super();
    }
    getVideoBanner(callBack) {
      let ajax = new Ajax(`video.server.php?client_id=${this.client_id}`, "getVideoBanner");
      ajax.setParamData();
      ajax.bindSCallBack(callBack);
      ajax.request();
    }
    getlist(page,callBack){
        let ajax = new Ajax(`video.server.php?client_id=${this.client_id}`, "getProductVideoList");
        ajax.setParamData([page]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

    getDetail(id,callBack){
        let ajax = new Ajax(`video.server.php?client_id=${this.client_id}`, "getDetail");
        ajax.setParamData([id]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }


}

export {Video};