import {Ajax} from "../ajax";
import {Base} from "../base";

class News extends Base {
    constructor() {
        super();
    }

    //新闻列表
    getNewsData(first_load, cid, page, callBack) {
        if (first_load == 1) {
            var url = `news.server.php?client_id=${this.client_id}&first_load=1`;
        } else {
            var url = `news.server.php?client_id=${this.client_id}`;
        }
        // let ajax = new Ajax(url, "getNewsData");
        let ajax = new Ajax(url, "getNewsData2");
        ajax.setParamData([cid,page]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

    // 新闻详情
    getNewsDetail(id, callBack) {
        // let ajax = new Ajax(`news.server.php?client_id=${this.client_id}`, "getNewsDetail");
        let ajax = new Ajax(`news.server.php?client_id=${this.client_id}`, "getNewsDetail2");
        ajax.setParamData([id]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

    updateHits(id){
        let ajax = new Ajax(`news.server.php?client_id=${this.client_id}`, "updateHits");
        ajax.setParamData([id]);
        ajax.request();
    }

}


export {News};