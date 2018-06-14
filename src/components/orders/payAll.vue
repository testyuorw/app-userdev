<template>
  <div class="container w100 bgf5">
    <ul class="pays pays-total ">
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
</template>

<script>
  import api from '../../services/api';
  import userinfo from '../../services/userinfo'
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import page from '../page'
  import hook from '../../tools/hook'
  import info from '../../tools/info'

  var method = {};
  var store = {};
  store.form = {};
  store.paydetail = {};
  store.isFinish = '';
  store.part = '';//部分还是全部付款
  store.first = '';
  store.no = '';
  store.already = '';
  store.message = "立即付款";
  store.paymoney = '';
  store.two = '未付款';

//  获取订单信息
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
//  付钱
  method.paymoneys = function () {
    var self = this;
    self.$router.push({
      path:'/payOnline',
      query:{money:store.paymoney,id:store.form.id,ordertype:store.ordertype,user_id:store.user_id}
    });
    info.set('money',store.paymoney);
  };
  export default {
    name:'payAll',
    methods:method,
    data(){
        return store
    },
    mounted:function () {
      var self = this;
      store.form.id = self.$route.query.id;
      store.user_id = self.$route.query.user_id;
      method.getpayorder();
//      获取openid
      console.log("openid");
      api.get_openid().then(function (res) {
        console.log(res);
        console.log("aa");
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
