var sstore = {};
sstore.set_item = function (key, value, time) {
  try {
    var date = new Date();
    time = time || 0;
    var data = {
      val: value,
      time: Math.floor(date.getTime() / 1000) + Number(time)
    };
    var obj = JSON.stringify(data);
    sessionStorage.setItem(key, obj);
  } catch (e) {

  }
};
var _get_item = function (key) {
  var data = '';
  try {
    data = JSON.parse(sessionStorage.getItem(key));
  } catch (e) {

  }
  return data;
};
sstore.remove = function (key) {
  sessionStorage.removeItem(key);
};
sstore.autoClear = function (key) {
  try {
    var _data = _getItem(key);
    if (!_data) {
      return false;
    }
    var _val = _data.val;
    var _time = Number(_val.time);
    var nowTime = new Date();
    var timeStr = Math.floor(nowTime.getTime() / 1000);
    if (_time < timeStr) {
      sstore.remove(key);
    }
  } catch (e) {

  }
};
sstore.get_item = function (key) {
  try{
    sstore.autoClear(key);
    return  _get_item(key);
  }catch(e){

  }
};

export default sstore;
