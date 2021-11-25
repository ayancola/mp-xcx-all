// app.js
const us = require("utils/underscore/underscore");
const routerclass = require('utils/mpRouter');

// 启动参数映射，统一管理方便维护
// CLIENT_ID : 'clientID',     //客户ID
// CHANNEL : 'channel',        //栏目
// RID : 'rid',                //栏目ID
// CID : 'cid',                //分类ID
// ITEM_ID : 'id'              //条目ID

App({

	adaptsScreen() {
		// 适配手机顶部
		this.globalData.headerBtnPosi = wx.getMenuButtonBoundingClientRect()
		let that = this
		wx.getSystemInfo({ // iphonex底部适配
			success: async (res) => {
				that.globalData.systeminfo = res
				// console.log(res);
				// 判断iphone
				const model = res.model;
				const modelInclude = ["iPhone X", 'iPhone XR', "iPhone XS", "iPhone XS MAX"];
				this.globalData.isIphone = modelInclude.some((res) => {
					return model.indexOf(res) != -1
				})
			}
		})

		let statusBarHeight = this.globalData.systeminfo.statusBarHeight
		let headerPosi = this.globalData.headerBtnPosi
		let btnPosi = { // 胶囊实际位置，坐标信息不是左上角原点
			height: headerPosi.height,
			width: headerPosi.width,
			top: headerPosi.top - statusBarHeight, // 胶囊top - 状态栏高度
			bottom: headerPosi.bottom - headerPosi.height - statusBarHeight, // 胶囊bottom - 胶囊height - 状态栏height （胶囊实际bottom 为距离导航栏底部的长度）
			right: this.globalData.systeminfo.screenWidth - headerPosi.right // 屏幕宽度 - 胶囊right
		}

		this.globalData.navbarHeight = headerPosi.bottom + btnPosi.bottom // 胶囊bottom + 胶囊实际bottom

		// 获取屏幕高度
		this.globalData.windowHeight = wx.getSystemInfoSync().windowHeight
		this.globalData.screenHeight = wx.getSystemInfoSync().screenHeight
	},

	onLaunch(options) {
		let __self = this;
		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				console.log(res)
			}
		})

		// 适配手机顶部
		__self.adaptsScreen();

		console.log(__self.globalData);

	},
	config_creatConfig(){
		// 改用LocakStorage
		return true;
	},
	config_read(key,defaultVal=undefined){
		// 改用LocakStorage
		try {
			var value = wx.getStorageSync(key)
			if (value) {
			  return value
			}
		} catch (e) {
			return defaultVal
		}
	},
	config_write(key,value=''){
		// 改用LocakStorage
		try {
			wx.setStorageSync(key, value)
			return true;
		} catch (e) {
			console.error(e)
			return false;
		}
	},
	launchRouter(client_id,query){
		const router = this.globalData.router;
		const CLIENT_ID = client_id;
		const onshow_qery = query;
		console.log("getLaunchOptionsSync().query.clientID:",wx.getLaunchOptionsSync().query[router.getParamName('CLIENT_ID')]);
		let client_id_on_launch = onshow_qery[router.getParamName('CLIENT_ID')];
		if (typeof client_id_on_launch != "undefined" && client_id_on_launch!=""){
			console.log('client_id_on_launch',client_id_on_launch)
			this.globalData.launchWithQuery = true;
		}
		if (client_id_on_launch != CLIENT_ID){
			console.log(`ClientID replaced from "${CLIENT_ID}" to "${client_id_on_launch}"`)
			router.setTemplateID('',true);
			router.setClientID('',true);
			this.globalData.forceReset = true;
			let url = '/pages/index/index?';
			let query_string = '';
			Object.keys(onshow_qery).forEach(key => {
				query_string += '&' + key + '=' + onshow_qery[key];
			})
			console.log('redirectTo():',url + query_string)
			wx.redirectTo({
				url: url + query_string
			});
		}
	},
	onShow(options){
		const router = this.globalData.router;
		let onshow_qery = options.query;
		let CLIENT_ID = router.getClientID();
		// Begin
		this.globalData.forceReset = false;
		// 核对启动参数，防止使用不同客户号进入时出错。
		
		if (CLIENT_ID){
			console.log('Launch with CLIENT_ID.')
			this.launchRouter(CLIENT_ID,onshow_qery);
		}else{
			console.log('Launch without CLIENT_ID.')
			let client_id_on_launch = onshow_qery[router.getParamName('CLIENT_ID')];
			if (typeof client_id_on_launch != "undefined" && client_id_on_launch!=""){
				console.log('client_id_on_launch',client_id_on_launch)
				this.globalData.launchWithQuery = true;
			}
			// 读取本地存储
			let read_config_clentid = this.config_read('client_id',)
			if (!isNaN(Number(read_config_clentid)) && Number(read_config_clentid)>0){
				CLIENT_ID = read_config_clentid;
				this.launchRouter(CLIENT_ID,onshow_qery);
			}
		}		
	},
	search_click: function (e, that) {
		let __self = this;
		let input_text = e.detail.value;
		const router = __self.globalData.router;
		if (us.has(input_text, "search")) {
			input_text = input_text.search;
		}
		if (input_text == '') {
			wx.showToast({
				title: '请输入关键词',
				icon: 'error',
				duration: 2000
			});
			that.setData({
				focus: true
			});
		} else {
			wx.setStorageSync("key_word", input_text);
			router.navigate('search');
		}
	},
	show_loading: function () {
		wx.showLoading({
			title: '加载中',
			icon: 'loading',
		});
	},
	globalData: {
		userInfo: null,
		router: new routerclass(),
		launchWithQuery:false,
		configJson:`${wx.env.USER_DATA_PATH}/mpConfig.json`,
		theme_color: '#1677fe',
		company_name: '',
		app_name: '',
		forceReset: false,
		weburl: 'http://qs.demo.pbinfo.cn/',
	}
})