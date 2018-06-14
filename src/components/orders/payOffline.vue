<template>
  <div class="container w100 h100 bgf5">
    <form action="" class="pay-offline bgf p2">
      <div class="form-group">
        <label>汇款银行账号</label>
      </div>
      <div class="form-group">
        <label>汇款日期</label>
        <a href="javascript:void(0)" class="cc" @click="setDate()">{{messagedate}}</a>
      </div>
      <div class="form-group">
        <label>交易流水号</label>
        <input type="number" placeholder="请输入汇款时的银行交易流水号" v-model="form.bank_flow">
      </div>
      <div class="form-group">
        <label>姓名</label>
        <input type="text" placeholder="请输入您的姓名" v-model="form.name">
      </div>
      <div class="form-group">
        <label>卡号</label>
        <input type="number" placeholder="请输入您的银行卡卡号" v-model="form.bank_account">
      </div>
      <div class="form-group">
        <label>开户行</label>
        <input type="text" placeholder="例如，中国工商银行 上海分行 某某支行" v-model="form.bank_name">
      </div>
    </form>
    <div class="bank-info bgf mt5 p2">
      <p class="c9 offline-title">线下汇款信息：</p>
      <div class="g-bank-info">
        <p>收款方名称：</p>
        <span>住建鸟网络科技（上海）有限公司</span>
      </div>
      <div class="g-bank-info">
        <p>收款方账号：</p>
        <span>03811000040037226</span>
      </div>
      <div class="g-bank-info">
        <p>开户行：</p>
        <span>中国农业银行上海金山工业区支行</span>
      </div>
      <div class="g-bank-notice c9">
        <p class="offline-title mt10">线下汇款说明:</p>
        <p>1) 如果直接到银行柜台办理汇款</p>
        <p>2) 如果您的银行卡具有网上银行转账功能，可以网上转账后，在此处提交转账信息。</p>
        <p>3) 汇款金额请以订单实际金额为准，汇款所需手续费用需要另付，不能从订单金额中直接扣除。</p>
        <p>4) 汇款根据不同银行会有3-5个工作日的转账周期</p>
        <div class="bank-info-last tac mt10">
          <p>如果遇到问题，可拨打客服电话</p>
          <p>400-8888-3003</p>
        </div>
      </div>
    </div>
    <a href="javascript:void(0)" class="btn-order pf w100" @click="alreadypay()">我已经付好款</a>

  </div>
</template>

<script>
  import api from '../../services/api';
  import userinfo from '../../services/userinfo'
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import page from '../page'
  import hook from '../../tools/hook'
  import lstore from '../../tools/lstore'
  var method = {};
  var store = {};
  store.form = {trade_sn:'',bank_flow:'',name:'',bank_account:'',bank_name:'',pay_date:''};
  store.messagedate = '请选择汇款日期';
  store.data = '';
  method.setDate = function () {
    var self = this;
    console.log('run');
    this.$calendar.show({
      onOk(data){
        store.data= data.year+'-'+data.month+'-'+data.day;
        store.messagedate = store.data;
        store.form.pay_date = store.data;
      },
      onCancel(){
        console.log('取消123')
      },
      year:2017,
      month:8,
      day:20
    })
  };
  method.alreadypay = function () {
    var self = this;
    api.offline(store.form).then(function (res) {
      if (error.success == res.code) {
        self.$router.push({
          path: '/allOrders'
        });
      }
    })
  };
  export default {
    name:'payOffline',
    data(){
        return store
    },
    methods:method,
    mounted:function () {
      try {
        store.form.trade_sn = lstore.get_item('trade_sn').val;
      } catch (e) {

      }
    }
  }
</script>
