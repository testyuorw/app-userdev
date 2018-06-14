import Promise from "Promise"
var wxpay = function (data) {
  if ('object' != typeof  data) {
      return false;
  }
  function jsApiCall(data) {
    var params = {
      "appId": "wxe5b8aa9c19e67da4",
      "nonceStr": "gxqmx9lzbd3d1e2b12hz6g14jwvjbdb2",
      "package": "prepay_id=wx2017101818085294cea094150674721545",
      "signType": "MD5",
      "timeStamp": "1508321332",
      "paySign": "AD5F135B2DB2EAC51870213D5638CA5A"
    };
    return new Promise(function (resolve, reject) {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data, function (res) {
          console.log('wxpay',res);
          var status = res['err_msg'].split(':')[1];
          if (status === 'ok') {
            resolve(status);
          }
        }
      );
    });
  }
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', jsApiCall);
      document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
    }
  } else {
    return jsApiCall(data);
  }
};
export default  wxpay;
