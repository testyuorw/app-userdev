<template>
  <div class="container w100 h100 many-orders bgf5">
    <!--导航栏-->
    <ul class="nav-header">
      <li class="nav-header-item" @click="tolast()">
        <a href="javascript:void (0);" class="look-all"><i class="icon-arrow-s"></i></a>
      </li>
      <li class="nav-header-item fz16">
        设置
      </li>
      <li class="nav-header-item">
      </li>
    </ul>
    <!--内容-->
    <ul class="main-setting mt3">
      <router-link tag="li" to="/aboutus" class="setting-item">
        <p>关于我们</p>
        <p class="look-all"><i class="icon-arrow mr2"></i></p>
      </router-link>
      <li class="setting-item">
        <p>客服电话</p>
        <a :href="phone" class="c9" v-text="servicephone"></a>
      </li>
    </ul>
    <div class="exit w100">
      <a href="javascript:void (0);" class="exit-btn" @click="logOut()">退出登录</a>
    </div>
  </div>
</template>

<script>
  import api from '../services/api'
  import lstore from '../tools/lstore';
  import user from '../services/userinfo'
  import error from '../services/error'
  import cookie from '../tools/cookie'
//  import refresh from 'common/refresh'
//  import loadmore from '../services/loadmore'
  import StatusCode from '../services/StatusCode'
  import page from './page'
  import tool from '../tools/tool'
  var method = {};
  var store = {};
  store.phone = 'tel:';
  store.servicephone = '';
  //  去上一页
  method.tolast = function () {
    var self = this;
      if(store.sitetype == 1){
        self.$router.push({
          path: '/'
        });

      }else if(store.sitetype == 2){
        self.$router.push({
          path: '/manyOrders'
        });
      }
      else {
        self.$router.push({
          path: store.router,
          query:store.query
        });
      }


  };

  //  获取客服电话
  method.servicephone = function () {
    api.service_phone().then(function (res) {
      var result = res.result;
      store.phone = 'tel:'+result.service_phone;
        if (res.code == error.success){
          store.servicephone = result.service_phone;
        }else if(res.code == error.error){
          store.servicephone = '暂无';
        }
    })

  };

//  存路径
  method.saveRouter = function () {
      setTimeout(function () {
        lstore.set_item('router',store.nextRouter);
        lstore.set_item('query',store.nextQuery);
        console.log('a');
      },1000);
  };

//  退出登录
  method.logOut = function () {
      var self = this;

    self.$messagebox.show(
      {'title':'温馨提示','describe':'是否退出登录'},
      {cb:function () {
        cookie.remove.call(self,'zjbird');
        self.$router.push({
          path: '/login'
        });
        this.cancle();
      }, buttonName:['确定','取消']});
  };

  export default {
    name: 'settings',
    data(){
      return store;
    },
    methods: method,
    components: {

    },
    mounted: function () {
      method.servicephone();
      page.title('设置');
      //    取路由和参数
      store.router = lstore.get_item('router').val;
      store.query = lstore.get_item('query').val;

      store.sitetype = lstore.get_item('sitetype').val;
      console.log(store.sitetype);

      store.nextRouter = this.$route.path;
      store.nextQuery = this.$route.query;
      method.saveRouter();


    }
  }
</script>
