<template>
  <div id="app" class="h100">
    <router-view></router-view>
  </div>
</template>
<script>
  import userinfo from './services/userinfo'
  import lstore from './tools/lstore';
  import loadmore from './services/loadmore';

  const auth = api + '/api/h5/openid';
  import cookie from './tools/cookie'
  import api from './conf/api'
  import api2 from './services/api'
  import page from './components/page'
  import error from './services/error'
  import code from "./services/code";
  import tool from "./tools/tool";

  var store = {};
  const setSiteType = function (fullPath) {
    const val = {'/allWorker': 1, '/manyOrders': 2, '/allProduct': 3};
    if (val.hasOwnProperty(fullPath)) {
      lstore.remove('sitetype');
      lstore.set_item('sitetype', val[fullPath]);
    }
  };
  var fetchData = function () {
    store.weShare = page.WechatShare();//判断是不是分享的
    const $this = this;
    var fullPath = this.$route.fullPath;
    let path = this.$route.path;
    let query = this.$route.query;
    // alert(fullPath);
    if (query.hasOwnProperty('openid')) {
      const openid = query['openid'];
      cookie.set.call(this, 'openid', openid);
      lstore.set_item('openid', openid);
    }
    if (localStorage.paySweepCodeId&&fullPath.includes('paySweepCode')) { // 单独处理扫码支付订单业务 add on 2019/01/30
      this.$router.push({
        path: '/paySweepCode',
        params: {
          id: localStorage.paySweepCodeId
        }
      })
    }else{
      loadmore.clear();
      setSiteType(fullPath);
      let sitetype = lstore.get_item('sitetype');
      if (sitetype) {
        sitetype = sitetype.val;
      }

      if (fullPath == '/userProtocol') {
        this.$router.push({path: '/userProtocol'})
      }
      else if (store.weShare == false) {
        let cookie_name = 'zjbird';
        if (sitetype == 5) {
          cookie_name = 'sharezjbird';
        }
        var CheckLogin = userinfo.info.call(this,cookie_name);
        //没分享要登录
        console.log('check login' + sitetype);
        if (CheckLogin) {
          if (fullPath == '/login') {
            var url = {
              'true': '/userInfo',
              'false': {1: '/allWorker', 2: '/manyOrders', 3: '/allProduct',4:'/workerDetail', 5: '/confirmOrder'}
            };
            let location_url = url['false'];
            if ('object' == typeof  location_url) {
              location_url = location_url[sitetype];
            }
            this.$router.push({path: location_url})
          }
        } else {
          if (sitetype != "5" && store.weShare == false) {
            if (!localStorage.paySweepCodeId) {
              this.$router.push({path: '/login'});
            }
          } else if (sitetype == "5") {
            try {
              store.openid = tool.get.call(store.vm, 'openid');
              api2.check_openid({openid: store.openid}).then(function (res) {
                if (!res.result || res.result == null || res.result == 'null') {
                  $this.$router.push({path: '/login'});
                  //alert('to2')
                  return false;
                }
                if (res.code == error.success) {
                  lstore.set_item('shareUser', res.result);
                  store.vm.$router.push({path: '/confirmOrder'});
                }
              });
            } catch (e) {
            }
          }
        }
      } else if(store.weShare == true){
        // alert(store.weShare);
        if (path == '/confirmOrder' && !CheckLogin) {
          $this.$router.push({path: '/login'});
          // alert('to1')
        }
      }
    }

  };
  export default {
    name: 'app',
    watch: {
      '$route': 'fetchData'
    },
    data() {
      return store;
    },
    methods: {
      fetchData() {
        fetchData.apply(this);
      }
    },
    beforeMount(){
      //console.log(this.$router.currentRoute);
    },
    mounted: function () {
      store.vm = this;
      store.weShare = page.WechatShare();//判断是不是分享的
      const query = this.$route.query;
      const openid = cookie.get.call(this, 'openid');
      if (this.$route.fullPath.includes('paySweepCode')) { // 单独处理扫码支付订单业务 add on 2019/01/30
        localStorage.paySweepCodeId = query.id;
      }
      if (!openid) {
        if (!query.hasOwnProperty('openid')) {
          let sitetype = lstore.get_item('sitetype');
          let wx = lstore.get_item('wx');
          if (sitetype) {
            sitetype = sitetype.val;
          }
          if (wx) {
            wx = wx.val;
          }
          if(sitetype != "4" && wx){
            window.location.href = auth;
            return;
          }
        }
      }
      fetchData.apply(this);
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/style.scss";
</style>
