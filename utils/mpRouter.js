/**
 * 用于鹏博企业小程序的路由管理器
 * @description 接管小程序的路由，通过指定参数调取设置的首页模版渲染页面。
 * @author Jesse Feng Jiancheng 冯建成
 * @date 2021-09-06
 * 
 * @tudo 
 * redirect
 * resolvePage
 */

const {Site} = require('./model/site-model');
const siteModel = new Site();

// 路由解析器
const {ResolveIndex} = require("./routers/index");
const {ResolveAbout} = require("./routers/about");
const {ResolveProducts,ResolveProductDetail} = require("./routers/products");
const {ResolvePhoto} = require("./routers/photo");
const {ResolveNews,ResolveNewsDetail} = require("./routers/news");
const {ResolveSearch} = require("./routers/search");
const {ResolveContact,ResolveMessage} = require("./routers/contact");


class mpRouter{
    constructor(){
        // 主要参数
        this.inited = false;        // 已初始化
        this.clientID = "";         // 客户ID
        this.templateID = "";       // 模版号
        this.tabBarNum = "";        // 工具栏路径
        this.theme_color = '#1677fe';       // 主题色

        // 主要配置
        // url参数别名
        this.paramNames = {
            CLIENT_ID : 'clientID',     //客户ID
            CHANNEL : 'channel',        //栏目
            RID : 'rid',                //栏目ID
            CID : 'cid',                //分类ID
            ITEM_ID : 'id'              //条目ID
        }
        // 注册路由
        this.Resolvers = {
            'index' : new ResolveIndex(),
            'about' : new ResolveAbout(),
            'products' : new ResolveProducts(),
            'product_detail' : new ResolveProductDetail(),
            'photo' : new ResolvePhoto(),
            'news' : new ResolveNews(),
            'news_detail' : new ResolveNewsDetail(),
            'search' : new ResolveSearch(),
            'contact' : new ResolveContact(),
            'message' : new ResolveMessage()
        }
    }

    // 是否初始化判断
    isInited(){
        let __self = this;
        // 创建条件
        let conditions = [];
        conditions.push(__self.clientID != "");
        conditions.push(__self.templateID != "");
        // 判断条件
        let operated = true;
        conditions.forEach(element => {
            operated = operated && element;
        }); 
        if (!operated){console.error('mpRouter is not be inited.');}
        return operated;
    }

    /**
     * 为Tabbar过滤模版号
     * 例：‘mp-xcx-002’ 转换为 ‘002’
     * @param {string} name 
     * @returns {string}
     */
    fillterTplNameforTabbar(name){
        // 无需过滤了，直接返回模版号
        return name;
        if (name.indexOf('xcx-')>-1){
        name = name.replace("xcx-","");
        return name;
        }else{
        return name;
        }
    }

    /**
     * 获取客户ID
     * @returns {string}
     */
    getClientID(){
        let __self = this;
        return __self.clientID;
    }

    /**
     * 获取参数别名
     * @param {string} key 参数名称
     * @returns {string}
     * 
     */
    getParamName(key){
        let __self = this;
        if (Object.hasOwnProperty.call(__self.paramNames,key)){
            return __self.paramNames[key];
        }
        return ""
    }

    /**
     * 获取分享用路径，以/index/index作为入口的路径
     * @param {*} channel 
     * @param {*} data 
     * @returns {string} url
     */
    getSharePath(channel,data={}){
        let __self = this;
        channel = channel != "" ? channel : 'index';
        data[__self.getParamName('CLIENT_ID')] = __self.clientID;
        // 转换data为query_string
        let query_string = __self.Resolvers['index'].json2QueryString(data);
        let url = '/pages/index/index?';
        url+=__self.getParamName('CHANNEL') + '=';
        url+=channel;
        url+='&';
        url+=query_string;
        return url;
    }

    /**
     * 获取站点信息
     * @param {string} CLIENT_ID 客户ID
     * @returns {object}
     */
    getSiteConfig(CLIENT_ID){
        return new Promise((resolve,reject)=>{
            try {
                siteModel.getSiteConfig(CLIENT_ID,resolve)
            } catch (error) {
                reject(error);
            }
        })
    }

    /**
     * 获取模版号
     */
    getTemplateID(){
        let __self = this;
        return __self.templateID;
    }

    /**
     * 获取解析URL
     * @param {string} channel 
     * @param {object} data 
     * @returns {string}
     */
    getResolveUrl(channel,data={}){
        let __self = this;
        if (!__self.isInited()){return;}

        data[__self.getParamName('CLIENT_ID')] = __self.clientID;
        channel = channel != "" ? channel : 'index';
        if (channel=="index"){data.template_id=__self.getTemplateID()};
        
        let url = "";
        url = __self.resolvePage(channel,data);
        return url;
    }

    /**
     * 初始化页面
     * @param {object} page 小程序页面的 Page（this） 对象
     */
    initPage(page){
        let __self = this;
        let clientID = __self.clientID;         // 客户ID
        let theme_color = __self.theme_color;   // 主题色
        let tabBarNum = __self.tabBarNum;       // 导航栏路径代号
        
        page.setData({
            iconUrl : tabBarNum,
            main_color : theme_color,
            clientID:clientID
        });
    }

