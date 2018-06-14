<template>
  <div class="container w100 h100">
    <!--头部导航-->
    <div class="toggle-title pft w100 border-b">
      <router-link :to="{path:'/workerDetail',query:{workid:form.worker_id}}" class="icon-arrow-s pf" style="top:1rem;left: 1rem;"></router-link>
      <div class="orderdetail" :class="{'toggle-on':showcontent}" @click="showcontent=true">优秀案例</div>
      <div class="paydetail" :class="{'toggle-on':!showcontent}" @click="showcontent=false">其他案例</div>
    </div>
    <div class="toggle-content border-t" v-show="ok">
      <!--优秀案例-->
      <ul class="all-order" v-show="showcontent">
        <li v-for="item in orderLists">
          <div class="order-info flex-space-between mb10">
            <div class="flex-ajc ">
              <img class="order-img-header mr5" v-if="item.avator !== null && item.avator !== ''" :src="item.avator">
              <img class="order-img-header mr5" v-else src="../../assets/images/noheader.png" alt="" >
              <span  v-if="item.name !== null && item.name !== ''">{{item.name | cut}}</span>
              <span v-else>师傅</span>
            </div>
            <span class="c9" v-text="item.service_type"></span>
          </div>
          <p class="c6" v-text="item.detail"></p>
          <div class="fix-img">
            <div class="fix-img-item" v-for="img in item.photos">
              <img :src="img" @click="open(img)" class="w100">
            </div>

          </div>
          <p v-text="item.created_time" class="c9" style="font-size:0.8rem;"></p>
        </li>
      </ul>
      <!--其他案例-->
      <ul v-show="!showcontent" class="all-order">
        <li v-for="item in otherCase">
          <div style="margin-bottom: 1rem;">
            <p class="orange">案例说明:</p>
            <p class="c9" style="word-break:break-all;" v-text="item.detail"></p>
          </div>

          <p class="orange">案例图片:</p>
          <div class="fix-img">
            <div class="fix-img-item" v-for="img in item.photos">
              <img :src="img" @click="open(img)" class="w100">
            </div>

          </div>
        </li>
      </ul>
    </div>



    <div v-show="!ok" class=" h100 w100" style="background-color: #ececec;">
      <!--<div class="all-order-img-title">-->
        <!--<router-link :to="{path:'/workerDetail',query:{ workid :form.workid }}" class="back">&lt;</router-link>-->
        <!--<span style="margin-left: 30%;">历史订单</span>-->
      <!--</div>-->
      <div class="none-img-box" >
        <img src="../../assets/images/none.png" alt="啊哦~没有找到哦~">
        <p>您还没有相关订单~~ </p>
        <!--<p> 快去预约工友创建订单吧~~~</p>-->
      </div>
    </div>

  </div>
</template>
<script>
  import api from '../../services/api';
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import page from '../page'
  import hook from '../../tools/hook'

  var store = {};
  var method = {};
  store.form = {};
  store.orderLists= {};
  store.otherCase = {};
  store.ok = true;
  store.showcontent = true;//显示内容的切换

  method.open = function (src) {
    this.$image(src);
  };

  store.offset = 1;//当前加载页
  store.pageStart = 0;
  store.pageEnd = 0;
  store.num = 10;//默认一页多少条
  store.listData = [];//下啦更新数据
  store.downData = [];//上啦更多数据

  method.getOrderList = function () {
//      store.form.offset = store.offset;
    api.historyOrder(store.form).then(function (res) {
      if(res.result.length == 0){
          store.ok = false;
      }else {
          store.ok = true;
        store.orderLists = res.result;
      }

    })
  };

  method.getOther = function () {
    api.otherCase(store.form).then(function (res) {
      console.log(res);

      if(res.result.length == 0){
        store.ok = false;
      }else {
        store.ok = true;
        store.otherCase = res.result;
      }

    })
  };



  export default {
    name:'historyOrder',
    data(){
      return store
    },
    methods:method,
    mounted:function () {
      var self = this;
      var workid = self.$route.query.workid;
      store.form.worker_id = workid;
      method.getOrderList();
      method.getOther();


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
