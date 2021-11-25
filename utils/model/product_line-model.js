import { Ajax } from "../ajax";
import { Base } from "../base";
class Product_line extends Base {
  constructor() {
      super();
  }

  getlist(page,callBack) {
    let ajax = new Ajax(`product_line.server.php?client_id=${this.client_id}`, "getlist");
    ajax.setParamData([page]);
    ajax.bindSCallBack(callBack);
    ajax.request();
  }

}


export { Product_line };