/**
 * 路由解析器
 * @description 用于鹏博企业小程序的路由管理器
 * @author Jesse Feng Jiancheng 冯建成
 * @date 2021-09-06
 * 
 * @tudo 
 */

const {RouteResolverBase} = require('./_base')

class ResolveIndex extends RouteResolverBase{
    constructor(){
        super()
    }

    // 參數過濾器
    dataFilter(data){
        // 移除template_id属性
        if (Object.hasOwnProperty.call(data,"template_id")){
            delete data.template_id;
        }
        return data;
    }

    // 解析路由
    resolve(data){
        let __self = this;
        let final_url = ""
        let query_string = "";
        if (!Object.hasOwnProperty.call(data,'template_id')){return "";}
        let template_id = data.template_id;
        console.log("渲染首页，模版号：%s",template_id);
        // 组装页面路径
        let pageurl = __self.TPL_PATH;
        pageurl += template_id;
        pageurl += "/index";
        // 组装参数
        data = __self.dataFilter(data);
        query_string += __self.json2QueryString(data);
        final_url = pageurl + "?" + query_string;
        console.log("Resolved URL: %s",final_url)
        return final_url;
    }
}

module.exports = {ResolveIndex}