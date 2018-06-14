var info = {};

info.set = function (key,val) {
  info[key] = val;
  window.localStorage.setItem('info',JSON.stringify(info));
};
info.get = function () {
  var obj = JSON.parse(localStorage.getItem('info'));
  return obj;
};

export default info;
