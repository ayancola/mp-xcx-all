// pages/honor/honor.js
import {About} from '../../../utils/model/about-model.js';
var WxParse = require('../../../utils/wxParse/wxParse.js');
var aboutModel = new About();
const app = getApp();
const router = getApp().globalData.router;
Page({
  data: {
    clientID:'',    //客户ID，由router自动加载，用于查询客户数据。
    main_color: app.globalData.theme_color,

    fill: 'aspectFill',
    fit: 'aspectFit',
    photo_rid: '', 
    photo_list: [],
    page: 1,
    no_more: false
  },

  viewimg: function (e) {
    // console.log(e);
    let currentImg = e.currentTarget.dataset.img;
    let img_arr = [];
    for (var i = 0; i < this.data.photo_list.length; i++) {
        img_arr.push(this.data.photo_list[i].images);
    }
    wx.previewImage({
        current: currentImg, // 当前显示图片的http链接
        urls: img_arr // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    router.initPage(this);  // 初始化页面
    router.initModel([aboutModel]);  //初始化model
    var rid = options.rid;
    aboutModel.getPhoto(rid,function (msg) {
      that.setData({photo_list:msg.data})
    });
    if(rid==9){
      that.data.shareTitle = '企业相册';
      wx.setNavigationBarTitle({title:that.data.shareTitle });
    }else if(rid==10){
      that.data.shareTitle = '资质荣誉';
      wx.setNavigationBarTitle({title:that.data.shareTitle });
    }else if(rid==20){
      that.data.shareTitle = '应用案例';
      wx.setNavigationBarTitle({title:that.data.shareTitle });
    }
    that.setData({
      photo_rid: rid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // setTimeout("scroll_bottom",1000)
    var _this = this;
    var index = this.data.index;
    //this.data.rid = this.data.nav_list[index].rid;
    //console.log(this.data.nav_list);
    if (!this.data.no_more) {
        app.show_loading();
        aboutModel.getPhoto(_this.data.honorRid, _this.data.page, function (res) {
            var data = res.data;
            _this.render(data);
            wx.hideLoading();
        });
    }
    let path_param = {};
    path_param[router.getParamName('RID')] = _this.data.photo_rid;
    var shareObj = {
      　　　　title: _this.data.shareTitle + ' - ' + getApp().globalData.company_name ,        // 默认是小程序的名称(可以写slogan等)
      　　　　path: router.getSharePath('photo',path_param),       
      　　　　imageUrl: ''
    }
    console.log('shareObj',shareObj);
    return shareObj;
  }
})