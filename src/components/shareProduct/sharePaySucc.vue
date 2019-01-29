<template>
  <div class="container w100 h100">
    <div class="success">
      <div class="success-content">
        <img src="../../assets/images/successbg.png" alt="成功" class="success-img">
        <p class="fz19 mt4">支付成功</p>
        <p class="fz14 mt3">下载<span class="paysuccesstext">“住建鸟APP”</span>查看订单状态</p>
        <p class="fz14 mt3">注：住建鸟APP—我的—我的订单—业主自选</p>
      </div>
        <div style="margin-top:30px;width:14rem;height:14rem;">
            <img src="../../assets/images/zjn-dimension.png" style="max-width:100%" alt="成功" >
        </div>
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
  import page from '../page'
  import tool from '../../tools/tool'
  import citys from  '../common/citys'
  import wxpay from '../../tools/pay'
  var method = {};
  var store = {};

  method.download = function () {
    if(store.utype == 0){//工友
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.housingbirdsrshbworker';
    }else if(store.utype == 1){//用户
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.housingbirdsrshb';
    }
  };
    export default {
        name: "sharePaySucc",
        data(){
            return store
        },
        methods: method,
        mounted(){
          page.title("付款成功");

          //取用户信息
          store.shareUser = lstore.get_item("shareUser");
          if (store.shareUser) {
            store.shareUser = lstore.get_item("shareUser").val;
            console.log(store.shareUser);
            store.utype = store.shareUser.sign_type;//页面加载完成时用户类型
          }
        }
    }
</script>

<style>
.paysuccesstext{
    color:#FF6000;
}
</style>

