<template>
  <div id="app" class="h100">
    <router-view></router-view>
  </div>
</template>
<script>
  import userinfo from './services/userinfo'
  import lstore from  './tools/lstore';
  import loadmore from './services/loadmore';
  import cookie from './tools/cookie'
  import api from './conf/api'
  import page from './components/page'
  var store = {};

  const auth = api + '/api/h5/openid';

  const setSiteType = function (fullPath) {
    const val = {'/allWorker': 1, '/manyOrders': 2,'/allProduct':3};
    if (val.hasOwnProperty(fullPath)) {
      lstore.remove('sitetype');
      lstore.set_item('sitetype', val[fullPath]);
    }
  };
  var fetchData = function () {
    const ShareLoginPage = cookie.get.call(this, 'ShareLoginPage');
    try {
      var fullPath = this.$route.path;
      loadmore.clear();
      setSiteType(fullPath);
      let sitetype = lstore.get_item('sitetype');
      if (sitetype) {
        sitetype = sitetype.val;
      }
    }catch (e) {

    }
    if ((ShareLoginPage && fullPath != '/shareLogin')) {
      userinfo.login_page = false;
      this.$router.push({path: '/shareLogin'});
    }
    if(fullPath == '/userProtocol'){
      this.$router.push({path: '/userProtocol'});
    }
    else if(fullPath == '/shareLogin' && !ShareLoginPage){//分享产品的页面登录
      var ShareLogin = userinfo.shareInfo.apply(this);
      if(ShareLogin){//如果存在
        // this.$router.push({path: '/confirmOrder'});
      }else {//不存在就继续sharelogin
        // this.$router.push({path: '/shareLogin'});
      }
    }
    else if(fullPath == '/confirmOrder'){//分享产品的页面登录
      // this.$router.push({path: '/confirmOrder'});
    }
    else if(fullPath == '/paySucc'){//分享产品的页面登录
      this.$router.push({path: '/paySucc'});
    }
    else if(store.weShare == false){//有没有分享的逻辑
      var CheckLogin = userinfo.info.apply(this);//正常的登录
      if (CheckLogin) { //当前页面不是分享的页面,从cookie中发现是  已登录
        if (fullPath == '/login') {
          var url = {'true': '/userInfo', 'false': {1: '/allWorker', 2: '/manyOrders'}};
          let location_url = url['false'];
          if ('object' == typeof  location_url) {
            location_url = location_url[sitetype];
          }
          this.$router.push({path: location_url})
        }
      }
      else { //当前页面不是分享的页面,从cookie中发现  没有登录
        console.log(ShareLoginPage,'login');
        if (userinfo.login_page && !ShareLoginPage) {
          console.log('share2');
          this.$router.push({path: '/login'});
        }
      }
    }
  };

  export default {
    name: 'app',
    watch: {
      '$route': 'fetchData'
    },
    data(){
      return store;
    },
    methods: {
      fetchData(){
        fetchData.apply(this);
      }
    },
    mounted() {
      // localStorage.clear();
      try {
        store.weShare = page.WechatShare();//判断是不是分享的
        const query = this.$route.query;
        const openid = cookie.get.call(this, 'openid');
        var path = this.$route.path;
        if (!openid) {
          console.log("run1");
          console.log(query.hasOwnProperty('openid')+"sha");
          if (query.hasOwnProperty('openid')) {
            console.log("run2");
            const openid = query['openid'];
            console.log('appOPenid'+openid);
            cookie.set.call(this, 'openid', openid);
            lstore.set_item('openid', openid);
          } else {
            console.log('share3');
            setTimeout(function () {
              window.location.href = auth;
            }, 500)
          }
        }
        fetchData.apply(this);
      }catch (e) {
        console.log(e.message);
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/style.scss";
</style>
