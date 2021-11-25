// pages/products/products.js
import {
    Config
} from "../../../utils/config";
import {
    Product
} from "../../../utils/model/product-model";

var us = require("../../../utils/underscore/underscore");
var mProduct = new Product();
const app = getApp();
const router = getApp().globalData.router;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        clientID: '', //客户ID，由router自动加载，用于查询客户数据。
        main_color: app.globalData.theme_color,
        iconUrl: app.globalData.xcxnumber,

        fill: 'aspectFill',
        fit: 'aspectFit',
        focus: false,
        list_index: 0,
        product_list: [],
        cid: '1',
        nav_list: [],
        pageWeburl: app.globalData.weburl,
        page_num:1,
        scrollViewHeight:'auto',
        pro_loading:true
    },
    scroll_bottom: function () {
        this.setData({
            pro_loading:true,
            page_num:this.data.page_num+1
        });
        mProduct.getProductList(this.data.cid,this.data.page_num, this.getDataCallback);
    },
    //搜索按钮事件
    search: function (e) {
        app.search_click(e, this);
    },
    onLoad(options) {
        router.initPage(this); // 初始化页面
        router.initModel([mProduct]);  //初始化model
        var that = this;

        if (options.cid) {
            var o_cid = options.cid;
        } else {
            var o_cid = '1';
        }

        that.setData({
            cid: o_cid,
        })
    },
    choose_right: function (e) {
        // console.log(e);
        this.setData({
            cid: e.currentTarget.dataset.cid,
            list_index: e.currentTarget.dataset.index,
            pro_loading:true,
            page_num:1
        });
        this.data.requesting_new_cid = true;
        mProduct.getProductList(this.data.cid,this.data.page_num, this.getDataCallback);
    },
    getFirstDataCallBack(result) {
        var data = result['data'];
        var product_list = [];
        var tmp = [];
        for (var i = 0; i < data.class_rows.length; i++) {
            tmp.push({
                index: i,
                class_id: data.class_rows[i].class_id,
                images: data.class_rows[i].images,
                title: data.class_rows[i].title
            });
        }
        this.data.nav_list = tmp;
        this.setData({
            nav_list: this.data.nav_list,
            pro_loading:false,
            page_num:1
        });
        mProduct.getProductList(this.data.cid,this.data.page_num, this.getDataCallback);
    },
    render: function (product_list) { //渲染数据
        let my_product_list = [];
        if (this.data.product_list.length > 0) {
            my_product_list = this.data.product_list;
        } else {
            my_product_list = product_list;
        }
        var cid = this.data.cid;
        if (cid != "" && cid > 0) { //证明是其他页面过来的
            var select_item = us.find(this.data.nav_list, function (value) {
                return value.class_id == cid;
            });
            this.data.cid = select_item.class_id;
            this.data.list_index = select_item.index;
        }
        this.setData({
            cid: this.data.cid,
            list_index: this.data.list_index,
            product_list: my_product_list,
            page_num:1
        });
        mProduct.getProductList(this.data.cid,this.data.page_num, this.getDataCallback);
    },

    getDataCallback(result) {
        var that = this;
        var data = result['data'];
        var tmp = [];
        // 无数据返回
        if (data.length==0 && !(this.data.requesting_new_cid)){
            if (this.data.page_num>1){
                // 回退页码
                this.data.page_num = this.data.page_num - 1;
            }else{
                this.data.page_num = 1;
            }
            this.setData({
                pro_loading:false,
            });
            return;
        }
        if (this.data.page_num>1){
            tmp = this.data.product_list;
        }
        for (var i = 0; i < data.length; i++) {
            if (that.data.cid == data[i].class_id) {
                tmp.push({
                    index: i,
                    class_id: data[i].class_id,
                    title: data[i].title,
                    img: data[i].img,
                    id: data[i].id
                });
            }
        }
        this.data.product_list = tmp;
        this.data.requesting_new_cid = false;
        this.setData({
            product_list: this.data.product_list,
            pro_loading:false,
        });
    },

    onShow: function () {
        if (this.data.product_list.length == 0) {
            mProduct.getProductData(this.getFirstDataCallBack);
        } else {
            this.render(this.data.product_list);
        }
        this.getScroll_H()
    },

    // 获取 滚动内容高度
	getScroll_H() {
        const that = this;
		const query = wx.createSelectorQuery();
        const navElement = this.selectComponent("#mp_tabbar");
		query.select('.BL').boundingClientRect(async (rect) => {
			let top = rect.top;
            let rect2 = await navElement.boundingClientRect();
            let top2 = rect2.top;
            let height = top2 - top;
            that.setData({
                scrollViewHeight:String(height)+'px'
            })
		}).exec();
	},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        // setTimeout("scroll_bottom",1000)
        var _this = this;
        let path_param = {};
        // path_param[router.getParamName('RID')] = _this.data.photo_rid;
        var shareObj = {
            title: '产品中心 - ' + getApp().globalData.company_name, // 默认是小程序的名称(可以写slogan等)
            path: router.getSharePath('products', path_param),
            imageUrl: ''
        }
        console.log('shareObj', shareObj);
        return shareObj;
    },
    navigatorTap(e) {
        let channel = e.currentTarget.dataset.channel;
        let params = e.currentTarget.dataset.params;
        console.log(channel, params);
        router.navigate(channel, params);
        return false;
    }

})