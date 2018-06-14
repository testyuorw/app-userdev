<template>
  <div class="container w100 h100 oh">
    <!--头部导航-->
    <ul class="nav-header">
      <router-link tag="li" to="/settings" class="nav-header-item" >
        <img src="../../assets/images/settings.png" alt="设置">
      </router-link>
      <li class="nav-header-item fz16 mr2">
        全部工友
      </li>
      <router-link tag="li" to="/searchWorker" class="nav-header-item">
        <a class="flex-ajc" style="width: 2rem;">
          <div>
            <img src="../../assets/images/search.png" alt="">
          </div>
        </a>
      </router-link>
    </ul>
    <!--筛选插件-->
    <div class="select" >
      <a href="javascript:void(0)" class="type" @click="workcheck()">{{wtypename}}&nbsp;<i class="icon-arrow-down"></i></a>
      <a href="javascript:void(0)" class="area" @click="areacheck()"><i class="icon-arrow-down mr3"></i>&nbsp;{{cityname}}</a>
      <city v-show="selectArea" @select="closearea" @areas="getareas"></city>
    </div>
    <div style="overflow: hidden;" v-show="lists.length" class="allwork-container">
      <refresh :on-refresh="onRefresh" :on-infinite="onInfinite"  :loadingText="loadingText">
        <ul class="worker-lists">
          <router-link v-for="item in lists" :key="item.id" :to="{ path: '/workerDetail', query: { workid: item.id}}" tag="li" class="list">
           <div class="list-busy" v-show="item.busy_status"></div>
            <div class="flex">
              <div class="flex-ajc flex-column">
                <img :src="item.avator" alt="" class="worker-header">
              </div>
              <div class="worker-info-wrap">
                <div class="info-one">
                  <span class="worker-name" v-text="item.name"></span>
                  <span class="worker-age">工龄：{{item.workages}}年</span>
                </div>
                <div class="info-two">
                  <div class="grade">
                    <!--<stars :disabled="true" :value.sync="item.star"></stars>-->
                    <star-rating :rating="item.star" :show-rating="false" :star-size="20" :read-only="true" :increment="0.1"></star-rating>
                    <span class="grade-num ml2">{{item.star}}分</span>
                  </div>
                  <!--<router-link :to="{path:'/orderAworker',query:{workid: item.id}}" :class="[item.busy_status ? 'order-you-off': 'order-you']">预约</router-link>-->
                </div>
              </div>
            </div>
            <div class="info-three">
              <span class="strong-point">特</span>
              <p class="info-text" v-text="item.intro">空间改造，精通水电，地暖铺设。空间改造，精通水电，地暖铺设。空间改造，精通水电，地暖铺设。</p>
            </div>
          </router-link>
        </ul>
      </refresh>
    </div>

    <div class="none-img-box h100 w100" v-show="!lists.length">
      <img src="../../assets/images/none.png" alt="啊哦~没有找到哦~">
      <p>未找到工友信息，请重新搜索~~~</p>
    </div>
  </div>
</template>

<script>
  import api from '../../services/api';
  import user from '../../services/userinfo'
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import page from '../page'
  import info from '../../tools/info'
  import refresh from '../common/refresh'
  import city from  '../common/city'
//  import stars from '../common/stars.vue'
  import starRating from '../common/stars/star-rating'
  import loadmore from  '../../services/loadmore';
  import lstore from '../../tools/lstore'
  var method = {};
  var store = {};
  store.lists =[];
  store.workername = '';
  store.wtypename = '工种筛选';
  store.cityname = '区域筛选';
  store.n = 2;
  store.loadingText='';
  store.isNone = false;//是否显示空页面
  store.selectArea = false;//显示区域选择
  store.ind = '';
  store.num = 10;
  store.user_id = '';
  store.workid = '';
  var init = function () {
    let city = lstore.get_item('city');
    store.form = {keyword: '', offset: 1, area: '', city: ''};
    if (city) {
      city = city.val;
      store.form.area = city.area;
      store.form.city = city.city;
      store.cityname = city.name;
    }
    let worktype =  lstore.get_item('worktype');
    if (worktype) {
       store.form.worktype = worktype.val.id;
       store.wtypename = worktype.val.name;
    }
  };
  method.areacheck = function () {
    loadmore.clear();
    store.selectArea = true;
  };
  method.closearea = function () {
    store.selectArea = false;
  };
  store.workerType = [];
//  上拉加载下拉刷新
  method.getList = function () {
    api.allworkers(store.form).then(function (response) {
      if (error.success == response.code) {
          if(response.result.length < 10){
            store.loadingText =  '没有更多数据了';
          }else {
            store.loadingText = response.result.length ? '加载中...' : '没有更多数据了';
          }
//        store.loadingText = response.result.length ? '加载中...' : '没有更多数据了';
        store.lists = loadmore.push(response.result,store.form.offset);
      }
    });
  };
  var refreshList = function (done) {
    method.getList();
    if ('function' == typeof  done) {
      done();
    }
  };
  method.onRefresh = function (done) {
    store.form.offset = 1;
    refreshList(done);
  };
  method.onInfinite = function (done) {
    store.form.offset++;
    refreshList(done);
  };

//  method.searchworker = function () {
//    loadmore.clear();
//    store.form.keyword  = store.workername;
//    method.getList();
//  };
  store.ok=true;
  method.workcheck = function () {
    this.$selectbox.show(
        {'name':'工种筛选','ind':true},
        {
          cshow:function (id,name){
             store.worktype = id;
             store.form.worktype = store.worktype;
             lstore.remove('worktype');
             lstore.set_item('worktype',{id:store.worktype,'name':name});
             store.wtypename = name;
          },
          cb:function () {
            store.form.keyword = '';
            api.allworkers(store.form).then(function (response) {
              var res = response.result;
              store.lists = res;
              console.log(res);
            })
          },
          selectData:store.workerType,
        }
        );
  };

method.getareas = function (p,pname,city,cname,area,aname) {
  lstore.remove('city');
  lstore.set_item('city', {'city': city, 'area': area,'name':aname});
  store.form.city = city;
  store.form.area = area;
  store.cityname = aname;
  method.getList();
};

export default {
  name:'allWorker',
  data(){
      return store
  },
  watch: {
    '$route': init
  },
  methods:method,
  components:{
      refresh,city,starRating
  },
  mounted:function () {
    store.keywords = this.$route.query.keyword;

    init();
    store.form.keyword = store.keywords;
    console.log(store.keywords);
    method.getList();
    //   请求工种筛选接口
    api.get_workerType().then(function (res) {
      if (error.success == res.code) {
        store.workerType = res.result;
      }
    });
    store.user = user.info.apply(this);
    lstore.set_item('sitetype',1);
    page.title('工友列表');

//    存入路由和参数
    lstore.set_item('router',this.$route.path);
    lstore.set_item('query',this.$route.query);
  }
}
</script>
