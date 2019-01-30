<template>
  <div class="container w100 h100 bgf5">
    <div class="orderBox">
      <div class="h3rem bdb" v-if="orderdetail.paystatus != 2">
        <div>销售订单编号:</div>
        <div class="flex-space-between">
          <input type="text" placeholder="请输入销售订单编号" v-model="orderdetail.id">
          <a class="btn-order" @click="getorder">确认</a>
        </div>
      </div>
      <ul>
        <li class="flex-space-between h3rem" v-if="reqSuccess && orderdetail.paystatus == 2">
          <div>销售订单编号</div>
          <div>{{orderdetail.id}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>销售日期</div>
          <div>{{reqSuccess?orderdetail.created_at:'暂无'}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>销售单位</div>
          <div>{{reqSuccess?orderdetail.custid:'暂无'}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>联系人</div>
          <div>{{reqSuccess?orderdetail.linkman:'暂无'}}</div>
        </li>
        <li class="flex-space-between h3rem">
          <div>联系电话</div>
          <div>{{reqSuccess?orderdetail.tel:'暂无'}}</div>
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
<!-- v-if="orderdetail.paystatus != 2"-->
    <a href="javascript:void (0);"
       class="btn-order pf w100"
       @click="weixinPay">确认付款</a>
  </div>
</template>

<script>
  import api from '../../services/api'
  import page from '../page'
  import wxpay from '../../tools/pay'
  var method = {};
  var store = {};
  store.orderdetail = {id: ''};
  store.money = '';
  store.reqSuccess = false
  //点击支付按钮
  method.weixinPay = function () {
    var self = this
    if (store.orderdetail.id) {
      api.get_trade({
        id: store.orderdetail.id
      }).then(function (res) {
        if (res.code == 200) {
          store.trade_sn = res.result.trade_sn;
          lstore.set_item('trade_sn',store.trade_sn);
          if (store.trade_sn) {
            try{
              const params = {
                'openid': lstore.get_item('openid').val,
                'trade_sn': store.trade_sn,
                'title': '测试',
                'uid': ''
              };
              api.get_jsapi(params).then(function (response) {
                store.jsapi = JSON.parse(response.result.js);
                var def = wxpay(store.jsapi);
                def.then(function (response) {
                  if (response === 'ok') {
                    store.vm.$router.push({
                      path: '/sharePaySucc'
                    });
                  }
                });
              });
            }catch(e){
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
    // 90003032
    if (store.orderdetail.id) {
      api.get_orderdetail(store.orderdetail).then(function (res) {
        if (res.code == 200) {
          store.reqSuccess = true
          store.orderdetail = res.result;
        } else {
          store.reqSuccess = false
          store.vm.$toast(res.msg, "center");
        }
      })
    } else {
      store.vm.$toast('订单号错误', "center");
    }
  };
  export default {
    name: 'paySweepCode',
    data(){
      return store;
    },
    methods: method,
    mounted: function () {
      page.title('订单支付');
      store.vm = this;
      var self = this;
      if (self.$route.query.id) {
        store.orderdetail.id = self.$route.query.id;
        lstore.set_item('codeId', store.orderdetail.id);
        method.getorder();
      }
    }
  }
</script>
<style lang="scss" scoped>
  .orderBox{
    background-color: #fff;
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
      .h3rem{
        padding: 1.4rem 0.8rem;
        align-items: flex-start;
      }
    }
    .bdb{
      border-bottom: 20px solid #f5f5f5;
      .flex-space-between{
        margin: 1rem 0;
        input{
          width: 20rem;
          height: 3rem;
          background:rgba(255,209,2,0);
          border:1px solid rgba(51, 51, 51, 1);
          border-radius:8px;
          padding: 0.8rem 1rem;
        }
        a{
          width: 10rem;
          border-radius:8px;
          height: 3rem;
          line-height: 3rem;
          font-size: 1.4rem;
        }
      }
    }
  }
</style>
