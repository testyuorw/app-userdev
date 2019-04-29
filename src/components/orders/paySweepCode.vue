<template>
  <div class="container w100 h100 bgf5">
    <div class="orderBox">
      <div class="h3rem bdb" v-show="orderdetail.paystatus != 2 || !orderdetail.id">
        <div>服务订单编号:</div>
        <div class="flex-space-between">
          <input type="text" placeholder="请输入服务订单编号" v-model="id">
          <a class="btn-order" @click="getorder">确认</a>
        </div>
      </div>
      <ul>
        <li class="flex-space-between h3rem">
          <div>服务订单编号</div>
          <div>{{reqSuccess?orderdetail.id:'暂无'}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>销售日期</div>
          <div>{{reqSuccess&&orderdetail.created_at?orderdetail.created_at:'暂无'}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>销售单位</div>
          <div>{{reqSuccess&&orderdetail.orgname?orderdetail.orgname:'暂无'}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>联系人</div>
          <div>{{reqSuccess&&orderdetail.linkman?orderdetail.linkman.slice(0,1)+'**':'暂无'}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>联系电话</div>
          <div>{{reqSuccess&&orderdetail.tel?orderdetail.tel.slice(0,3)+'****'+orderdetail.tel.slice(-4):'暂无'}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>订单状态</div>
          <div>{{reqSuccess?(orderdetail.paystatus == 2?'已支付':'未支付'):'暂无'}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>订单金额</div>
          <div v-if="!reqSuccess">暂无</div>
          <div v-else>
            <span class="notice">¥ {{orderdetail.totalmoney}}</span>
          </div>
        </li>
      </ul>
    </div>
<!--    <a href="javascript:void (0);"
       class="btn-order pf w100"
       v-if="orderdetail.paystatus != 2"
       @click="weixinPay">确认付款</a>-->
    <button class="btn-order pf w100" :disabled="!tapAble" :class="{'bg-black-40':!tapAble}" v-if="orderdetail.paystatus != 2" @click="weixinPay">{{btnTxt}}</button>
    <a href="javascript:void (0);" class="btn-order pf w100 bg-black-40" v-else>已支付</a>
  </div>
</template>

<script>
  import api from '../../services/api'
  import page from '../page'
  import lstore from '../../tools/lstore'
  import wxpay from '../../tools/pay'
  import cookie from '../../tools/cookie'
  var method = {};
  var store = {};
  store.id = '';
  store.btnTxt = '确认付款';
  store.orderdetail = {id: ''};
  store.form = {order_type: '', need_pay_price: '', order_sn: ''};
  store.money = '';
  store.reqSuccess = false;
  store.queryId = false;
  store.tapAble = true;
  store.timer = null;
  store.count = 30;
  //点击支付按钮
  method.weixinPay = function () {
    store.tapAble = false;
    if (store.orderdetail.id) {
      store.form.need_pay_price = store.orderdetail.totalmoney;
      store.form.order_sn = store.orderdetail.id;
      store.form.order_type = store.orderdetail.ordertype;
      store.timer = setInterval(function () {
        if(store.count>1){
          store.count--;
          store.btnTxt = store.count + 's后重试';
          store.tapAble = false;
        }else{
          clearInterval(store.timer);
          store.count=30;
          store.btnTxt = '确认付款';
          store.tapAble = true;
        }
      },1000);
      api.get_trade(store.form).then(function (res) {
        if (res.code == 200) {
          store.trade_sn = res.result.trade_sn;
          lstore.set_item('trade_sn',store.trade_sn);
          if (store.trade_sn) {
            try{
              const params = {
                'openid': lstore.get_item('openid').val,
                'trade_sn': store.trade_sn,
                'title': '住建鸟',
                'uid': ''
              };
              api.get_jsapi(params).then(function (res) {
                store.jsapi = JSON.parse(res.result.js);
                var def = wxpay(store.jsapi);
                def.then(function (response) {
                  if (response === 'ok') {
                    method.getorder();
                  }
                });
              });
            }catch(e){
              console.log('h5pay:\n'+e);
            }
          }
        } else {
          store.vm.$toast(res.msg, "center");
        }
      });
    } else {
      store.vm.$toast('订单号错误', "center");
    }
  };
  method.getorder = function () {

    // 90003032   //90000856
    // console.log(window.navigator.userAgent.toLocaleLowerCase().includes('android'))
    // console.log(lstore.get_item('openid').val)
    if((!lstore.get_item('openid')||!lstore.get_item('openid').val) && !location.href.includes('localhost') && window.navigator.userAgent.toLocaleLowerCase().includes('android')){
      store.vm.$toast('用户信息获取失败，请重新获取~', "center");
      return
    }
    if (store.id) {

      const formObj = {
        id: store.id
      }
      api.get_orderdetail(formObj).then(function (res) {
        if (res.code == 200) {
          store.reqSuccess = true;
          store.orderdetail = res.result;
          method.weChatShare();
        } else {
          store.reqSuccess = false;
          store.vm.$toast(res.msg, "center");
        }
      },function (err) {
        if(err){
          store.vm.$toast('订单号错误~', "center");
        }
      })
    } else {
      store.vm.$toast('请输入订单号~', "center");
    }
  };
  //微信分享的方法
  method.weChatShare = function () {
    try {
      api.share({url:window.location.href}).then(function (response) {
        const  result = response.result;
        if(result){
          const config = {
            debug: false,
            appId: result['appid'],
            timestamp: result['timestamp'],
            nonceStr: result['nonceStr'],
            signature: result['signature'],
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
          };
          wx.config(config);
          wx.ready(function () {
            var shareData = {
              title: '住建鸟快速付款通道来了~~',
              desc: '录入订单号，快速付款',
              link: window.location.origin+'/#/paySweepCode?id='+store.id,
              imgUrl: window.location.origin+'/static/img/payCode.png',
              success:function () {
                // console.log(window.location.origin+'/#/paySweepCode?id='+store.id)
                store.vm.$toast('分享成功~~', "top");
              },
              cancel: function (res) {
                store.vm.$toast(res.err_desc, "top");
              }
            };
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
          });
          wx.error(function(res){
            console.log('wx.error:\n'+res)
          });
        }
      })
    }catch (e) {
      console.log(e.message);
    }
  };
  export default {
    name: 'paySweepCode',
    data(){
      return store;
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: method,
    beforeCreate () {
      // alert('pay.vue\n\nbeforeCreate:\n' + location.href);
    },
    mounted () {
      page.title('订单支付');
      store.vm = this;
      lstore.set_item('sitetype', 6);
      let query = this.$route.query;
      if (query.hasOwnProperty('openid')) {
        const openid = query['openid'];
        cookie.set.call(this, 'openid', openid);
        lstore.set_item('openid', openid);
      }
      if (this.$route.query.id) {
        store.queryId = true;
        store.id = this.$route.query.id || '';
        method.getorder();
      }
      method.weChatShare();
      store.id=store.id==undefined?'':store.id;
  }
  }
</script>
<style lang="scss" scoped>
  .orderBox{
    height: calc(100% - 5rem);
    overflow-y: scroll;
    .h3rem{
      padding: 1.4rem 0.8rem;
      font-size: 1.4rem;
      background-color: #fff;
      border-bottom: 1px solid #f5f5f5;
      >div:first-child{
        width: 12rem;
      }
      >div:last-child{
        color: #999;
      }
    }
    ul{
      padding: 0 0.8rem;
      background-color: #fff;
      .h3rem{
        padding: 1.6rem 0.8rem;
        align-items: flex-start;
      }
    }
    .bdb{
      border-bottom: 20px solid #f5f5f5;
      .flex-space-between{
        margin: 1rem 0;
        input,a{
          width: 66%;
          height: 4rem;
          line-height: 4rem;
          border-radius:8px;
        }
        input{
          background:rgba(255,209,2,0);
          border:1px solid rgba(51, 51, 51, 1);
          padding: 0.8rem 1rem;
        }
        a{
          width: 30%;
          font-size: 1.4rem;
        }
      }
    }
  }
  .pf{
    line-height: 4.8rem;
    border: none;
    outline: none;
  }
</style>
