var formError = {};
/**
 * 只要有一个error为true,就返回false
 * */
var safe = function (form, conf) {
  for (var field in conf) {
    var errorFieldName = field + '_error';
    if (form[errorFieldName]) {
      return false;
    }
  }
  return true;
};
/**
 * @params Array fields 需要验证的字段
 *
 * */
formError.createErrorTip = function (form, conf) {
  var self = this;
  for (var field in conf) {
    var item = conf[field];
    var val = form[field];
    var errorFieldName = field + '_error';
    /**
     * required
     * */
    if (item.hasOwnProperty('required')) {
      if (!val) {
        self.$set(form, errorFieldName, true);
        self.$toast(item.required_tip, 'center');
      } else {
        self.$set(form, errorFieldName, false);
      }
    }
    /*(
     * eq field
     * */
    if (item.hasOwnProperty('eq')) {
      var eq = item['eq'];
      if (val != form[eq]) {
        self.$toast(item.eq_tip, 'center');
      }
    }
  }
  return safe(form, conf);

};
formError.clear = function (form, conf) {
  for (var field in conf) {
    var errorFieldName = field + '_error';
    delete form[errorFieldName];
  }
};
export default formError;
