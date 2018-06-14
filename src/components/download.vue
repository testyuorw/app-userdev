<template>
  <div class="container w100 h100">
    <div class="success">
      <div class="success-content">
        <img src="../assets/images/app.png" alt="app">
        <p class="p-one" style="color:#333;">您还未安装APP <img src="../assets/images/success.png" alt=""></p>
        <!--<p class="p-two">现在就去立即 <span class="green">下载</span>住建鸟APP</p>-->
      </div>
      <div class="btns-group">
        <a class="btns download" @click="download()">立即安装</a>
      </div>
    </div>
  </div>

</template>

<script>
  import city from './common/city.vue'
  import api from '../services/api';
  import error from '../services/error'
  import cookie from '../tools/cookie'
  import page from './page'
  import hook from '../tools/hook'

  var method = {};
  var store = {};

  method.download = function () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid){
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.housingbirdsrshb';
      console.log('a');
    }else if(isiOS){
      window.location.href = 'https://itunes.apple.com/cn/app/%E4%BD%8F%E5%BB%BA%E9%B8%9F/id1217673147?mt=8';
      console.log('b');
    }
  };
  export default{
    name:'userInfoSucc',
    data(){
      return store
    },
    methods: method,
    components:{
      city
    },
    mounted(){
      var self = this;
//      method.getareas();
    }
  }
</script>
