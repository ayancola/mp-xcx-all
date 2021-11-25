// pages/news/news.js

import {Config} from "../../../utils/config";
import {News} from "../../../utils/model/news-model";
var us = require("../../../utils/underscore/underscore");
var newsModel = new News();
// 获取应用实例
const app = getApp()
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
    pageWeburl:app.globalData.weburl,
    nav_list: [],
    item_list: [],
    list_index: 0,
    cid: 1,
    rid: 8,
    page: 1,
    no_more: false,
  },
  
  // scroll_bottom: function () {
    
  // },

  change_list: function (e) {

		var that = this;
		var index =e.currentTarget.dataset.index;
		this.data.page = 1;
		this.data.no_more = false;
		this.data.item_list = [];
		this.data.cid = this.data.nav_list[index].class_id;
		newsModel.getNewsData(0, that.data.cid, that.data.page, function (res) {
				var data = res.data;
				that.render(data);
				wx.hideLoading();
		});
		this.setData({
				list_index: index,
				item_list:this.data.item_list
		});

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    router.initPage(this);  // 初始化页面
	router.initModel([newsModel]);  //初始化model
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  render: function (data) {
    // console.log('1111111111',data);
		this.data.page = data.page + 1;
		
		if (data.class_list != undefined && data.class_list.length > 0) {
			var tmp = [];
			for (var i = 0; i < data.class_list.length; i++) {
				tmp.push({
					index: i,
					rid: data.class_list[i].rid,
					name: data.class_list[i].title,
					class_id: data.class_list[i].class_id
				});
			}
			this.data.nav_list = tmp;
			this.setData({
				nav_list: this.data.nav_list,
			});
		}
		
		if (data.item_list != undefined && data.item_list.length > 0) {
			this.data.item_list = this.data.item_list.concat(data.item_list);
			this.setData({
				item_list:this.data.item_list
			})
		} else {
			this.data.no_more = true;
		}

		var cid = data.cid;
		this.data.cid = cid;

		var tmp = [];
		for (var i = 0; i < this.data.item_list.length; i++) {
			tmp.push({
				index: i,
				class_id: this.data.item_list[i].class_id,
				title: this.data.item_list[i].title,
				id: this.data.item_list[i].id,
				addtime: this.data.item_list[i].addtime,
				hits: this.data.item_list[i].hits,
				description: this.data.item_list[i].description,
				publish_Y: new Date(this.data.item_list[i].addtime.replace(/-/g,'/')).getFullYear(),
				publish_M: new Date(this.data.item_list[i].addtime.replace(/-/g,'/')).getMonth()+1,
				publish_D: new Date(this.data.item_list[i].addtime.replace(/-/g,'/')).getDate()
			});
		}
		this.data.item_list = tmp;
		this.setData({
			//list_index: this.data.index,
			item_list : this.data.item_list
		});
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		var that = this;
		// console.log('bbbbbbbbbb',this.data.item_list.length);
		if (this.data.item_list.length == 0) {
			newsModel.getNewsData(1, 0, that.data.page, function (res) {
				var data = res.data;
				that.render(data);
				// console.log('bbbbbbbbbb',data);

			});
		}else{
			that.render(this.data.item_list);
			
		}
  },

  navigatorTap(e){
	let channel = e.currentTarget.dataset.channel;
	let params = e.currentTarget.dataset.params;
	console.log(channel,params);
	router.navigate(channel,params);
	return false;
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
    // console.log('ccccccccccccccccccccc');
    var that = this;
    var index = this.data.index;
    //this.data.rid = this.data.nav_list[index].rid;
    //console.log(this.data.nav_list);
    if (!this.data.no_more) {
			app.show_loading();
			newsModel.getNewsData(0, that.data.cid, that.data.page, function (res) {
				var data = res.data;
				that.render(data);
				wx.hideLoading();
			});
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
	let that = this;
	var shareObj = {
		　　　　title: "新闻资讯 - " + getApp().globalData.company_name,        // 默认是小程序的名称(可以写slogan等)
		　　　　path: router.getSharePath('news'),       
		　　　　imageUrl: ''
	}
	console.log('shareObj',shareObj);
	return shareObj;
  }
})