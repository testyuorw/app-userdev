<template>
  <div class="container w100 h100 all-orders">
    <refresh :on-refresh="onRefresh" :on-infinite="onInfinite" v-show="orderLists.length">
      <ul class="all-orders-box">
        <router-link tag="li" v-for="item in orderLists" :key="item.id" class="all-order-list" :to="{path:'/orderDetail',query:{id:item.id,user_id:form.custid}}">
          <div class="order-one">
            <p>施工工友</p>
            <span class="orange" v-text="item.worker.name "></span>
          </div>
          <div class="order-two ">
            <p class="c6">下单时间：<span class="c9" v-text="item.created_at"></span></p>
            <span class="pay-status" v-text="moneyList[item.workstatus]"></span>
          </div>
          <div class="order-three bgf5">
            <span class="orange">安装费</span>
            <p>¥{{item.fee}}</p>
          </div>
          <div class="order-four bgf5">
            <span class="orange">材料清单</span>
            <p>¥{{item.materialsfee}}</p>
          </div>
        </router-link>
      </ul>
    </refresh>
    <div class="none-img-box h100 w100" v-show="!orderLists.length">
      <img src="../../assets/images/none.png" alt="啊哦~没有找到哦~">
      <p>您还没有订单 </p>
      <p> 快去预约工友创建订单吧~~~</p>
    </div>
    <div class="pf w100">
      <router-link class="btn-order w100" :to="{path:'/allWorker',query:{user_id:form.custid}}">预约工友</router-link>
    </div>

  </div>
</template>

<script>
  import api from '../../services/api'
  import lstore from '../../tools/lstore';
  import user from '../../services/userinfo'
  import error from '../../services/error'
  import refresh from '../common/refresh'
  import loadmore from '../../services/loadmore'
  import StatusCode from '../../services/StatusCode'
  var method = {};
  var store = {};
  store.orderLists = {};
  store.money = '';
  store.moneyList = StatusCode.order;
  store.form = {};
  var init = function () {
    store.form = {custid: '', offset: 1};
  };
  method.getList = function () {
    api.get_orderlists(store.form).then(function (response) {
        if(response.code == error.success){
            response.result.forEach(function (item) {
              if (item.worker == null) {
                item.worker = {name: '无'}
              }
            });
          store.orderLists = loadmore.push(response.result,store.form.offset);
          console.log(loadmore.store);
        }
    });
  };
  method.onRefresh = function (done) {
    store.form.offset=1;
    method.getList();
    if ('function' == typeof done) {
      done();
    }
  };
  method.onInfinite = function (done) {
    store.form.offset++;
    method.getList();
    if ('function' == typeof done) {
      done();
    }
  };
  export default {
    name: 'allOrders',
    data(){
      return store;
    },
    methods: method,
    watch: {
      '$route':init
    },
    components: {
      refresh
    },
    mounted: function () {
      init();
      store.user = user.info.apply(this);
      store.form.custid = store.user.user_id;
      method.getList();
//      lstore.set_item('sitetype',2);
    }
  }
</script>
