// index.js
/**
 * *** 这里是启动页面，但不是主页 ***
 * ··  小程序主入口，用于处理小程序启动与跳转逻辑。
 * ··  主页位于/pages/tpl中各个模版目录内。
 */
// 获取应用实例
const app = getApp()
const router = app.globalData.router;

Page({
  data: {
    // 页面数据
    userInfo: {},
    window:{
      windowHeight:app.globalData.windowHeight
    },
    // 状态
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    onerror:false,
    errmsg:'',
    scan_tip_img:false,
    loadSuccess:false,
    resUrl:app.globalData.weburl
  },

  customData: {
  },

  /**
   *  以下是请求数据
   *    后端请先查阅这里，再追踪代码。
   */


  /**
   *  以下是绑定事件
   */

  onLoad: function(options) {
    let that = this;
    // 使用 options 接收启动参数
    // 当前客户ID
    // clientID=88&&channel=
    // options.clientID = 89;
    // options.channel = "";
    console.log('Current Client ID:',router.getClientID());
    // 验证参数
    if (getApp().globalData.launchWithQuery){
      // 通过参数进入，验证参数
      if (!(router.getClientID() || router.validateQuery(options,1))){
        that.ErrPage_on("No CLIENT ID or CHANNEL inputs as param.");
        return;
      }      

    }
    console.log('launchWithQuery,',getApp().globalData.launchWithQuery)
    // 检查是否已获取*模版号*
    let CLIENT_ID_QUERY = router.getClientID() ? router.getClientID() : options[router.getParamName('CLIENT_ID')];
    let CLIENT_ID = getApp().globalData.launchWithQuery ? CLIENT_ID_QUERY : getApp().config_read('client_id','');
    let TEMPLATE_ID = router.getTemplateID();
    let CHANNEL_NAME = options[router.getParamName('CHANNEL')];
    let forceSet = getApp().globalData.forceReset;
    CHANNEL_NAME = (typeof CHANNEL_NAME == "string" && CHANNEL_NAME != "") ? CHANNEL_NAME : 'index';
    // 详情页需验证id
    if (CHANNEL_NAME == 'news_detail' || CHANNEL_NAME =='product_detail'){
      if (!router.validateQuery(options,9)){
        that.ErrPage_on("No ITEM ID when lunching detail page.","页面地址已失效，请扫描二维码访问。\nArgs. Err.");
        return;
      }
    }
    // 当前客户ID
    console.log('Current Template ID:',TEMPLATE_ID);
    console.log('Require Channel Name:',CHANNEL_NAME);
    // 若未装载模版编号
    if (TEMPLATE_ID==""){
      // 请求站点信息
      router.getSiteConfig(CLIENT_ID).then(res => {
        console.log(res)
        if (res.code>0){
          // 保存企业基本信息
          getApp().globalData.company_name = res.data.company_name;
          getApp().globalData.app_name = res.data.app_name;
          // 写入配置JSON
          getApp().config_write('client_id',CLIENT_ID);
          TEMPLATE_ID = res.data.template_id;
          router.setTemplateID(TEMPLATE_ID,forceSet);
          router.setClientID(CLIENT_ID,forceSet);
          // 设置主题
          if (!(res.data.theme_color) || res.data.theme_color==""){
            res.data.theme_color = '#2e68d3';
          }
          router.setThemeColor({
            theme_color : res.data.theme_color
          });
          // 设置导航栏路径
          router.setTabbarNumber(TEMPLATE_ID);
          // 解析路由并跳转页面
          console.log('Site Config Loaded(requested).\nTEMPLATE ID: %s',TEMPLATE_ID);
          router.redirect(CHANNEL_NAME,options,function(res){
            if (res.code<1){
              that.ErrPage_on("Redirect Error.","页面地址已失效，请扫描二维码访问。\nSite or template Err.");return;
            }
          });
          that.data.loadSuccess = true; //标记，防止误报错误信息。
          return;
        }else{
          that.ErrPage_on("Backend Error.","站点无效，请稍候重试。\nSite Err.");return;
        }
      }).catch(error => {
        console.error('Error Catched when getSiteConfig() on onLoad: \n',error);
        that.ErrPage_on("",'页面地址已失效，请扫描二维码访问。\nComm. Err.');return;
      });
      // 超时
      setTimeout(()=>{
        if (that.data.loadSuccess){return;}
        // 20秒后若未标记“成功”，弹出错误画面。
        that.ErrPage_on("Time out.",'网络超时，请重试。\nTime out.');
      },1000*20)
      return;
    } else {
      // 解析路由并跳转页面
      console.log('Site Config Loaded.(memory)\nTEMPLATE ID: %s',TEMPLATE_ID);
      router.redirect(CHANNEL_NAME,options)
      return;
    }
    
  },
  onShow: function() {
    // Do something when page show.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function() {
    // Do something when page scroll
  },
  onResize: function() {
    // Do something when page resize
  },

  onTabItemTap(item) {
    // console.log(item.index)
    // console.log(item.pagePath)
    // console.log(item.text)
  },
  

  // Event handler.


  /**
   *  以下是内部方法
   */




  // 打开出错页面
  ErrPage_on(err=null,errmsg=""){
    // 打印错误
    if (err){
      console.error(err);
    }
    this.setData({
      errmsg:errmsg,
      scan_tip_img:true,
      onerror:true
    });
  },

  // 关闭出错页面
  ErrPage_off(){
    this.setData({
      onerror:false,
      scan_tip_img:false
    });
  }

})
