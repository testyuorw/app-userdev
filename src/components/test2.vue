<template>
  <!--<load :show="true"></load>-->
<!--<orderdetail></orderdetail>-->
<!--<div class="fixed-down">-->
  <!--<div class="img-box"><img src="http://dist.zjbird.com/active/icon.png" alt=""></div>-->

<!--</div>-->
  <a href="/#/test">test</a>
  <!--<router-link :to="{ path: '/confirmOrder', query: { link_id:8846,shop_sn:701704}}">立即购买</router-link>-->
</template>

<style lang="css">
  .fixed-down{
    background: rgba(0,0,0,.5);
  }
  .fixed-down .img-box{
    width:30px;
  }
</style>
<script>
// import load from './common/loading/load.vue'
// import orderdetail from './common/orderdetail.vue'
//
// var method = {};
// var store = {};
console.log('test2 load');
  export default{
    name:'test2',
    needLogin:true,
    data() {
      console.log('test2 return data');
      return {};
    },
    // methods: method,
    // components:{
    //   load,
    //   orderdetail
    // },
    mounted(){
      console.log('test2 mounted');
    }
  }
</script>
