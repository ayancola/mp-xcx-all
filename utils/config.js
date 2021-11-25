class Config {
  constructor() {

  }
}
Config.baseUrl = 'https://qs.demo.pbinfo.cn/wxapp/xcx-all/server/'
// Config.baseUrl = 'http://wxappsys.pbinfo.com.cn/wxapp_other/xcx_template/xcx-001/server/';  //本地
// Config.imgHost = '';  //文章图片主路径
//Config.debug = true;  //开启调试后，其他所有请求默认为调试模式，可单独设置为非调试模式。关闭后，所有请求均为非调试模式。
Config.debug = false; //默认不开启调试
Config.uploadUrl = "https://wxappsys.pbinfo.cn/wxapp_other/xuyang/server/upload.server.php"; //上传路径
Config.v8root = "http://qs.demo.pbinfo.cn";
Config.imgHost = "http://qs.demo.pbinfo.cn/";
export { Config };
