// index.js
import {About} from '../../../utils/model/about-model.js';
import {Index} from '../../../utils/model/index-model.js';
var aboutModel = new About();
var indexModel = new Index();
// 获取应用实例
const app = getApp()
const router = getApp().globalData.router;

Page({
    data: {
        clientID:'',    //客户ID，由router自动加载，用于查询客户数据。
        main_color: app.globalData.theme_color,
        iconUrl: app.globalData.xcxnumber,

        fill: 'aspectFill',
        fit: 'aspectFit',
        // banner轮播图
        indicatorDots: true,
        autoplay: true,
        duration: 500,
        current:0,
        banner_img:[],
        productClass_list:[],
        hotProduct:[],
        about_msg:'',
        newsList:[],
        photo_rid:'20',
        case_img:[],
        honorRid: 10,
        honor_list: [],
        circular: true,
        current:0,
        swiperIdx:0,
        i1_list: [
            {img: 'http://qs.demo.pbinfo.cn/wxapp/xcx-011/img/011_05.jpg', text: '关于我们',channel:'about',params:''},
            {img: 'http://qs.demo.pbinfo.cn/wxapp/xcx-011/img/011_07.jpg',text: '产品中心',channel:'products',params:'cid=3'},
            {img: 'http://qs.demo.pbinfo.cn/wxapp/xcx-011/img/011_09.jpg', text: '新闻资讯',channel:'news',params:'', },
            {img: 'http://qs.demo.pbinfo.cn/wxapp/xcx-011/img/011_11.jpg', text: '联系我们',channel:'contact',params:'' },
            
        ]

    },
    bindchange(e) {
      this.setData({
        swiperIdx: e.detail.current
      })
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
          url: '../logs/logs'
        })
    },
    linkToClass:function(e){
        var cid = e.currentTarget.dataset.cid;
        //console.log(cid);
        router.navigate('products',{
            cid:cid
        });
    },
    viewimg: function (e) {
        // console.log(e);
        let currentImg = e.currentTarget.dataset.img;
        let img_arr = [];
        for (var i = 0; i < this.data.case_img.length; i++) {
            img_arr.push(this.data.case_img[i].images);
        }
        wx.previewImage({
            current: currentImg, // 当前显示图片的http链接
            urls: img_arr // 需要预览的图片http链接列表
        })
    },
    onLoad(e) {
        router.initPage(this);  // 初始化页面
        router.initModel([aboutModel,indexModel]);  //初始化model
        this.data.navigationTitle = getApp().globalData.app_name;
        wx.setNavigationBarTitle({title:this.data.navigationTitle });
        var _this = this;
        indexModel.getImg(function (msg) {
            _this.setData({banner_img: msg.data});
        });
        indexModel.productClassList(function (msg) {
            _this.setData({productClass_list: msg.data});
        });
        indexModel.hotProduct(function (msg) {
            _this.setData({hotProduct: msg.data});
        });
        aboutModel.getPhoto(_this.data.photo_rid,function (msg) {
          _this.setData({case_img:msg.data})
        });
        indexModel.newsList(function (msg) {
            var newsList = msg.data;
            _this.setData({
                newsList: newsList
            });
        });
    },
    navigatorTap(e){
      let channel = e.currentTarget.dataset.channel;
      let params = e.currentTarget.dataset.params;
      console.log(channel,params);
      router.navigate(channel,params);
      return false;
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
          desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            // console.log(res)
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        // console.log(e)
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
    },
    onShareAppMessage: function () {
      // return custom share data when user share.
      let that = this;
      var shareObj = {
        　　　　title: getApp().globalData.app_name,        // 默认是小程序的名称(可以写slogan等)
        　　　　path: router.getSharePath('index'),        // 默认是当前页面，必须是以‘/’开头的完整路径
        　　　　imageUrl: ''
      }
      console.log('shareObj',shareObj);
      return shareObj;
    },
})
