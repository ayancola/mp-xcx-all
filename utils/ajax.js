import {Token} from 'token.js';
import {Config} from 'config.js';
var hprose = require('./hprose/hprose.js');
var us = require("./underscore/underscore");
var helper = require("helper");
//建议每执行一次查询实例化一次Ajax对象 保证不会因异步产生未知错误
class Ajax{
    constructor(file, func) {
        "use strict";
        this.first_query = true;
        this.baseUrl = Config.baseUrl;
        if (typeof file != 'undefined') {
            this.setUrl(file);
        }
        if (typeof  func != "undefined") {
            this.setFunc(func);
        }
    }

    setGetData(obj) { //设置提交到服务器的 get Data
        if (us.isObject(obj)) {
            this.inputGetData = us.extend(obj, this.inputGetData);
        }
        return this;
    }

    setUrl(file, url) { //设置要访问的服务器文件
        if (typeof file != "undefined" && file != "") {
            if (typeof url == 'undefined') {
                var _url = this.baseUrl + file;
            } else {
                var _url = url + file;
            }
            this.url = _url;
        }
        return this;
    }

    createHproseClient() {
        if (this.url == "") {
            console.log("要访问的服务器url不能为空");
        } else {
            if (us.isUndefined(this.pbclient) || us.isEmpty(this.pbclient)) {
                this.pbclient = hprose.Client.create(this.url);
            }
        }
        return this;
    }

    setBeforeFunc(before_func) { //在访问前要执行的操作
        if (us.isFunction(before_func)) {
            this.before_func = before_func;
        }
        return this;
    }

    setFunc(func) {
        if (typeof func != 'undefined') {
            this.func = func;
        } else if (typeof this.func == "undefined") {
            this.func = "index";
        }
        return this;
    }

    setParamData(param_data) { //设置要访问的函数参数
        if (us.isArray(param_data) && param_data.length > 0) {
            this.param_data = param_data;
        } else if (typeof this.param_data == "undefined") {
            this.param_data = [];
        }
        return this;
    }

    setDebug(debug) {  //是否开启调试模式
        if (typeof debug != "undefined" && debug != 'false' && debug != false) {
            this.debug = true;
        } else if (this.debug != undefined) {
        } else if (typeof Config.debug != 'undefined' && Config.debug != 'false' && Config.debug != false) {
            this.debug = true;
        } else {
            this.debug = false;
        }
        return this;
    }

    bindBefore() {
        if (us.isFunction(this.before_func)) {
            this.before_func();
        }
    }

    bindGetData() {
        if (this.url != "" && this.inputGetData != undefined && !us.isEmpty(this.inputGetData)) {
            if (this.url.charAt(this.url.length - 1) == "&") {
                this.url = this.url.substring(0, this.url.length - 1);
            }
            var input_arr = us.map(this.inputGetData, function (value, key) {
                return key + "=" + value;
            });
            var input_str = input_arr.join("&");
            if (this.url.indexOf("?") == -1) {
                this.url = this.url + "?" + input_str;
            } else {
                this.url = this.url + "&" + input_str;
            }
        }
        this.inputGetData = null;
        return this;
    }

    bindSCallBack(sCallback) {
        if (us.isFunction(sCallback)) {
            this.sCallback = sCallback;
        }
        return this;
    }

    bindECallBack(eCallback) {
        if (us.isFunction(eCallback)) {
            this.eCallback = eCallback;
        }
        return this;
    }

    request(params) {
        if (us.isUndefined(params) || !us.isObject(params)) {
            params = {};
        }
        var that = this;
        if (this.first_query) {
            this.setBeforeFunc(params.before);
            this.setUrl(params.url);
            this.setFunc(params.func);
            this.setParamData(params.param_data);
            this.setDebug(params.debug);
            this.bindGetData();
            this.bindSCallBack(params.sCallback);
            this.bindECallBack(params.eCallback);
        }
        this.bindBefore();
        if (us.isObject(params.res) && !us.isEmpty(params.res)) {
            that._requestCB(params.res, params);
        } else {
            this.createHproseClient();
            this.pbclient.setHeader('token', wx.getStorageSync('token'));  //这里的token必须是要本地获取的
            this.pbclient.invoke(this.func, this.param_data, function (res) {
                that._requestCB(res, params);
            }, function (name, err) {
                console.log(that.url + " -> " + name + ' : ' + err);
            });
        }
    }


    _refetch(params) {
        var token = new Token();
        this.first_query = false;
        token.getTokenFromServer(() => {
            this.request(params);
        });
    }

    _requestCB(res, params) {
        this.first_query = true;
        if (this.debug) { //开启调试模式
            var debug_html = "";
            debug_html += "请求url：" + this.url + "\n";
            debug_html += "请求方法：" + this.func + "\n";
            debug_html += "请求参数：" + this.param_data.join(",") + "\n";
            debug_html += "响应信息：" + JSON.stringify(res) + "\n";
            console.log(debug_html);
        }
        if (res.code == 200) {//  只有200的状态码才表示
            this.sCallback && this.sCallback(res);
        } else {
            if (res.code == -999) {
                wx.showModal({
                    title: '提示',
                    content: '没有注册不能使用该功能，是否现在注册？',
                    showCancel: true,
                    success: function (res) {
                        if (res.confirm) {
                            // wx.switchTab({
                            //     url: '/pages/member/member',
                            // })
                        }
                    }
                })
            }
            else if (res.code == -1001) {// token过期  清除缓存 重新授权进行操作
                helper.clearStorage();
                this._refetch(params);
            } else {
                if (typeof res.msg != 'undefined') {
                    var txt = res.msg;
                } else {
                    var txt = '操作失败';
                }
                wx.showToast({
                    title: txt,
                    icon: 'none',
                    duration: 2000
                });
                this.eCallback && this.eCallback(res);
            }
        }
    }
};

export {Ajax};
