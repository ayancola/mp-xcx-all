import {Config} from 'config.js';

var add_moreimg = {
    uploadFile: function (url, filepath, callback) {
        wx.uploadFile({
            url: url, //仅为示例，非真实的接口地址
            filePath: filepath,
            name: 'file',
            complete: function (res) {
                callback(res);
            }
        });
    },

    multiple_upload: function (i, tempFilePaths, that) {
        var self = this;
        var temp_length = tempFilePaths.length;
        if (i < temp_length) {
            var tmp_file = tempFilePaths.slice(i, i + 1);
            self.uploadFile(Config.uploadUrl, tmp_file[0], function (_res) {
                if (_res.statusCode == 200 && _res.data) {
                    var _data = JSON.parse(_res.data);
                    that.data.post_img_arr.push(_data.images);
                    that.data.pics.push(tmp_file);
                    that.data.img_length = that.data.img_length + 1;
                }
                i = i + 1;
                self.multiple_upload(i, tempFilePaths, that);
            });
        } else {
            that.setData({
                pics: that.data.pics,
                img_length: that.data.img_length,
            });
            wx.hideLoading();
        }
    },


    choose_img: function (count, that) {
        var self = this;
        //需要一个pics:[],img_length:0
        var pic_arry = that.data.pics;
        var list_length = that.data.pics.length;
        if (list_length < count) {
            wx.chooseImage({
                count: count - list_length,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    // tempFilePath可以作为img标签的src属性显示图片
                    const tempFilePaths = res.tempFilePaths;
                    console.log(tempFilePaths);
                    wx.showLoading({
                        title: '图片上传中',
                    });
                    self.multiple_upload(0, tempFilePaths, that);
                }
            })
        }
    },
    replace_img: function (e, that) {//替换图片
        var src = e.currentTarget.dataset.src;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                for (var i = 0; i < that.data.pics.length; i++) {
                    if (src == that.data.pics[i]) {
                        var set_arr = 'pics[' + i + ']';
                        that.setData({
                            [set_arr]: tempFilePaths,
                        });
                        break;
                    }
                }
            }
        })
    },
    del_img: function (e, that) {//删除图片
        var src = e.currentTarget.dataset.src;
        var del_arr = that.data.pics;
        for (var i = 0; i < that.data.pics.length; i++) {
            if (src == that.data.pics[i]) {
                del_arr.splice(i, 1);
                that.data.post_img_arr.splice(i,1);
                var list_length = that.data.pics.length;
                that.setData({
                    pics: del_arr,
                    img_length: list_length
                });
                break;
            }
        }
    },
}
module.exports = add_moreimg;