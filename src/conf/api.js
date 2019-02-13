import lstore from '@/tools/lstore';
var api = 'http://apiv2.e1.fat.zjbird.com';
// var api = 'http://apiv2.zjbird.com';
lstore.set_item("wx", true);
if (window.location.hostname.indexOf('uapp') > -1) {
  api = 'http://apiv2.zjbird.com';
} else {
  api = 'http://apiv2.e2.fat.zjbird.com';
}
if (window.location.hostname == 'localhost') {
  lstore.set_item("wx", false);
}
export default api;

