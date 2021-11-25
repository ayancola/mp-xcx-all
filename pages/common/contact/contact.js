
import {Contact} from "../../../utils/model/contact-model";
var contactModel = new Contact();
const app = getApp()
const router = getApp().globalData.router;
Page({
    data: {
        clientID:'',    //客户ID，由router自动加载，用于查询客户数据。
        main_color: app.globalData.theme_color,
        iconUrl: app.globalData.xcxnumber,
        window:{
            windowHeight:app.globalData.windowHeight
        },

        fill: 'aspectFill',
        fit: 'aspectFit',
        latitude: 23.108883,
        longitude: 113.1436,
        company: '',
        scale: 15,
        add: '',
        content: '',
        msg_list: [
          {
            icon: app.globalData.weburl+'/weapp_source/images/contact_icon2.png',
            lable: '电话',
            text: ''
          },
          {
            icon: app.globalData.weburl+'/weapp_source/images/contact_icon3.png',
            lable: '传真',
            text: ''
          },
          {
            icon: app.globalData.weburl+'/weapp_source/images/contact_icon4.png',
            lable: '地址',
            text: ''
          }
        ],
        markers: [{
            id: 1,
            latitude: 23.108883,
            longitude: 113.1436,
            name: '',
            // iconPath: app.globalData.weburl+'/weapp_source/images/market.png',
            callout: {
                content: '0',
                color: '#666',
                display: 'ALWAYS',
                bgColor: '#fff',
                padding: '10',
                fontSize: "14"
            },
        }],
        first_load: true,
        pageWeburl: app.globalData.weburl,
        contactShow: true,
        messageShow: false,
    },

    // showMessage:function(){
    //     var that = this;
    //     var messageShow = that.data.messageShow
    //     var contactShow = that.data.contactShow
    //     that.setData({
    //         messageShow: true,
    //         contactShow: false
    //     })
    // }, 
    /**
     * 生命周期函数--监听页面加载
     */
    click: function (e) {
        wx.openLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            scale: this.data.scale,
            name: this.data.company,
            address: this.data.add
        });
    },

    onLoad: function (options) {
        var that = this;
        router.initPage(this);  // 初始化页面
        router.initModel([contactModel]);  //初始化model
        that.getContact();
        // wx.getLocation({
        //     type: 'GCJ02',
        //     success(res) {
        //         const latitude = res.latitude
        //         const longitude = res.longitude
        //         const speed = res.speed
        //         const accuracy = res.accuracy
        //     }
        // })
    },

    getContact: function(){
        let that = this;
        contactModel.getContact(function(result){
            var content = result.data;
            that.data.markers[0].latitude = content.latitude;
            that.data.markers[0].longitude = content.longitude;
            that.data.markers[0].name = content.company;
            that.data.markers[0].callout.content = content.company;
            that.setData({
                latitude:content.latitude,
                longitude:content.longitude,
                company:content.company,
                add:content.address,
                markers:that.data.markers,
                msg_list: [
                  {
                    icon: app.globalData.weburl+'/weapp_source/images/contact_icon2.png',
                    lable: '电话',
                    text: content.mobile
                  },
                  {
                    icon: app.globalData.weburl+'/weapp_source/images/contact_icon3.png',
                    lable: '传真',
                    text: content.fax
                  },
                  {
                    icon: app.globalData.weburl+'/weapp_source/images/contact_icon4.png',
                    lable: '地址',
                    text: content.address
                  }
                ],
            });
            that.first_load = false;
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.mapCtx = wx.createMapContext('myMap')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        if (this.data.first_load) {
            that.getContact();
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    // return custom share data when user share.
        let that = this;
        var shareObj = {
            　　　　title: "联系我们 - " + getApp().globalData.company_name,        // 默认是小程序的名称(可以写slogan等)
            　　　　path: router.getSharePath('contact'),       
            　　　　imageUrl: ''
        }
        console.log('shareObj',shareObj);
        return shareObj;
    }

})
