<template>
  <div class="container w100 h100 bgf5">
      <div class="cancel-box">
        <div class="cancel-content" @click="getreason()">
          <a href="javascript:void (0);" >取消订单原因</a>
          <span class="icon-arrow"></span>
        </div>
        <p class="c9" v-text="text"></p>
      </div>
      <textarea placeholder="取消原因" maxlength="200" class="cancel-input" v-model.trim="form.cancel_reason"> </textarea>
      <div class="btn-group-orders pf w100">
        <router-link :to="{path:'/orderDetail',query:{id:form.id,user_id:form.custid}}" class="btn-order-cancel">返回上级</router-link>
        <a href="javascript:;" class="btn-order-detail" @click="surecancel()">确定取消</a>
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
  import lstore from '../../tools/lstore'
  var method = {};
  var store = {};
  store.id = '';
  store.user_id = '';
  store.cancelists = [];
  store.form = {id:'',custid:'',cancel_id:''};
  store.text = '';

  method.getreason = function () {
    this.$selectbox.show(
      {'ind':true},
      {
        cshow:function (id,name){
          store.form.cancel_id = id;
          store.text = name;
          console.log("点击返回的名字");
        },
        cb:function () {
          console.log("我点了确定按钮");
        },
        selectData:store.cancelists
      });
  };


  method.surecancel = function () {
      console.log('hhh');
      var self = this;
      console.log(store.form);
    if(store.form.cancel_id == ''){
        this.$toast('请选择取消订单原因','bottom');
    }else {
        api.cancelorder(store.form).then(function (res) {
          if(res.code == error.error){
            self.$toast(res.msg,'bottom');
          }else if(res.code == error.success){
            self.$messagebox.show(
              {'title':'温馨提示','describe':'是否取消订单'},
              {cb:function () {
                self.$router.push({
                  path: '/allOrders'
//            query:{workid:store.form.user_id,user_id:store.custid}
                });
                this.cancle();
              }, buttonName:['确定','取消']});
          }
        })

    }

  };
  export default {
    name:'cancelOrder',
    data(){
        return store
    },
    methods:method,
    mounted:function () {
      var self = this;
      store.form.id = self.$route.query.id;
      store.form.custid = self.$route.query.user_id;


      api.cancel_reson({use:'howner_service'}).then(function (res) {
        var cancelists = res.result;
        for (var key in cancelists){
          store.cancelists[key] = {id:cancelists[key].id,name:cancelists[key].text};
          store.cancelists.push(store.cancelists[key]);
        }
      });
    }
  }
</script>

