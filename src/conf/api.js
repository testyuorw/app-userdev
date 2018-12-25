
// var api = 'http://apiv2.e1.fat.zjbird.com';
//var api = 'http://apiv2.zjbird.com';
var api = 'http://apiv2.zjbird.com';
if(window.location.hostname == 'localhost' || window.location.hostname.indexOf('fat')){
    api = 'http://apiv2.e2.fat.zjbird.com';
}
export default api;

