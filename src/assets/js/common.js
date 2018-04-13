
/**
 * @file 入口文件配置
 * @author dongkusnhan
 */

import('jquery').then(() => {
  require('bootstrap');
}, (e) => {
  if (window.console) {
    console.log(e);
    console.log('error on bootstrap load');
  }
});

/**
 * 字符串去空格
 * @param {String} str 目标字符串
 * @return {String} 处理后的字符串
 */
function trim(str) {
  let ret;
  let reg = /^\s+|\s+$/g;
  ret = str.replace(reg, '');
  return ret;
}

/**
 * url参数截取
 * @param {String} name 要获取的key
 * @param {String=} url 解析的地址串一，默认为当前地址栏地址
 * @return {String} 对应的value
 */
function queryString(name, url = window.location.href) {
  let svalue = url.match(new RegExp('[?&]' + name + '=([^&]*)(&?)', 'i'));
  return svalue ? svalue[1] : svalue;
}

export default {
  trim,
  queryString
};
