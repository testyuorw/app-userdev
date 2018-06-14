import http from '../core/http'
import api from '../services/api'
var upload = function (el) {
  var url = 'http://up.qiniu.com';
  var files = el.files;
  var form = new FormData();
  var self = this;
  var extension = files[0].name.split('.')[1];
  var exts = '.jpg.png.gif';
  var error = -1;
  if (exts.indexOf(extension) == error) {
    this.$toast('文件格式不正确', 'center');
    return false;
  }
  api.qiniu_token().then(function (response) {
    var token = response.token;
    if (token) {
      form.append('token', token);
      form.append('file', files[0]);
      http('post', url, form, true).then(function (response) {
        if (response.key) {
          var pic = 'http://on5td8byy.bkt.clouddn.com/' + response.key;
          self.$set(self.form, 'avator', pic);
        }
      })
    }
  });

};
export default upload

