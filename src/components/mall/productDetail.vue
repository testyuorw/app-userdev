<template>
  <div class="container w100 h100">
    <div class="detail-product-container border-b">
      <div class="detail-product-img-box w100">
        <!--<wc-swiper autoplay="false">-->
          <!--<wc-slide v-for="item in goodslists.banner">-->
            <!--<img class="w100" :src="item" alt="啊哦~没有找到哦~">-->
          <!--</wc-slide>-->
        <!--</wc-swiper>-->
        <slick ref="slick" :options="opt">
          <a href="javascript:void(0);" class="w100" v-for="item in goodslists.banner"> <img class="w100" :src="item" alt="啊哦~没有找到哦~"></a>
        </slick>
        <div v-show="!goodslists.banner">
          <img class="w100" src="../../assets/images/noheader.png" alt="啊哦~没有找到哦~">
        </div>
      </div>
      <div class="detail-product-title-box">
        <p v-text="goodslists.name"></p>
        <div class="mall-price">
          <span class="mall-price-one" v-text="'¥'+ Number(goodslists.discount_price).toFixed(2)"></span>
          <span class="mall-price-two" v-text="'¥'+ Number(goodslists.original_price).toFixed(2)" v-show="goodslists.discount_price != goodslists.original_price">¥34</span>
        </div>
      </div>
      <ul class="detail-product-default-info">
        <li>
          <p class="c9 first">品牌：</p>
          <p class="two" v-text="goodslists.brand"></p>
        </li>
        <li>
          <p class="c9 first">单位：</p>
          <p class="two" v-text="goodslists.unit"></p>
        </li>
        <li>
          <p class="c9 first">销售规格：</p>
          <p class="two" v-text="goodslists.spec"></p>
        </li>
      </ul>
    </div>
    <div class="detail-product-content">
      <div class="detail-product-stander border-b " v-show="isStander">
        <div class="product-stander-img">
          <img src="../../assets/images/stander.png" alt="">
          <p>规格选择</p>
        </div>
        <div class="product-stander-text" @click="showStander()">
          <div>
            <!--<p>产品规格：</p>-->
            <!--<p>产品尺寸：</p>-->
          </div>
          <span class="icon-arrow"></span>
        </div>
      </div>
      <div class="border-b pro-text">产品详情</div>
      <div class="all-img">
        <div v-html="goodslists.detail"></div>
      </div>
    </div>

    <!--固定在在底部的按钮-->
    <div class="btn-group-orders pf w100">
      <router-link to="/download" class="btn-order-cancel">立即购买</router-link>
      <router-link to="allWorker" href="javascript:void(0);" class="btn-order-detail">立即寻找工友安装</router-link>
    </div>

    <!--规格筛选弹出框-->
    <div class="filter-bg zl flex-ajc"  v-show="showalert">
      <div class="detail-filter-container">
        <div style="padding: 1.5rem;">
          <div class="detail-filter-header">
            <p class="one" v-text="goodslists.name"></p>
            <p class="two" @click="reset()">×</p>
          </div>
          <div class="detail-filter-main-one mb10">
              <h3 >规格：</h3>
              <ul class="one" >
                <li class="one-item" v-for="(item,$index) in goodslists.stockGoods" v-text="item.goodsInfo[0].tabValue" @click="selectStander($index)" :class="[($index == ind) ? 'one-item-on' : 'one-item-default']">红色</li>
              </ul>
          </div>
          <div class="buy-product">
            <p>购买数量</p>
            <div class="click-up-down">
              <span class="down" @click="cutone()">一</span>
              <input type="number" class="num" v-model="num">
              <span class="up" @click="addone()">+</span>
            </div>
          </div>
        </div>

        <div class="go-buy">
          <div class="money">
            <p class="one" v-text=" '¥' + dismoney " v-if="money !== ''">¥999999.00</p>
            <p class="two" v-text=" '¥' + money " v-if="money !== '' && money !== dismoney">¥999999.00</p>
          </div>
          <router-link to="/download" class="btn-buy" :class="[isBuy ? 'btn-buy-on' : 'btn-but-default']">立即购买</router-link>
        </div>
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
  import 'wc-swiper/style.css'
  import {wcSwiper, wcSlide} from 'wc-swiper'
  import slick from 'vue-slick';
  import 'slick-carousel/slick/slick.css';

  var method = {};
  var store = {};
  store.form = {};


  store.show = false;
  store.showalert = false;//弹窗
  store.isStander = '';
  store.dismoney = '';
  store.money = '';
  store.ind = -1;
  store.isBuy = false;

  store.goodslists = [];
  store.num = 1;


  store.opt = {
    slidesToShow: 1,
    arrows:false,
    autoplay:true
  };
//获取商品信息
  method.getGoods = function () {
    api.get_goods(store.form).then(function (res) {
      if(res.code == error.success){
        store.goodslists = res.result;
        var stockGoods = store.goodslists.stockGoods;
          if(stockGoods.length > 1){
            store.isStander = true;
          }else {
            store.isStander = false;
          }
        console.log(store.goodslists);
      }
    })
  };
//  规格选择
  method.showStander = function () {
    store.showalert = true;

  };

//  列表项点击
  method.selectStander = function (index) {
    store.isBuy = true;
    store.ind = index;
    store.stockGoods = store.goodslists.stockGoods;
    store.dismoney = store.stockGoods[index].discount_price;
    store.money = store.stockGoods[index].price;

  };

//  列表项重置
  method.reset = function () {
    store.num = 1;
    store.ind = -1;
    store.isBuy = false;
    store.showalert = false;
    store.dismoney = '';
    store.money = '';
    store.num = 1;
  };

  method.addone = function () {
    if(store.num <= 999){
        store.num++;
    }else {
        store.num = 999;
    }
  };
  method.cutone = function () {
    if(store.num > 1){
      store.num --;
    }else {
      store.num = 1;
    }
  };
  export default{
    name:'productDetail',
    data(){
      return store
    },
    methods: method,
    components:{
      slick
    },
    mounted(){
      store.goodslists = [];
      store.user = user.info.apply(this);
      store.form.shop_sn = this.$route.query.shop_sn;
      store.form.link_id = this.$route.query.link_id;
      method.getGoods();
    }
  }
</script>
