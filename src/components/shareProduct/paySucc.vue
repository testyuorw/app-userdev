<template>
  <div class="container w100 h100">
    <div class="success">
      <div class="success-content">
        <img src="../../assets/images/successbg.png" alt="成功" class="success-img">
        <p class="green fz19 mt4">付款成功</p>
        <p class="fz14 mt3">打开APP实时查看订单情况</p>
      </div>

      <a class="paysucc fz17 mt5 tc" @click="download()">立即打开</a>

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
        name: "paySucc",
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

