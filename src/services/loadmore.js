var loadmore = {};
loadmore.store = [];
loadmore.unique = {};
loadmore.offset = 1;
loadmore.init = function () {
  loadmore.offset = 1;
};
loadmore.push = function (data, unique) {
  loadmore.unique[unique] = data;
  return loadmore.get();
};
loadmore.get = function () {
  var _list = [];
  var keys = Object.keys(loadmore.unique);
  keys.forEach(function (item) {
    _list = _list.concat(loadmore.unique[item]);
  });
  return _list;
};
loadmore.clear = function () {
  loadmore.store = [];
  loadmore.unique = {};
};
export default loadmore;
