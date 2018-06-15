<template>
  <div class="container w100 h100 oh">
    <div class="detail-mall-header">
      <div class="search-workers">
        <input type="text" class="search-a-worker" placeholder="材料名称、品牌、型号" v-model="keyword" @blur="searchProduct()">
      </div>
      <div class="search-bar">
        <div class="search-bar-left">
          <a class="search-bar-left-item" @click="composite()" :class="{'search-on':show}">综合</a>
          <a class="search-bar-left-item" @click="priceUpDown()" :class="{'search-on':!show}">价格
            <span class="tra" :class="[price ? 'tra-down' : 'tra-up']" v-show="priceShow"></span>
          </a>
        </div>
        <a class="search-bar-rignt" @click="filters()">
          <span>筛选</span>
          <img src="../../assets/images/sx.png" alt="" style="width: 15%;margin-left: 0.5rem;">
        </a>
      </div>
    </div>
    <!--数据的列表-->
    <div v-show="lists.length" class="oh">
      <refresh :on-refresh="onRefresh" :on-infinite="onInfinite"  :loadingText="loadingText">
        <ul class="mall-products-box">
          <router-link ta="li" class="mall-product-item" v-for="item in lists" :key="item.id" :to="{path:'/productDetail',query:{shop_sn:item.shop_id,link_id:item.link_id}}">
            <div class="mall-img-box">
              <img :src="item.photo" alt="无" v-if="item.photo != ''">
              <img src="../../assets/images/noheader.png" alt="无" v-else>
            </div>
            <div class="mall-products-content">
              <p v-text="item.shop_name"></p>
              <div class="mall-label">
              <!--<div class="mall-label"  v-show="(item.tag.length == 0)? false : true">-->
                <span v-for="child in item.tag" v-text="child.tag_name"></span>
              </div>
              <div class="mall-price">
                <span class="mall-price-one" v-text="'¥'+ Number(item.price).toFixed(2)"></span>
                <span class="mall-price-two"  v-text="'¥'+ Number(item.original_price).toFixed(2)" v-show="item.original_price != item.price"></span>
              </div>
            </div>
          </router-link>
        </ul>
      </refresh>

    </div>


    <!--没有数据的页面-->
    <div class="none-img-box h100" v-show="!lists.length">
      <img src="../../assets/images/none.png" alt="啊哦~没有找到哦~">
      <p>暂时没有该类别的品牌信息~~ </p>
    </div>
    <!--点击筛选弹出的-->
    <div class="filter-bg"  v-show="filter">
      <div class="close" @click="filter = false"></div>
      <div class="filter-wrap">
        <div class="filter-content" v-for="item in filterlists">
          <div class="filter-title">
            <p class="pp" v-text="item.value"></p>
            <p class="all" @click="toggleAll(item)">全部 <span :class="[item.showall ? 'icon-arrow-down' : 'icon-arrow-up']"></span></p>
          </div>
          <ul class="filter-main" :class="{'filter-main-hide' : item.showall }" >
            <li class="filter-main-item" v-for="child in item.options" v-text="child.value" @click="selectOne(child)" :class="[child.check ? 'filter-on' : 'filter-default']"></li>
          </ul>
        </div>
        <!--<div class="filter-content">
          <div class="filter-title">
            <p class="pp">颜色</p>
            <p class="all">全部 <span class="icon-arrow-up"></span></p>
          </div>
          <ul class="filter-main">
            <li class="filter-main-item filter-on">世丰</li>
            <li class="filter-main-item filter-default">世丰世</li>
            <li class="filter-main-item filter-default">世丰世世丰</li>
            <li class="filter-main-item filter-default">世丰世世丰世世丰</li>
          </ul>
        </div>
        <div class="filter-content">
          <div class="filter-title">
            <p class="pp">类型</p>
            <p class="all">全部 <span class="icon-arrow-up"></span></p>
          </div>
          <ul class="filter-main">
            <li class="filter-main-item filter-on">世丰</li>
            <li class="filter-main-item filter-default">世丰世</li>
            <li class="filter-main-item filter-default">世丰世世丰</li>
            <li class="filter-main-item filter-default">世丰世世丰世世丰</li>
          </ul>
        </div>
        <div class="filter-content">
          <div class="filter-title">
            <p class="pp">尺寸</p>
            <p class="all">全部 <span class="icon-arrow-up"></span></p>
          </div>
          <ul class="filter-main">
            <li class="filter-main-item filter-on">世丰</li>
            <li class="filter-main-item filter-default">世丰世</li>
            <li class="filter-main-item filter-default">世丰世世丰</li>
            <li class="filter-main-item filter-default">世丰世世丰世世丰</li>
          </ul>
        </div>-->
      </div>
      <div class="btn-g">
        <a href="javascript:void(0);" class="reset" @click="filters()">重置</a>
        <a href="javascript:void(0);" class="sure" @click="sureFiler()">确定</a>
      </div>
    </div>



  </div>

