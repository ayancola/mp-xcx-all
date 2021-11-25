import {Ajax} from "../ajax";
import {Base} from "../base";

class Contact extends Base {
    constructor() {
        super();
    }
    getContact(callBack) {
        let ajax = new Ajax(`gbook.server.php?client_id=${this.client_id}`, "contact");
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

    postReport(arr,callBack) {
        let ajax = new Ajax(`gbook.server.php?client_id=${this.client_id}`, "postReport");
        ajax.setParamData([arr]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }
}


export {Contact};