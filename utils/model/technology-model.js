import {Ajax} from "../ajax";
import {Base} from "../base";

class Technology extends Base {
    constructor() {
        super();
    }

    getData(first_load, cid, page, callBack) {
        if (first_load == 1) {
            var url = `technology.php??client_id=${this.client_id}&first_load=1`;
        } else {
            var url = `technology.php?client_id=${this.client_id}`;
        }
        let ajax = new Ajax(url, "getData");
        ajax.setParamData([cid, page]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

    getProductDetail(id, callBack) {
        let ajax = new Ajax(`technology.php?client_id=${this.client_id}`, "getProductDetail");
        ajax.setParamData([id]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }
 
}


export {Technology};