//判断访问终端
var browser={
  versions:function(){
    var u = navigator.userAgent.toLowerCase(), app = navigator.appVersion.toLowerCase();
    return {
      trident: u.indexOf('trident') > -1, //IE内核
      presto: u.indexOf('presto') > -1, //opera内核
      webKit: u.indexOf('applewebkit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('gecko') > -1 && u.indexOf('khtml') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('android') > -1 || u.indexOf('linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iphone') > -1 , //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('ipad') > -1, //是否iPad
      webApp: u.indexOf('safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('micromessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }(),
  language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

module.exports = browser;
