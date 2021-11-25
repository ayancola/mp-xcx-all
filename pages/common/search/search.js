import {Product} from "../../../utils/model/product-model";

var mProduct = new Product();
var us = require("../../../utils/underscore/underscore");
const app = getApp()
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
        focus: false,
        list: [],
        pageWeburl:app.globalData.weburl,
        page: 1,
        no_more: false,
        key_word: "",
    },
    // scroll_bottom: function () {
    //     if (!this.data.no_more) {
    //         app.show_loading();
    //         mProduct.getProductSearch(this.data.key_word, this.data.page, this.getDataCallBack);
    //     }
    // },
    search: function (e) {
        let input_text = e.detail.value;
        if (us.has(input_text, "search")) {
            input_text = input_text.search;
        }
        if (input_text == '') {
            wx.showToast({
                title: '请输入关键词',
                icon: 'error',
                duration: 2000
            });
            this.setData({
                focus: true
            });
        } else {
            this.data.list = [];
            this.data.key_word = input_text;
            this.data.page = 1;
            this.data.no_more = false;
            mProduct.getProductSearch(this.data.key_word, this.data.page, this.getDataCallBack);
        }
    },

    getDataCallBack: function (result) {
        console.log("getDataCallBack:",result);
        wx.hideLoading();
        var data = result.data;
        if (data.length != 0) {
            this.data.page = this.data.page + 1;
            this.data.list = this.data.list.concat(data);
            this.setData({
                list: this.data.list['0']
            });
        } else {
            this.setData({
                list: this.data.list
            });
            this.data.no_more = true;
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        router.initPage(this);  // 初始化页面
        router.initModel([mProduct]);  //初始化model
        var key_word = wx.getStorageSync("key_word");
        console.log('Search keyword:',key_word);
        if (key_word){
            this.setData({
                key_word: key_word
            });
            mProduct.getProductSearch(key_word, this.data.page, this.getDataCallBack);            
        }
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
        if (!this.data.no_more) {
            app.show_loading();
            mProduct.getProductSearch(this.data.key_word, this.data.page, this.getDataCallBack);
        }
    },

    navigatorTap(e){
      let channel = e.currentTarget.dataset.channel;
      let params = e.currentTarget.dataset.params;
      console.log(channel,params);
      router.navigate(channel,params);
      return false;
    }
})