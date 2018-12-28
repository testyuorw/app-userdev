import Promise from "Promise"
var wxpay = function (data) {
  if ('object' != typeof  data) {
      return false;
  }
  function jsApiCall(data) {
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
