<template>
  <div class="container w100 h100 bgf5 oh">
    <!--头部导航-->
    <div class="toggle-title pft w100">
      <div class="orderdetail" :class="{'toggle-on':showcontent}" @click="showcontent=true">施工详情</div>
      <div class="paydetail" :class="{'toggle-on':!showcontent}" @click="showcontent=false">付款详情</div>
    </div>
    <div class="toggle-content h100 oh-y-a">
      <div v-show="showcontent" style="padding-bottom: 3.8rem">
        <div class="order-wrap" >
          <div class="my-work-area bgf">
            <div class="title-detail-wrap flex-space-between">
              <h3>我的工地</h3>
              <a @click="servicephone()" :href="phone" class="linkme">联系客服</a>
            </div>

            <div class="pay-detail">
              <p >订单号：<span class="" v-text="orderdetail.id"></span></p>
              <p>施工工友：<span v-text="orderdetail.worker.name"></span></p>
              <p>已付款： <span class="notice" v-text="'¥'+orderdetail.mnyPayed"></span></p>
              <!--<div class="flex-space-between already-pays">-->
              <!--<a class="pay-status" @click="lookpay(orderdetail.workstatus)">付款详情 </a>-->
              <!--</div>-->
            </div>
          </div>
          <div class="work-condition-box bgf">
            <div>
              <h3>工地情况</h3>
              <div class="flex" style="padding: 0.5rem 2%;">
                <p class="c9">我的评论：</p>
                <div>
                  <p style="word-break: break-all;" v-text="orderdetail.comment" v-if="orderdetail.comment !== ''"></p>
                  <p v-else>无</p>
                  <p class="c9" v-text="orderdetail.comment_time"></p>
                </div>
              </div>
            </div>
            <ul  class="work-condition p2">
              <li class="tac" v-show="isFinished">
                <p class="orange">施工完成</p>
                <span class="c9" v-text="orderdetail.finishTime"></span>
              </li>
              <li v-for="item in orderdetail.imgs">
                <p>工友：{{orderdetail.worker.name}}</p>
                <span class="c9" v-text="item.created_at"></span>
                <div class="fix-img">
                  <div class="fix-img-item" v-for="img in item.photos">
                    <img :src="img" @click="open(img)" class="w100">
                  </div>
                </div>
              </li>
              <li class="tac" v-show="isStart">
                <p class="orange">施工开始</p>
                <span class="c9" v-text="orderdetail.acceptTime"></span>
              </li>
            </ul>
            <div class="btn-group-orders pf w100">
              <router-link :to="{path:'/cancelOrder',query:{id:orderdetail.id,user_id:orderdetail.custid}}" class="btn-order-cancel" v-show="showcancelbtn">取消订单</router-link>
              <a href="javascript:void(0);" class="btn-order-detail" v-text="moneyList[orderdetail.workstatus]" @click="go(orderdetail.workstatus)"></a>
            </div>

          </div>
        </div>
      </div>

      <div v-show="!showcontent">
        <div class="pay-wrap" v-show="ok">
          <ul class="pays pays-total " style="padding: 0;">
            <li class="bgf">
              <h3 class="">订单总计</h3>
            </li>
            <li class="pays-list">
              <p class="orange">安装费</p>
              <p class="c9">¥{{paydetail.fee}}</p>
            </li>
            <li class="pays-list">
              <p class="orange">材料清单</p>
            </li>
            <li class="pays-list" v-for="item in paydetail.materials">
              <div>
                <p v-text="item.name">世丰PPR冷热水管 白色管材</p>
                <p class="c9">单价：{{item.price}}元/{{item.measure}}*{{item.amount}}</p>
              </div>
              <p class="c9">¥{{item.mny}}</p>
            </li>
            <li class="bgf tar" >
              <p>合计：¥ <span class="notice">{{ (Number(paydetail.fee) + Number(paydetail.materialsfee)).toFixed(2) }}</span></p>
            </li>
          </ul>
          <ul class="pays pays-first " v-show="first">
            <li class="bgf">
              <h3 class="">首付款</h3>
            </li>
            <li class="pays-list">
              <p class="orange">安装费</p>
              <div class="tar">
                <p class="c9">¥{{paydetail.fee}}</p>
                <p class="c6" v-if="part">*30%= <span class="notice">¥{{paydetail.feepay30}}</span></p>
              </div>
            </li>
            <li class="pays-list" >
              <p class="orange">材料清单</p>
            </li>
            <li class="pays-list" v-for="item in paydetail.materials">
              <div>
                <p v-text="item.name"></p>
                <p class="c9">单价：{{item.price}}元/{{item.measure}}*{{item.amount}}</p>
              </div>
              <div class="tar">
                <p class="c9">¥{{item.mny}}</p>
                <p class="c6" v-if="part">*30%= <span class="notice">¥{{item.pay30}}</span></p>
              </div>
            </li>
            <li class="bgf tar" >
              <p>合计：¥
                <span class="notice" v-if="part">{{(Number(paydetail.feepay30) + Number(paydetail.materialsfee30)).toFixed(2) }}</span>
                <span class="notice" v-else>{{(Number(paydetail.fee) + Number(paydetail.materialsfee)).toFixed(2) }}</span>
              </p>
            </li>
          </ul>
          <ul class=" pays pays-no" v-show="no">
            <li class="bgf">
              <h3 class="">{{two}}</h3>
            </li>
            <li class="pays-list">
              <p class="orange">安装费</p>
              <div class="tar">
                <p class="c9">¥{{paydetail.fee}}</p>
                <p class="c6">*70%= <span class="notice">¥{{paydetail.feepay70}}</span></p>
              </div>
            </li>
            <li class="pays-list" >
              <p class="orange">材料清单</p>
            </li>
            <li class="pays-list" v-for="item in paydetail.materials">
              <div>
                <p v-text="item.name"></p>
                <p class="c9">单价：{{item.price}}元/{{item.measure}}*{{item.amount}}</p>
              </div>
              <div class="tar">
                <p class="c9">¥{{item.mny}}</p>
                <p class="c6" v-if="part">*70%= <span class="notice">¥{{item.pay70}}</span></p>
              </div>
            </li>
            <li class="bgf tar" >
              <p>合计：¥
                <span class="notice">{{(Number(paydetail.feepay70) + Number(paydetail.materialsfee70)).toFixed(2) }}</span>
              </p>
            </li>
          </ul>
          <ul class="pays pays-already" v-show="already">
            <li class="bgf">
              <h3 class="">已付款</h3>
            </li>
            <li class="pays-list">
              <p class="orange">安装费</p>
              <div class="tar">
                <p class="c9">¥{{paydetail.fee}}</p>
                <p class="c6" v-if="part">*30%= <span class="notice">¥{{paydetail.feepay30}}</span></p>
              </div>
            </li>
            <li class="pays-list" >
              <p class="orange">材料清单</p>
            </li>
            <li class="pays-list" v-for="item in paydetail.materials">
              <div>
                <p v-text="item.name"></p>
                <p class="c9">单价：{{item.price}}元/{{item.measure}}*{{item.amount}}</p>
              </div>
              <div class="tar">
                <p class="c9">¥{{item.mny}}</p>
                <p class="c6" v-if="part">*30%= <span class="notice">¥{{item.pay30}}</span></p>
              </div>
            </li>
            <li class="bgf tar" >
              <p>合计：¥
                <span class="notice" v-if="part">{{(Number(paydetail.feepay30) + Number(paydetail.materialsfee30)).toFixed(2) }}</span>
                <span class="notice" v-else>{{(Number(paydetail.fee) + Number(paydetail.materialsfee)).toFixed(2) }}</span>
              </p>
            </li>
          </ul>
          <div class="pf w100 all-pay bgf" v-show="isFinish">
            <p>合计：¥
              <span class="notice" v-if="part">{{Number(paymoney).toFixed(2)}}</span>
              <span class="notice" v-else>{{Number(paymoney).toFixed(2)}}</span>
            </p>
            <a href="javascript:void (0)" class="btn-order" @click="paymoneys()">{{message}}</a>
          </div>
        </div>
        <div v-show="!ok" class="w100 h100">
          <div class="none-img-box" style="background-color: #f5f5f5;">
            <img src="../../assets/images/none.png" alt="啊哦~没有找到哦~">
            <!--<p>您还没有相关订单~~ </p>-->
            <!--<p> 快去预约工友创建订单吧~~~</p>-->
          </div>
        </div>
      </div>

    </div>



  </div>
