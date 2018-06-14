<template>
  <div class="container w100 h100 bgf5">
    <h3 class="pay-title">选择支付方式</h3>
    <ul class="choose-pay bgf">
      <li>
        <div class="flex-ajc">
          <img src="../../assets/images/wechat.png" alt="微信" class="paying">
          <p>微信支付</p>
        </div>
        <img class="paystype" src="../../assets/images/check.png" v-if="wechatpay" @click="wechatpays">
        <img class="paystype" src="../../assets/images/nocheck.png" v-else @click="wechatpays">
      </li>
      <li>
        <div class="flex-ajc">
          <img src="../../assets/images/card.png" alt="线下支付" class="paying">
          <p>线下支付</p>
        </div>
        <img class="paystype" src="../../assets/images/check.png" v-if="offlinepay" @click="offlinepays">
        <img class="paystype" src="../../assets/images/nocheck.png" v-else @click="offlinepays">
      </li>
    </ul>
    <a href="javascript:void (0);" class="btn-order pf w100" @click="wantpay()">确认支付 ¥{{Number(form.need_pay_price).toFixed(2)}}</a>
  </div>
</template>

<script>
  import api from '../../services/api'
  import user from '../../services/userinfo'
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import page from '../page'
  import hook from '../../tools/hook'
  import info from '../../tools/info'
  import lstore from '../../tools/lstore'
  import wxpay from '../../tools/pay'
  var method = {};
  var store = {};
  store.alipay = false;
  store.wechatpay = false;
  store.offlinepay = false;
  store.money = '';
  store.form = {order_type: '', need_pay_price: '', order_sn: ''};
  //  支付方式——微信
  method.wechatpays = function () {
    store.wechatpay = !store.wechatpay;
    if (store.wechatpay == true) {
      store.alipay = false;
      store.offlinepay = false
    }
  };
  //  支付方式——线下付款
  method.offlinepays = function () {
    store.offlinepay = !store.offlinepay;
    if (store.wechatpay == true) {
      store.wechatpay = false;
      store.alipay = false;
    }
  };
  store.alipay = {};
  //点击支付按钮
  method.wantpay = function (data) {
    var self = this;
    if (store.wechatpay == true) {
      var def = wxpay(store.jsapi);
      def.then(function (response) {
        if (response === 'ok') {
          self.$router.push({
            path: '/orderDetail',
            query: {id: store.form.order_sn}
          });
        }
      });
    }
    else if (store.offlinepay == true) {
      self.$router.push({
        path: '/payOffline',
        query: {user_id: store.user_id}
      });
    }
  };
  export default {
    name: 'payOnline',
    data(){
      return store;
    },
    methods: method,
    mounted: function () {
      var self = this;
      store.form.need_pay_price = self.$route.query.money;
      store.form.order_sn = self.$route.query.id;
      store.form.order_type = self.$route.query.ordertype;
      store.user = user.info.apply(this);
      store.user_id = store.user.user_id;
      api.get_trade(store.form).then(function (res) {
        store.trade_sn = res.result.trade_sn;
        lstore.set_item('trade_sn',store.trade_sn);
        if (store.trade_sn) {
          try{
            const params = {
              'openid': lstore.get_item('openid').val,
              'trade_sn': store.trade_sn,
              'title': '测试',
              'uid': store.user_id
            };
            api.get_jsapi(params).then(function (response) {
              store.jsapi = JSON.parse(response.result.js);
            });
          }catch(e){

          }
        }
      });
    }
  }
</script>
