import http from '../core/http'
import userinfo from '../services/userinfo'

var api = {};
var setToken = function (params) {
  var _params = Object.assign({}, params);
  if (userinfo.store) {
    _params.uid = userinfo.store.uid;
    _params.token = userinfo.store.token;
  }
  return _params;
};
api.get_phone = function (params) {
  return http('post', '/api/get_verify_code', params);
};
api.login = function (params) {
  return http('post', '/api/howner/login', params);
};
//多次请求的时候验证码接口
api.get_verify_img = function (params) {
  return http('get', '/api/imgCode', params);
};
//检查验证码是否正确
api.captcha_check = function (params) {
  return http('get', '/api/captcha_check', params);
};

//取消订单原因
api.cancel_reson = function (params) {
  return http('get', '/api/order_cancel_reson', params);
};
//取消订单
api.cancelorder = function (params) {
  return http('post', '/api/howner/order/cancel', params);
};
//获取客服电话
api.service_phone = function (params) {
  return http('get', '/api/app_config', params);
};

api.perfect = function (params) {
  return http('post', '/api/howner/perfect', params);
};
api.allworkers = function (params) {
  return http('get', '/api/howner/worklist', params);
};
api.workerDetail = function (params) {
  return http('post', '/api/worker/info', params);
};
api.historyOrder = function (params) {
  return http('get', '/api/worker/excellent_case', params);
};
api.otherCase = function (params) {
  return http('get', '/api/worker/other_case', params);
};


api.get_workerType = function (params) {
  return http('get', '/api/worktype', params);
};
api.get_requtype = function (params) {
  return http('get', '/api/order/reqtype', params);
};
api.get_area = function (params) {
  return http('post', '/api/getarea', params);
};
api.get_order = function (params) {
  return http('post', '/api/howner/order/create', params);
};
api.get_orderlists = function (params) {
  return http('get', '/api/howner/order/list', params);
};
api.get_orderdetail = function (params) {
  return http('get', '/api/order/detail', params);
};
api.comment = function (params) {
  return http('post', '/api/worker/comment', params);
};
api.get_laberls = function (params) {
  return http('get', '/api/howner/labels', params);
};
api.get_trade = function (params) {
  return http('post', '/api/pay/create/trade', params);
};
api.offline = function (params) {
  return http('post', '/api/pay/bank', params);
};
api.get_jsapi = function (params) {
  return http('post', '/api/h5/pay', params);
};
api.order_confirm = function (params) {
  return http('post', '/api/howner/order/confirm', params);
};

//全部产品
api.get_products = function (params) {
  return http('get', '/api/catelist', params);
};
//获取产品列表
api.get_mall = function (params) {
  return http('get', '/api/howner/goods/list', params);
};

//筛选列表
api.get_filter = function (params) {
  return http('get', '/api/cate/attr', params);
};

//商品详情
api.get_goods = function (params) {
  return http('get', '/api/howner/goods/info', params);
};
//微信分享
api.weShare = function (params) {
  return http('get', '/api/wechat/share', params);
};
//分享商品登录
api.share_login = function (params) {
  return http('post', '/api/howner/signLogin', params);
};

//获取省市区
api.showCities = function (params) {
  return http('get', '/api/howner/getAreaTree', params);
};

//是否可买
api.share_can_buy = function (params) {
  return http('post', '/api/howner/shareBuy', params);
};

//生成业主订单
api.buy_custid = function (params) {
  return http('post', '/api/howner/order/salesordercreate', params);
};
api.buy_worker = function (params) {
  return http('post', '/api/worker/order/salesordercreatebyworker', params);
};
api.get_saledetail = function (params) {
  return http('get', '/api/order/saledetail', params);
};

//四种订单生成的订单接口
api.creat_share_order = function (params) {
  return http('get', '/api/WxOrder/creatOrder', params);
};
//查openid接口
api.check_openid = function (params) {
  return http('post', '/api/howner/checkOpenid', params);
};
// api.share = function (params) {
//   return http('get', '/api/micro/share', params);
// }
let shareUrl = 'http://api4j.zjbird.com/serviceapi/wechat/share_support';
if(window.location.hostname == 'localhost' || window.location.hostname.indexOf('wechat')>-1){
  shareUrl = 'http://api4j.e2.fat.zjbird.com/serviceapi/wechat/share_support';
}
api.share = function (params) {
  return http('post', shareUrl, params,true);
};
export default api;
