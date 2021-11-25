
class RouteResolverBase{
    constructor(){
        "use strict"
        this.TPL_PATH = "/pages/tpl/";
        this.COMMON_PAGES_PATH = "/pages/common/";
        if(new.target === RouteResolverBase){
            throw new Error('这个类不能被实例化')
        }
    }

    
    /**
     * 将json转换为QueryString
     * @param {object} data 
     * @returns 
     */
     json2QueryString(data,keepNull=false){
        if (!(typeof data == "object" && !data.hasOwnProperty('length'))){return "";}
        let cleanArray = (actual) => {
            const newArray = []
            for (let i = 0; i < actual.length; i++) {
              if (actual[i]) {
                newArray.push(actual[i]);
              }
            }
            return newArray;
        }
        if (!data) {return ''}
        return cleanArray(Object.keys(data).map(key => {
            // if (data[key] === undefined) return '';
            if (!data[key]) return '';
            return encodeURIComponent(key) + '=' +
                    encodeURIComponent(data[key])
        })).join('&')
    }

    /**
     * QueryString 转json对象
     * @param {string} str 
     * @returns 
     */
    parseQueryString(str){
        let arr = [];
        let length = 0;
        let res = {};
        if (str.indexOf('&')==-1){
            // 只有一个参数的情况
            if (str.split('=').length<=2){
                str+='&';
            }else{
                // 非法参数
                throw "Invalid query string '"+ str +"'.";
            }
        }
        arr = str.split('&');
        length = arr.length;
        for(var i=0; i<length-1; i++){
            res[arr[i].split('=')[0]] = arr[i].split('=')[1];
        }
        return res;
    }

    resolve(data){
        throw new Error('未重写方法')
    }
}

module.exports = {RouteResolverBase};