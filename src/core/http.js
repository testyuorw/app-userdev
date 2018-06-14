import Vue from 'vue'
import VueResource from 'vue-resource'
import Promise from "Promise"
import api from '../conf/api'
import encrypt from './hex'
import Core from 'crypto-js/core'
import CryptoJS from 'crypto-js/crypto-js'
import Base64 from 'crypto-js/enc-base64'
import AES from 'crypto-js/aes'
Vue.use(VueResource);
function Encrypt(word) {
  var iv = '313ea891fb4d20f8';
  var key = '@Zkmk@09cc0Kjnh@';
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding});
  var ciphertext = encrypted.ciphertext.toString();
  var encryptedHexStr = CryptoJS.enc.Hex.parse(ciphertext);
  var base64 = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  return base64;
}
var http = function (type, url, params, not_api) {
  var hex = encrypt({'mk@9040Zi': new Date().getTime(), 'os': 'h5'});
  const auth = Encrypt(hex);
  if (!not_api) {
    var url = api + url;
  }
  var params = params || {};
  Vue.http.headers.common['X-Zjbird-Auth'] = auth;
  Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-Zjbird-Auth', auth); //setting request.headers
    next((response) => {
      return response
    })
  })
  var option = {
    emulateJSON: true
  };
  if (type !== 'post') {
    option = {
      emulateJSON: true,
      'params': params
    };
    params = option;
  }
  return new Promise((resolve, reject) => {
    Vue.http[type](url, params, option).then(function (response) {
      resolve(response['data'])
    }, function (error) {
      reject(error['data'])
    })
  })
};
export default http