</template>

<script>
  import api from '../../services/api';
  import user from '../../services/userinfo'
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import StatusCode from '../../services/StatusCode';
  import formError from '../../tools/formerror'
  import page from '../page'
  import hook from '../../tools/hook'
  import info from '../../tools/info'
  var method = {};
  var store = {};
  store.phone = 'tel:';
  store.form = {};
  store.orderdetail = {worker:{name:''}};
  store.moneyList = StatusCode.orderdetail;
  store.isFinished = true;
  store.isStart = true;
  store.showcancelbtn = true;

  store.ok = true;//付款详情控制

  store.showcontent = true;//显示内容的切换

  //  获取客服电话
  method.servicephone = function () {
    api.service_phone().then(function (res) {
      var result = res.result;
      store.phone = 'tel:'+result.service_phone;
    })
  };
//  付款详情
  store.paydetail = {};
  store.isFinish = '';
  store.part = '';//部分还是全部付款
  store.first = '';
  store.no = '';
  store.already = '';
  store.message = "立即付款";
  store.paymoney = '';
  store.two = '未付款';
  //  付款详情
  method.getpayorder = function () {
    api.get_orderdetail(store.form).then(function (res) {
      store.ordertype = res.result.ordertype;
      store.paydetail = res.result;
//      console.log(res);
      store.paytype = res.result.paytype;
//      console.log(store.paytype);
//      console.log(store.paydetail.paystatus);
//      付款方式
      if(store.paytype == 1){//部分付款
        store.part = true;
        store.first = true;
        if(store.paydetail.paystatus == 0){//没付钱
          store.no = false;
          store.already = false;
          store.isFinish = true;
          store.paymoney = parseFloat(store.paydetail.feepay30) + parseFloat(store.paydetail.materialsfee30);
        }else if(store.paydetail.paystatus == 1){//付了一点
          store.first = false;
          store.no = true;
          store.already = true;
          store.isFinish = true;
          store.paymoney = parseFloat(store.paydetail.feepay70) + parseFloat(store.paydetail.materialsfee70);
          store.message = '支付余额';
        }else if(store.paydetail.paystatus == 2){//全付了
          store.isFinish = false;
          store.two = '二次付款';
          store.no = true;
          store.first = true;
          store.already = false;
        }
      }
      else if(store.paytype == 0){//全付款
        store.part = false;
        store.first = true;
        store.no = false;
        store.already = false;
        if(store.paydetail.paystatus == 0){//没付钱
          store.paymoney = parseFloat(store.paydetail.fee) + parseFloat(store.paydetail.materialsfee);
          store.isFinish = true;
        }else if(store.paydetail.paystatus == 2){//付款 了
          store.isFinish = false;
        }

      }
    })
  };
  method.paymoneys = function () {
    var self = this;
    self.$router.push({
      path:'/payOnline',
      query:{money:store.paymoney,id:store.form.id,ordertype:store.ordertype,user_id:store.user_id}
    });
    info.set('money',store.paymoney);
  };
