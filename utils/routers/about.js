/**
 * 路由解析器
 * @description 用于鹏博企业小程序的路由管理器
 * @author Jesse Feng Jiancheng 冯建成
 * @date 2021-09-06
 * 
 * @tudo 
 */

const {RouteResolverBase} = require('./_base')

class ResolveAbout extends RouteResolverBase{
    constructor(){
        super()
    }

    // 參數過濾器
    dataFilter(data){
        // 移除template_id属性
        // if (Object.hasOwnProperty.call(data,"template_id")){
        //     delete data.template_id;
        // }
        return data;
    }

    // 解析路由
    resolve(data){
        let __self = this;
        let final_url = ""
        let query_string = "";
        // 组装页面路径
        let pageurl = __self.COMMON_PAGES_PATH;
        pageurl += "about/about";
        // 组装参数
        data = __self.dataFilter(data);
        query_string += __self.json2QueryString(data);
        final_url = pageurl + "?" + query_string;
        console.log("Resolved URL: %s",final_url)
        return final_url;
    }
}

module.exports = {ResolveAbout}