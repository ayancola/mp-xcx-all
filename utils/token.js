import { Config } from 'config.js';
var hprose = require('./hprose/hprose.js');

class Token {
  constructor() {
    this.tokenUrl = Config.baseUrl + 'user.server.php';
    this.tokenFunc = 'getToken';
  }

  verify(callBack) {
    var token = wx.getStorageSync('token');
    var expire_time = wx.getStorageSync('expire_time');
    if (!token || !expire_time || expire_time < Date.now()) {
      this.getTokenFromServer(callBack);
    }
  }

  //从服务器获取token
  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        var pbclient = hprose.Client.create(that.tokenUrl);
        pbclient.invoke(that.tokenFunc,[res.code],function(result){
          wx.setStorageSync('token', result.data.token);
          wx.setStorageSync('expire_time', result.data.expire_time);
          typeof callBack == 'function' && callBack(res);
        });
      }
    })
  }
}

export { Token };