</template>
<script>
  import api from '../../services/api';
  import user from '../../services/userinfo'
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import info from '../../tools/info'
  import lstore from '../../tools/lstore';
  import refresh from '../common/refresh'
  import loadmore from  '../../services/loadmore';

  var method = {};
  var store = {};
  store.lists = [];
  store.filterlists = [];

  store.show = true;//判断综合还是价格
  store.price = true;//价格是不是上还是下
  store.priceShow = false;//价格颜色及是否出现小三角

  store.isAll = true;//显示全部还是部分
  store.ind = -1;

  store.filter = false;//显示筛选列表么
  store.keyword = '';
  store.keywords = '';

store.cid = '';
  var init = function () {
    store.form = {cid:store.cid,offset:1,keyword:'',brand_id:'',attr_id:''};
  };

//  点击综合
  method.composite = function () {
//    loadmore.clear();
    init();
    store.show = true ;
    store.priceShow = false;
    method.getMall();
  };
//  点击价格
  method.priceUpDown = function () {
    store.show = false ;
    store.priceShow = true;
    store.price = !store.price ;
    loadmore.clear();
    store.form.offset = 1;

    if(store.price == true){
      store.form.sort = 'price_desc';
    }else if(store.price == false){
      store.form.sort = 'price_asc';
    }
    method.getMall();
  };

//  获取列表信息
  method.getMall = function () {
    api.get_mall(store.form).then(function (response) {
//        console.log(response);
      if (error.success == response.code) {
        store.loadingText = response.result.length ? '加载完成' : '没有更多数据了';
        if(response.result.length != 0 ){
          store.lists = loadmore.push(response.result,store.form.offset);
//          console.log(store.lists);
        }
      }
    })
  };

//  上拉加载下拉刷新
  store.loadingText='';
  var refreshList = function (done) {
    method.getMall();
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


//  搜索
  method.searchProduct = function () {
    loadmore.clear();
    store.form.keyword = store.keyword;
    method.getMall();
  };

//  筛选

  store.filterForm = {cid:'',keyword:''};
  method.filters = function () {
    store.filterForm.keyword = store.keywords;
    store.filter = true;
    store.brand_id = [];
    store.attr_id = [];
    api.get_filter(store.filterForm).then(function (response) {
      if(response.code == error.success){
//          给每一项加个判断
        response.result.forEach(function (item) {
//          console.log(item);
          item.showall = false;
          if(item.type == 'brand'){
            item.options.forEach(function (item) {
              item.check = false;
              item.type = 'brand'
            })
          }else if(item.type == 'attr'){
              item.options.forEach(function (item) {
                item.check = false;
                item.type = 'attr'
              })
          }
        });
        store.filterlists = response.result;
      }
    })
  };


//  点击筛选的列表项
  store.brand_id = [];
  store.attr_id = [];
//删除某个元素
  var remove = function (arr, val) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  };
//选择品牌那些
  method.selectOne = function (item) {
    item.check=!item.check;
    if(item.type == 'brand'){
        if(item.check == true){
          store.brand_id.push(item.attr_id);
        }else if(item.check == false){
          remove(store.brand_id,item.attr_id);
      }
    }else if(item.type == 'attr'){
      if(item.check == true){
        store.attr_id.push(item.attr_id);
      }else if(item.check == false){
        remove(store.attr_id,item.attr_id);
      }
    }

  };
  method.toggleAll = function (item) {
    item.showall=!item.showall;
  };
  method.sureFiler = function () {
    store.form.brand_id = store.brand_id.join('_');
    store.form.attr_id = store.attr_id.join('_');
    loadmore.clear();
    store.lists = [];
    method.getMall();
    method.filters();
    store.filter = false;
  };

  export default{
    name:'detailMall',
    data(){
      return store
    },
    methods: method,
    components:{
      refresh
    },
    mounted(){
        init();
      store.lists = [];
      store.user = user.info.apply(this);
      store.cid= this.$route.query.cid;
      store.form.cid = store.cid;
      store.filterForm.cid = this.$route.query.cid;
      store.form.keyword = this.$route.query.keyword;
      store.keywords = this.$route.query.keyword;
      method.getMall();
//      method.filters();
    }
  }
</script>