//施工详情
  method.open = function (src) {
    this.$image(src);
  };
  method.getorder = function () {
    api.get_orderdetail(store.form).then(function (res) {
//        console.log(res);
        store.workerid = res.result.workid;

      if(res.result.worker == null){
        res.result.worker = {name:'无'}
      }
      store.orderdetail = res.result;

//      判断是否有取消订单的按钮

      store.workstats = store.orderdetail.workstatus;
// 施工详情是否有取消按钮
      if(store.workstats > 3 || store.workstats == -1){
          store.showcancelbtn = false;
          store.ok = true;
      }else{
          store.showcancelbtn = true;
          store.ok = false;
      }
//付款详情是否有内容
      if(store.workstats >= 3){
        store.ok = true;
      }else{
        store.ok = false;
      }

      if(!store.orderdetail.finishTime){
          store.isFinished = false;
      }else{
         store.isFinished = true;
      }
      if(!store.orderdetail.acceptTime){
        store.isStart= false;
      }else{
        store.isStart = true;
      }
    })
  };
  var comment  = function () {
    let self = this;
    self.$router.push({
      path:'/evaluationOfWorkers',
      query:{id:store.form.id,worker_id:store.workerid}
    })
  };
  var paymoney  = function () {
    let self = this;
    self.$router.push({
      path:'/payOnline',
      query:{money:store.paymoney,id:store.form.id,ordertype:store.ordertype,user_id:store.user_id}
    });
  };
  var confirm = function () {
    const params = {
        'id':store.form.id,
        'custid':store.user.user_id
    };
    var self = this;
    api.order_confirm(params).then(function (response) {
      if (error.success == response.code) {
          self.$toast(response.msg,'bottom');
          method.getorder();
      }
    });
  };
  var task = {
      10:comment,
      9:confirm,
      3:paymoney
  };

//  在3,9,10状态下要跳转网页
  method.go = function (workerstatus) {
    if (task.hasOwnProperty(workerstatus)) {
        task[workerstatus].apply(this);
    }
  };
//  method.lookpay = function (workerstatus) {
//    var self = this;
//    if (workerstatus >=3 ) {
//      self.$router.push({
//        path: '/payAll',
//        query: {id: store.form.id}
//      })
//    }
//  };


  export default {
  name:'orderDetail',
  data(){
      return store
  },
  methods:method,
  mounted:function () {
    var self = this;
    store.form.id = self.$route.query.id;
    store.user = user.info.apply(this);
    store.user_id = self.$route.query.user_id;
    method.getorder();

//    付款详情
    method.getpayorder();
    method.servicephone();
  }
}
</script>
