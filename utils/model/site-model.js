import {Ajax} from "../ajax";
import {Base} from "../base";

class Site extends Base {
    constructor() {
        super();
    }

    /**
     * 获取站点信息
     * @param {String} clientID 
     * @param {Function} callBack 
     * @return {String} data.template 模版编号
     */
    getSiteConfig(clientID,callBack) {
        // 测试数据开始
        // let mockClientData = {
        //     '88' :{
        //         client_id : 88,
        //         template_id : 'mp-xcx-002',
        //         theme_color : '#2f944e',
        //         company_name : '广东南海鹏博资讯有限公司(演示002)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '89':{
        //         client_id : 89,
        //         template_id : 'mp-xcx-003',
        //         theme_color : '#b93f3d',
        //         company_name : '广东南海鹏博资讯有限公司(演示003)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '90':{
        //         client_id : 90,
        //         template_id : 'mp-xcx-004',
        //         theme_color : '#2e68d3',
        //         company_name : '广东南海鹏博资讯有限公司(演示004)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '91':{
        //         client_id : 91,
        //         template_id : 'mp-xcx-005',
        //         theme_color : '#da1212',
        //         company_name : '广东南海鹏博资讯有限公司(演示005)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '92':{
        //         client_id : 92,
        //         template_id : 'mp-xcx-006',
        //         theme_color : '#1772b9',
        //         company_name : '广东南海鹏博资讯有限公司(演示006)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '93':{
        //         client_id : 93,
        //         template_id : 'mp-xcx-007',
        //         theme_color : '#ed5d1e',
        //         company_name : '广东南海鹏博资讯有限公司(演示007)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '94':{
        //         client_id : 94,
        //         template_id : 'mp-xcx-008',
        //         theme_color : '#61b728',
        //         company_name : '广东南海鹏博资讯有限公司(演示008)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '95':{
        //         client_id : 95,
        //         template_id : 'mp-xcx-009',
        //         theme_color : '#c2182f',
        //         company_name : '广东南海鹏博资讯有限公司(演示009)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '96':{
        //         client_id : 96,
        //         template_id : 'mp-xcx-010',
        //         theme_color : '#306ec4',
        //         company_name : '广东南海鹏博资讯有限公司(演示010)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '97':{
        //         client_id : 97,
        //         template_id : 'mp-xcx-011',
        //         theme_color : '#00895c',
        //         company_name : '广东南海鹏博资讯有限公司(演示011)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '98':{
        //         client_id : 98,
        //         template_id : 'mp-xcx-012',
        //         theme_color : '#2e68d3',
        //         company_name : '广东南海鹏博资讯有限公司(演示012)',
        //         app_name : '鹏博资讯演示'
        //     },
        //     '99':{
        //         client_id : 99,
        //         template_id : 'mp-xcx-013',
        //         theme_color : '#2e68d3',
        //         company_name : '广东南海鹏博资讯有限公司(演示013)',
        //         app_name : '鹏博资讯演示'
        //     }
        // }
        // callBack({
        //     code:1,
        //     data: mockClientData[clientID]
        // });
        // return;
        // 测试数据结束
        let ajax = new Ajax("site.server.php", "getSiteConfig");
        ajax.setParamData([clientID]);
        ajax.bindSCallBack(callBack);
        ajax.request();
    }


}


export {Site};