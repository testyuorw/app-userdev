import cookie from './cookie';
import Vue from 'vue'
import lstore from './lstore'

var tool = {};
tool.range = function (arr) {
  var _create = [];
  for (var i = arr[0]; i <= arr[1]; i++) {
    _create.push(i);
  }
  return
};
tool.get = function (name) {
  let val = '';
  val = cookie.get.call(this,name);
  if (!val) {
    val = lstore.get_item(name)
    if (val) {
      return val.val;
    }
  }
  return val;
}
export default tool
