import lstore from '@/tools/lstore';
// var api = 'http://apiv2.e1.fat.zjbird.com';
// var api = 'http://apiv2.zjbird.com';
var api = 'http://apiv2.zjbird.com'; // 线上地址
// var api = 'http://apiv2.e2.fat.zjbird.com';// 测试地址
lstore.set_item("wx",true);
if(window.location.hostname == 'localhost' || window.location.hostname.indexOf('wechat')>-1){
    api = 'http://apiv2.e2.fat.zjbird.com';
}
if(window.location.hostname == 'localhost'){
    lstore.set_item("wx",false);
}

export default api;

