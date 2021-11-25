import {Ajax} from "../ajax";
import {Base} from "../base";

class Login extends Base {
    constructor() {
        super();
    }

    register(arr, callBack) {
        let ajax = new Ajax(`login.server.php?client_id=${this.client_id}`, "register");
        ajax.setParamData([arr]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }


    login(arr, callBack) {
        let ajax = new Ajax(`login.server.php?client_id=${this.client_id}`, "login");
        ajax.setParamData([arr]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }


    tosendRegSMSCode(mobile, callBack) {
        let ajax = new Ajax(`login.server.php?client_id=${this.client_id}`, "tosendRegSMSCode");
        ajax.setParamData([mobile]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

    tosendLoginSMSCode(mobile,callBack) {
        let ajax = new Ajax(`login.server.php?client_id=${this.client_id}`, "tosendLoginSMSCode");
        ajax.setParamData([mobile]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }
}

export {Login};