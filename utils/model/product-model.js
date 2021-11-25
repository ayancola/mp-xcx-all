import {Ajax} from "../ajax";
import {Base} from "../base";

class Product extends Base {
    constructor() {
        super();
    }

    //banner_img
    getProductData(callBack) {
        let ajax = new Ajax(`product.server.php?client_id=${this.client_id}`, "getProductData");
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

    getProductList(cid, page=1, callBack) {
        // let ajax = new Ajax(`product.server.php?client_id=${this.client_id}`, "getProductList");
        let ajax = new Ajax(`product.server.php?client_id=${this.client_id}`, "getProductList2");
        ajax.setParamData([cid,page]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

    getProductDetail(id, callBack) {
        // let ajax = new Ajax(`product.server.php?client_id=${this.client_id}`, "getProductDetail");
        let ajax = new Ajax(`product.server.php?client_id=${this.client_id}`, "getProductDetail2");
        ajax.setParamData([id]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }


//   getProductDetail2(id, callBack) {
//     let ajax = new Ajax(`product.server.php?client_id=${this.client_id}`, "getProductDetail2");
//     ajax.setParamData([id]);
//     ajax.bindSCallBack(callBack);
//     ajax.request();
//   }

    getProductSearch(keyword, page, callBack) {
        let ajax = new Ajax(`product.server.php?client_id=${this.client_id}`, "getProductSearch");
        ajax.setParamData([keyword, page]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

    getSearchKey(callBack){
        let ajax = new Ajax(`product.server.php?client_id=${this.client_id}`, "getSearchKey");
        ajax.bindSCallBack(callBack);
        ajax.request();
    }

}


export {Product};