import {Ajax} from "../ajax";
import {Base} from "../base";

class Application extends Base {
    constructor() {
        super();
    }

    getData(is_first_load, cid, page, callBack) {
        if (is_first_load == 1) {
            var url = `application.server.php?client_id=${this.client_id}&first_load=1`;
        } else {
            var url = `application.server.php?client_id=${this.client_id}`;
        }
        let ajax = new Ajax(url, "getData");
        ajax.setParamData([cid, page]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

}

export {Application};