    /**
     * 初始化Model，使model被传入客户ID
     * @param {array} page model实例数组
     */
     initModel(arr){
        let __self = this;
        let clientID = __self.clientID;         // 客户ID
        for (const key in arr) {
            if (Object.hasOwnProperty.call(arr, key)) {
                arr[key].setClientId(clientID);
            }
        }
    }

    /**
     * 页面跳转
     * @param {string} channel 
     * @param {object, string} data 荐使用json,支持query_string字符串
     */
    navigate(channel,data={}){
        let __self = this;
        let url = ""
        if (typeof data == "string"){
            data = __self.Resolvers['index'].parseQueryString(data);
        }
        url = __self.getResolveUrl(channel,data);
        if (!url){return;}
        console.log('Ready to navigate:\nurl=%s',url);
        wx.navigateTo({
            url: url,
            success: (result) => {console.log('Navigete success.')},
            fail: (err)=>{console.log('Navigete failed.',err)},
            complete: () => {console.log('Navigete conplete.')}
        });
          
    }


    /**
     * 设置客户号
     * @param {string} client_id 需要设置的模版编号
     * @param {string} force 强制设置
     */
     setClientID(client_id="", force=false){
        let __self = this;
        if ((client_id!="" && __self.clientID=="") || (force==true)){
            __self.clientID = client_id;
            return true;
        }
        return false;
    }

    /**
     * 为Tabbar设置模版号
     * @param {string} name 
     */
    setTabbarNumber(name){
        let __self = this;
        __self.tabBarNum = __self.fillterTplNameforTabbar(name);
        return true;
    }

    /**
     * 设置模版号
     * @param {string} template_id 需要设置的模版编号
     * @param {string} force 强制设置
     */
    setTemplateID(template_id="", force=false){
        let __self = this;
        if ((template_id!="" && __self.templateID=="") || (force==true)){
            __self.templateID = template_id;
            return true;
        }
        return false;
    }

    // 设置主题色
    setThemeColor(data={
        theme_color : '#1677fe'
    }){
        let __self = this;
        if (!Object.hasOwnProperty.call(data,'theme_color')){return false;}
        __self.theme_color = data.theme_color;
        return true;
    }

    /**
     * 验证启动参数，小程序启动时必须带有所需参数（见this.paramNames）
     * @param {object} query 传入启动参数
     * @param {number} level 验证级别。
     *                       0或无：要求除条目ID外的所有参数
     *                       1   ：仅要求“客户ID”及“栏目”；
     *                       2   ：要求“客户ID”、“栏目”、“RID”；
     *                       3   ：要求“客户ID”、“栏目”、“RID”、“CID”；
     *                       9   ：要求“条目ID”
     * @returns {boolean}
     */
    validateQuery(query){
        let __self = this;
        let level = 99;
        if (arguments.length==2 && typeof arguments[1] == "number" && arguments[1]!=0){
            level = arguments[1];
        }
        let conditions = [];
        if (level>0){
            conditions.push(Object.hasOwnProperty.call(query, __self.paramNames.CLIENT_ID));
            conditions.push(Object.hasOwnProperty.call(query, __self.paramNames.CHANNEL));
        }
        if (level>1){
            conditions.push(Object.hasOwnProperty.call(query, __self.paramNames.RID));
        }
        if (level>2){
            conditions.push(Object.hasOwnProperty.call(query, __self.paramNames.CID));
        }
        if (level==9){
            conditions = [];
            conditions.push(Object.hasOwnProperty.call(query, __self.paramNames.ITEM_ID));
        }
        
        let operated = true;
        conditions.forEach(element => {
            operated = operated && element;
        }); 
        return operated;
    }

    /**
     * 页面重定向
     * @param {string} channel 
     * @param {object,string} data 推荐使用json,支持query_string字符串
     */
    redirect(channel,data={},callback=function(){}){
        let __self = this;
        let url = "";
        if (typeof data == "string"){
            data = __self.Resolvers['index'].parseQueryString(data);
        }
        url = __self.getResolveUrl(channel,data);
        if (!url){return;}
        console.log('Ready to redirect:\nurl=%s',url);
        wx.redirectTo({
            url: url,
            success: (result) => {
                console.log('Redirect success.');
                callback({
                    'code':1,
                    'msg':'Redirect success.'
                })
            },
            fail: (err)=>{
                console.log('Redirect failed.',err);
                callback({
                    'code':0,
                    'msg':'Redirect failed.'
                })
            },
            complete: () => {console.log('Redirect conplete.')}
        });
    }

    /**
     * 解析页面
     * @param {string} channel 
     * @param {object} data 
     */
    resolvePage(channel,data={}){
        let __self = this;
        
        if (!Object.hasOwnProperty.call(__self.Resolvers,channel)){
            // 404 Msg
            console.error('Cannot Find Router names "%s".',channel);
            return ''
        }
        // 移除data里的channel属性
        let channel_key_name = __self.getParamName('CHANNEL');
        if (Object.hasOwnProperty.call(data,channel_key_name)){
            delete data[channel_key_name];
        }
        
        // 解析页面为url
        let res = __self.Resolvers[channel].resolve(data);
        return res;
    }


}

module.exports = mpRouter