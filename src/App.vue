<template>
  <div id="app" class="h100">
    <router-view ></router-view>
  </div>
</template>
<script>
  import userinfo from './services/userinfo'
  import lstore from  './tools/lstore';
  import loadmore from './services/loadmore';
  const auth = api + '/api/h5/openid';
  import cookie from './tools/cookie'
  import api from './conf/api'
  import page from './components/page'

  var store = {};
  const setSiteType = function (fullPath) {
    const val = {'/allWorker': 1, '/manyOrders': 2,'/allProduct':3};
    if (val.hasOwnProperty(fullPath)) {
      lstore.remove('sitetype');
      lstore.set_item('sitetype', val[fullPath]);
    }
  };
  var fetchData = function () {
    var fullPath = this.$route.fullPath;
    let query = this.$route.query;
    if (query.hasOwnProperty('openid')) {
      const openid = query['openid'];
      cookie.set.call(this, 'openid', openid);
      lstore.set_item('openid', openid);
    }
    console.log(fullPath);
    loadmore.clear();
    setSiteType(fullPath);
    let sitetype = lstore.get_item('sitetype');
    if (sitetype) {
      sitetype = sitetype.val;
    }

    if(fullPath == '/userProtocol'){
      this.$router.push({path: '/userProtocol'})
    }
    else if(store.weShare == false){
      var CheckLogin = userinfo.info.apply(this);
      //没分享要登录
      if (CheckLogin) {
        if (fullPath == '/login') {
          console.log("fu");
          var url = {'true': '/userInfo', 'false': {1: '/allWorker', 2: '/manyOrders',3:'/allProduct',5:'/confirmOrder'}};
          let location_url = url['false'];
          if ('object' == typeof  location_url) {
            location_url = location_url[sitetype];
          }
          this.$router.push({path: location_url})
        }
      }
      else {
        console.log('run1'+Math.random());
        console.log("跳了吧");
        if (sitetype !== 5) {
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
    mounted: function () {
      store.weShare = page.WechatShare();//判断是不是分享的
      const query = this.$route.query;
      const openid = cookie.get.call(this, 'openid');
      console.log("appvue",openid);
      if (!openid) {
        if (!query.hasOwnProperty('openid')) {
          window.location.href = auth;
        }
      }
      fetchData.apply(this);
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/style.scss";
</style>
