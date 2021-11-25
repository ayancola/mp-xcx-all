// pages/about/about.js
import {About} from '../../../utils/model/about-model.js';
var WxParse = require('../../../utils/wxParse/wxParse.js');
var aboutModel = new About();
const app = getApp();
const router = getApp().globalData.router;

Page({
    /**
     * 页面的初始数据
     */
    data: {
      clientID:'',    //客户ID，由router自动加载，用于查询客户数据。
      main_color: app.globalData.theme_color,
      iconUrl: app.globalData.xcxnumber,

        fill: 'aspectFill',
        fit: 'aspectFit',
        about_ban: app.globalData.weburl+'/weapp_source/images/shouabout.jpg',
        pageWeburl: app.globalData.weburl,
        about_msg: '',
        alindicatorDots: true,
        alautoplay: false,
        alduration: 200,
        albumRid: 9,
        album_list: [],
        honindicatorDots: true,
        honautoplay: true,
        honduration: 300,
        circular: true,
        current: 0,
        swiperIdx: 0,
        honorRid: 10,
        honor_list: []
    },

    bindchange(e) {
      this.setData({
        swiperIdx: e.detail.current
      })
    },


    albumviewimg: function (e) {
      // console.log(e);
      let currentImg = e.currentTarget.dataset.img;
      let img_arr = [];
      for (var i = 0; i < this.data.album_list.length; i++) {
          img_arr.push(this.data.album_list[i].images);
      }
      wx.previewImage({
          current: currentImg, // 当前显示图片的http链接
          urls: img_arr // 需要预览的图片http链接列表
      })
    },

    honorViewimg: function (e) {
      // console.log(e);
      let currentImg = e.currentTarget.dataset.img;
      let img_arr = [];
      for (var i = 0; i < this.data.honor_list.length; i++) {
          img_arr.push(this.data.honor_list[i].images);
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
      router.initPage(this);  // 初始化页面
      router.initModel([aboutModel]);  //初始化model
        var that = this;
        aboutModel.getPage(function (msg) {
          var content = msg.data;
          WxParse.wxParse('content', 'html', content, that, 0);
          // that.setData({about_msg : content})
        });
        aboutModel.getPhoto(that.data.albumRid,function (msg) {
          that.setData({album_list : msg.data})
        });
        aboutModel.getPhoto(that.data.honorRid,function (msg) {
          that.setData({honor_list : msg.data})
        });
        aboutModel.getBanner(function (msg) {
          that.setData({about_ban : msg.data})
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
       // return custom share data when user share.
       let that = this;
       var shareObj = {
         　　　　title: "关于我们 - " + getApp().globalData.company_name,        // 默认是小程序的名称(可以写slogan等)
         　　　　path: router.getSharePath('about'),       
         　　　　imageUrl: ''
       }
       console.log('shareObj',shareObj);
       return shareObj;
     },

    navigatorTap(e){
      let channel = e.currentTarget.dataset.channel;
      let params = e.currentTarget.dataset.params;
      router.navigate(channel,params);
      return false;
    }
})