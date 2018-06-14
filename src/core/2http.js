import * as axios from 'axios';
import encrypt from './hex';
import api from '../conf/api'
var http = function (type, url, params, not_api) {
  if (!not_api) {
    var url = api + url;
  }
  var params = params || {};
  const hex = encrypt({'mk@9040Zi': new Date().getTime(), 'os': 'h5'});
  // const headers = {'X-Zjbird-Auth': hex};
  return axios[type](url, {'params': params}).then(function (response) {
      console.log(response);
  },function (err) {
      console.log(err);
  });
};
export default  http;
