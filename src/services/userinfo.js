import cookie from '../tools/cookie'
var user = {};
user.info = function () {
  var res = cookie.get.call(this, 'zjbird');
  if (res) {
    user.store  = res;
    return res;
  } else {
    return '';
  }
};
user.shareInfo = function () {
  var res = cookie.get.call(this, 'sharezjbird');
  if (res) {
    user.store  = res;
    // console.log(res);
    return res;
  } else {
    return '';
  }
};
user.logout = function () {
  cookie.remove.call(this,'zjbird');
};
user.login_page = true;
export default user;
