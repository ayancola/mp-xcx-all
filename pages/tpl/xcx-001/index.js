// index.js

// import {About} from '../../../utils/model/about-model.js';
import {Index} from '../../../utils/model/index-model.js';
// var aboutModel = new About();
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
    banner_img:[],
    // 产品分类轮播
    proindicatorDots: true,
    proautoplay: false,
    produration: 200,
    productClass_list:[],
    hotProduct:[],
    about_ban: app.globalData.weburl+'/weapp_source/images/shouabout.jpg',
    about_msg:'',
    newsList:[],
    pageWeburl: app.globalData.weburl,
    newsList:[],
    photo_rid:'20',
    case_img:[]
    // IdxProClassId
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

  linkToClass:function(e){
      var cid = e.currentTarget.dataset.cid;
      //console.log(cid);
      router.navigate('products',{
        cid:cid
      });
  },

  onLoad(e) {
    router.initPage(this);  // 初始化页面
    router.initModel([indexModel]);  //初始化model
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
    indexModel.indexAbout(function (msg) {
      _this.setData({about_msg: msg.data});
    });

    indexModel.newsList(function (msg) {
      var newsList = msg.data;
      var tmp = [];
      for (var i = 0; i < 3; i++) {
        tmp.push({
            index: i,
            class_id: newsList[i].class_id,
            title: newsList[i].title,
            id: newsList[i].id,
            addtime: newsList[i].addtime,
            hits: newsList[i].hits,
            description: newsList[i].description,
            images: newsList[i].images,
            publish_Y: new Date(newsList[i].addtime.replace(/-/g,'/')).getFullYear(),
            publish_M: new Date(newsList[i].addtime.replace(/-/g,'/')).getMonth()+1,
            publish_D: new Date(newsList[i].addtime.replace(/-/g,'/')).getDate()
        });
      }
      _this.setData({
        newsList: tmp
      });
    });
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
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
  navigatorTap(e){
    let channel = e.currentTarget.dataset.channel;
    let params = e.currentTarget.dataset.params;
    console.log(channel,params);
    router.navigate(channel,params);
    return false;
  }
})
