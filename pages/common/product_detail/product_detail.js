// pages/product_detail/product_detail.js
import {Product} from "../../../utils/model/product-model";
var us = require("../../../utils/underscore/underscore");
var WxParse = require('../../../utils/wxParse/wxParse.js');
var mProduct = new Product();
const app = getApp();
const router = getApp().globalData.router;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clientID:'',    //客户ID，由router自动加载，用于查询客户数据。
    main_color: app.globalData.theme_color,

    fill: 'aspectFill',
    fit: 'aspectFit',
    pageWeburl: app.globalData.weburl,
    indicatorDots: true,
    autoplay: false,
    duration: 500,
    product_ban: [],
    productName: '',
    productClass: '',
    id: 1,
    cid: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    router.initPage(this);  // 初始化页面
    router.initModel([mProduct]);  //初始化model
    var that = this;
    that.setData({
      id : options.id
    });
    
    mProduct.getProductDetail(that.data.id,function (result) {
        //console.log(result);
        var data = result.data;
        that.data.cid = data.class_id;
        that.setData({
          productName: data.title,
          product_ban: data.imagesList,
          cid: data.class_id
        });
        var content = result.data.list_title;
        WxParse.wxParse('content', 'html', content, that, 0);
    });

    mProduct.getProductData(function(msg){
      // console.log('1111111111',msg);
      var data = msg.data.class_rows;
      
      for(var i = 0; i < data.length; i++){
        // console.log(data[i].title);
        if(data[i].class_id = that.data.cid){
          // that.data.productClass = data[i].title
          that.setData({
            productClass : data[i].title
          })
        }
      }
      // console.log('222222222222',that.data.productClass);
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
    let path_param = {};
    path_param[router.getParamName('ITEM_ID')] = that.data.id;
    var shareObj = {
      　　　　title: that.data.productName + ' - ' + getApp().globalData.company_name,        // 默认是小程序的名称(可以写slogan等)
      　　　　path: router.getSharePath('product_detail',path_param),       
      　　　　imageUrl: ''
    }
    console.log('shareObj',shareObj);
    return shareObj;
  },
})