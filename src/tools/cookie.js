var cookie = {};
cookie.set = function (name, val, time) {
  var data = JSON.stringify(val);
  var date = new Date();
  var exp = (date.getTime() / 1000) + time;
  return this.$cookie.set(name, data, exp);
};
cookie.get = function (name) {
  var data = JSON.parse(this.$cookie.get(name));
  return data;
};
cookie.remove = function (name) {
  return this.$cookie.delete(name);
};

export default cookie;

