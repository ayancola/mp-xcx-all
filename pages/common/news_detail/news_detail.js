// pages/news_detail/news_detail.js
import {News} from "../../../utils/model/news-model";
var us = require("../../../utils/underscore/underscore");
var WxParse = require('../../../utils/wxParse/wxParse.js');
var newsModel = new News();
const app = getApp();
const router = getApp().globalData.router;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clientID:'',    //客户ID，由router自动加载，用于查询客户数据。

    fill: 'aspectFill',
    fit: 'aspectFit',
    pageWeburl: app.globalData.weburl,
    addtime: '',
    publishTime: '',
    hits: 1,
    title: '',
    content: '',
    id: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    var id = options.id;
    var that = this;
    router.initPage(this);  // 初始化页面
    router.initModel([newsModel]);  //初始化model
    newsModel.getNewsDetail(id,function (result) {
        console.log(result);
        var data = result.data;
        that.data.cid = data.class_id;
        that.setData({
            title: data.title,
            addtime: data.addtime,
            hits: data.hits,
            id: id,
            publishTime: (new Date(data.addtime.replace(/-/g,'/')).getFullYear())+"/"+(new Date(data.addtime.replace(/-/g,'/')).getMonth()+1)+"/"+(new Date(data.addtime.replace(/-/g,'/')).getDate()),
        });
        var content = result.data.list_title;
        WxParse.wxParse('content', 'html', content, that, 0);
    });
    newsModel.updateHits(id);
},
// previewImg: function (e) {
//     var currentUrl = e.currentTarget.dataset.imgurl;
//     var imglist = [];
//     this.data.is_preview = true;
//     if (this.data.photo_list.length > 0) {
//         for (var i = 0; i < this.data.photo_list.length; i++) {
//             imglist.push(this.data.photo_list[i]['images']);
//         }
//         wx.previewImage({
//             current: currentUrl, // 当前显示图片的http链接
//             urls: imglist// 需要预览的图片http链接列表
//         })
//     }

// },
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
	let that = this;
  let path_param = {};
  path_param[router.getParamName('ITEM_ID')] = that.data.id;
  console.log(path_param);
	var shareObj = {
		　　　　title: that.data.title + ' - ' + getApp().globalData.company_name, 
		　　　　path: router.getSharePath('news_detail',path_param),       
		　　　　imageUrl: ''
	}
	console.log('shareObj',shareObj);
	return shareObj;
}
})
