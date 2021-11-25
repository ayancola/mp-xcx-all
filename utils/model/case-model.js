import {Ajax} from "../ajax";
import {Base} from "../base";

class Case extends Base {
    constructor() {
        super();
    }

    getData(first_load, cid, page, callBack) {
        if (first_load == 1) {
            var url = `case.server.php?client_id=${this.client_id}&first_load=1`;
        } else {
            var url = `case.server.php?client_id=${this.client_id}`;
        }
        let ajax = new Ajax(url, "getData");
        ajax.setParamData([cid, page]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

}


export {Case};