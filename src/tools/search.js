import copy from './copy'
import clear from './clearkey'
var search = {};
search.router = function (obj,exec) {
  var self = this;
  var cb = function () {
    var keys  = Object.keys(obj);
    var _params = {};
    for(var i=0;i<keys.length;i++){
      var key = keys[i];
      var field = obj[key];
      var val = self[field];
      /**
      * 如果搜索关键词为空，则从url上删除关键词
      * */
      if (!val) {
        delete  _params[key];
      } else {
        _params[key] = val;
        self[field] = '';
      }
    }
    var url = self.$route.query;
    var hasQueryString = Object.keys(url);
    if (hasQueryString) {
      copy(_params,url);
    }

    _params['page'] = 1;
    self.$router.push({path:self.$route.path});
    setTimeout(function () {
      self.$router.push({query:_params});
    },500);
  };
  if (exec) {
    cb()
  }
  this.$hook.enter(cb);
};

/**
 * @params from is this.$route.query
 * @params to is store.query
 * */
search.assign = function (from, to) {
  var keys = Object.keys(to);
  if (keys.length) {
    clear(from, '', true);
    return Object.assign(from, to);
  } else {
    return from;
  }
};
search.queryString = function (obj) {

};
export default search;
