var us  = require("underscore/underscore");
//该类重新封装一下微信的方法
var handle = {
    /**
     * 缓存key异步缓存用对象，同步缓存赋两个参数
     * @returns {}
     */
    setStorage: function() {
        var key, data, complete;
        if (arguments.length == 1 && us.isObject(arguments[0]) && !us.isArray(arguments[0])) {
            key = arguments[0].key;
            data = arguments[0].value;
            complete = arguments[0].callback;
            wx.setStorage({
                key: key,
                data: data,
                complete: function(data) {
                    if (us.isFunction(complete)) {
                        complete(data);
                    }
                }
            });
        } else {
            key = arguments[0];
            data = arguments[1];
            try {
                return wx.setStorageSync(key, data);
            } catch (e) {
                console.error(e);
            }
        }
    },

    /**
     * 获取缓存 同步一个参数 异步 两个参数 第二个参数回调
     * @returns {*}
     */
    getStorage: function() {
        var key, complete, fail;
        if (arguments.length == 2) {
            key = arguments[0];
            complete = arguments[1];
            wx.getStorage({
                key: key,
                complete: function(res) {
                    if (us.isFunction(complete)) {
                        if (res.data==undefined) {
                            res.data = ""
                        }
                        complete(res.data);
                    }
                },
            })
        } else {
            key = arguments[0];
            try {
                return wx.getStorageSync(key);
            } catch (e) {
                console.error(e);
            }
        }
    },

    /**
     * 清除缓存
     * @returns {*}
     */
    clearStorage: function() {
        try {
            return wx.clearStorageSync();
        } catch (e) {
            console.error(e);
        }
    },

    navigator:function(e){
        let url = e.currentTarget.dataset.url;
        if(url!=""){
            wx.navigateTo({
                url: url
            })
        }
    },
    /**
     * 获取当前事件里面的data-值
     * @returns {*}
     */
    getDataSet: function (e, name) {
        var value = e.currentTarget.dataset[name];
        if ((typeof value) == undefined) {
            value = "";
        }
        return value;
    },

    getOptionsScene(options) { //获取扫码进入携带的参数
        if (!options.scene) {
            return options.scene;
        }
        var arr = {};
        var scene = decodeURIComponent(options.scene);
        var sceneArr = scene.split('&');
        for (var i in sceneArr) {
            var obj = sceneArr[i].split('=');
            arr[obj[0]] = obj[1];
        }
        return arr;
    }



}


module.exports = handle