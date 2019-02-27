<template>
  <!--<load :show="true"></load>-->
<!--<orderdetail></orderdetail>-->
<!--<div class="fixed-down">-->
  <!--<div class="img-box"><img src="http://dist.zjbird.com/active/icon.png" alt=""></div>-->

<!--</div>-->
  <a href="/#/test2">test2</a>
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
console.log('test1 load');
  export default{
    name:'test1',
   
    data() {
      console.log('test1 return data');
      return {};
    },
    // methods: method,
    // components:{
    //   load,
    //   orderdetail
    // },
    mounted(){
      console.log('test1 mounted');
    }
  }
</script>
