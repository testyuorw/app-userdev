<template>
  <div class="container w100 h100 bgf5">
    <div class="search-mall-header">
      <div class="search-lists">
        <input type="text" class="search-a-list" v-model="search" placeholder="搜索" @blur="searchProduct()">
        <router-link to="/allProduct" class="cancel">取消</router-link>
      </div>
    </div>
    <div class="history-lists">
      <ul class="history">
        <li class="first">搜索历史</li>
        <li class="history-item" v-for="(item,$index) in liston.val">
          <div v-text="item" @click="toProduct(item)"></div>
          <span @click="deleteone($index)">×</span>
        </li>
      </ul>
    </div>
    <!--<div v-show="!show">
      <div class="none-img-box" style="background-color: #fff;">
        <img src="../../assets/images/none.png" alt="啊哦~没有找到哦~">
        <p>暂时没有搜索历史~~ </p>
        <p> 快去预约工友创建订单吧~~~</p>
      </div>
    </div>-->

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
  store.search = '';
  store.liston = [];
  store.lists = [];
  method.searchProduct = function () {
    this.$router.push({
      path: '/detailMall',
      query:{keyword:store.search}
    });
    store.lists.push(store.search);
    lstore.set_item('lists',store.lists);
    store.search = '';
  };
  method.toProduct = function (item) {
    store.search = item;
    this.$router.push({
      path: '/detailMall',
      query:{keyword:store.search}
    });
  };

  method.getlists = function () {
    var lists = lstore.get_item('lists');
    var val = lists.val;
    if(val.length > 9){
      var list = val.slice(val.length-10,val.length-1);
      lstore.set_item('lists',list);
    }
    store.liston = lstore.get_item('lists');
    console.log(store.liston);
  };

  method.deleteone = function (index) {
    var vals = store.liston.val;
    vals.splice(index,1);
    lstore.set_item('lists',vals);
  };

  export default{
    name:'searchMall',
    data(){
      return store
    },
    methods: method,
    mounted(){
      store.user = user.info.apply(this);
      method.getlists();
    }
  }
</script>
