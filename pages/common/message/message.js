// pages/message/message.js
import {Contact} from "../../../utils/model/contact-model";
var contactModel = new Contact();
const app = getApp();
const router = getApp().globalData.router;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clientID:'',    //客户ID，由router自动加载，用于查询客户数据。
    main_color: app.globalData.theme_color,

    select_list: [],
    select_items: [],
    fill: 'aspectFill',
    fit: 'aspectFit',
    index: '',
    re_desc: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    router.initPage(this);  // 初始化页面
    router.initModel([contactModel]);  //初始化model
  },

  formSubmitCallback: function(result) {
    this.setData({
      company:"",
      linkman:"",
      mobile:"",
      content: "",
      index: "",
    });
    // wx.navigateTo({
    //   url:"/pages/tips/tips"
    // });
    wx.showToast({
      title: '提交成功',
      duration: 2000
    })
  },

  formSubmit: function(e) {
    // console.log(e);
    // var that = this;
    // var name = e.detail.value.name;
    // var phone = e.detail.value.phone;
    // var company = e.detail.value.company;
    // var msg = e.detail.value.msg;
    var arr = e.detail.value;
    var data = {};
    if (!arr['linkman']) {
      wx.showToast({
        title: '姓名不能为空',
        duration: 2000,
        icon: 'error'
      })
    }
    if(!arr['mobile']){
      wx.showToast({
        title: '手机号不能为空',
        duration: 2000,
        icon: 'error'
      })
    }
    if(!arr['content']){
      wx.showToast({
        title: '留言内容不能为空',
        duration: 2000,
        icon: 'error'
      })
    }

    data.company = arr['company'];
    data.linkman = arr['linkman'];
    data.mobile = arr['mobile'];
    data.content = arr['content'];
    contactModel.postReport(data,this.formSubmitCallback());
    // else {
    //   wx.request({
    //     method: "POST",
    //     url: "",
    //     data: {
    //       'name': name,
    //       'phone': phone,
    //       'company': company,
    //       'msg': msg
    //     },
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success: function(res) {
    //       wx.showToast({
    //         title: '提交成功',
    //         duration: 2000
    //       })
    //     }
    //   })
    // }
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


})