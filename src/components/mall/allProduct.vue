<template>
  <div class="container w100 h100 oh">
    <div class="classification-search flex-ac">
      <h3 class="classification-search-text">产品分类</h3>
      <router-link to="/searchMall" class="to-search">
        <img src="../../assets/images/search.png" alt="">
      </router-link>
    </div>
    <div class="w100 h100 all-products">
      <div class="left-mall-wrap oh-y-a">
        <ul class="left-mall">
          <li class="left-mall-item"  v-for="item in list.left_list" v-text="item.title" @click="getLeftId(item.id)" :class="{'mall-item-on': ids== item.id }"></li>
        </ul>
      </div>
      <div class="right-mall-wrap oh-y-a">
        <ul class="right-mall">
          <router-link tag="li" class="right-mall-item" v-for="child in list.right_list" :key="child.id" :to="{ path: '/detailMall', query: { cid: child.id}}">
            <div class="right-mall-img-box">
              <!--<img :src="child.logo" alt="" class="w100">-->
              <img v-if="child.logo !== null && child.logo !== ''" :src="child.logo" class="w100">
              <img v-else src="../../assets/images/noheader.png" alt="" class="w100">
            </div>
            <span class="c9 show1 w100 tac" v-text="child.title"></span>
          </router-link>
        </ul>
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

  var method = {};
  var store = {};

  store.form = {app:'howner',cid:''};
  store.list = {left_list:[],right_list:[]};
  store.productlists = {};
  store.cid = '';

  store.ids = '';
  var set = {0:'left_list',1:'right_list'};
  var cate = 0;
  method.getproduct = function () {
    api.get_products(store.form).then(function (res) {
        console.log(store.list);
      store.list[set[cate]] = res.result;
      cate++;
      if (cate == 2) {
        return false;
      }
     // 页面刚开始加载时子菜单
      var left = store.list[set[0]];
      console.log(left[0].id);
      if(res.result.length){
//        lstore.set_item('id',left[0].id);
        store.form.cid = res.result[0].id;
        method.getproduct();
      }
    })
  };

  method.getLeftId = function (id) {
      console.log("id:"+id);
      lstore.set_item('id',id);
      store.ids = id;
    store.form.cid = store.ids;
    console.log(store.form);
    api.get_products(store.form).then(function (res) {
      store.list[set[1]] = res.result;
    })
  };

  export default{
    name:'allProduct',
    data(){
      return store
    },
    methods: method,
    mounted(){
      store.user = user.info.apply(this);
      lstore.set_item('sitetype',3);
      method.getproduct();
      store.ids = lstore.get_item('id').val;
    }
  }
</script>
