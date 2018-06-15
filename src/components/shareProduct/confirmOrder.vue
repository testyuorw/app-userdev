<template>
  <div class="container w100 h100 bgf5">
    <!--表单内容-->
    <form action="" class="share-product">
      <div class="form-group">
        <label class="label-control">收货人:</label>
        <input type="text" class="share-info-text" v-model.trim="userForm.linkman" maxlength="10" placeholder="请填写收货人">
      </div>
      <div class="form-group">
        <label class="label-control">联系方式:</label>
        <input type="tel" class="share-info-text" v-model.trim="userForm.tel" maxlength="11" placeholder="请填写联系方式">
      </div>
      <div class="form-group">
        <label class="label-control">所在地区:</label>
        <div class="share-info-text flex-ajc" @click="areacheck">
          <div class="w100 b-no" :class="(userForm.city =='请选择所在区域') ? 'c9' : 'c3' " v-text="userForm.city" ></div>
          <i class="icon-arrow"  @click="areacheck()"></i>
          <citys v-show="selectArea" @select="closearea" @areas="getareas"></citys>
        </div>

      </div>
      <div class="form-group">
        <label class="label-control">详细地址:</label>
        <textarea cols="30" rows="3" class="share-info-text" v-model.trim="userForm.address" maxlength="100" placeholder="请填写详细地址"></textarea>
      </div>
    </form>

    <!--商品信息-->
    <div class="product-share-box bgf mt3">
      <h3 class="title-detail">商品信息：</h3>
      <div class="share-product-detail bgf5 flex p4 pv3">
        <div class="img-box mr4">
          <img :src="goodsInfoLists.img" alt="">
        </div>
        <div class="content">
          <p class="fz15" v-text="goodsInfoLists.name"></p>
          <p class="darkOrange fz16 mt3" v-text="'¥' + Number(goodsInfoLists.saleprice).toFixed(2)"></p>
        </div>
      </div>
      <div class="buy-shareproduct flex-space-between">
        <p class="fz15">购买数量</p>
        <div class="flex-ac fz15">
          <p class="count" @click="subtract()">－</p>
          <input type="number" oninput="if(value.length>3)value=value.slice(0,3)"  class="show-num" v-model.trim="num">
          <p class="count" @click="add()">＋</p>
         </div>
      </div>
      <div class="count-money pv4">
        <p>合计：<span class="darkOrange">¥{{Number(goodsInfoLists.saleprice * num).toFixed(2)}}</span></p>
        <p class="mr5">共计<span class="darkOrange" v-text="num"></span>件商品</p>
      </div>
    </div>

    <!--立即购买-->
    <a href="javascript:void (0);" class="pf buy-share-btn pv3 bgo" @click="toBuy()" :class="{'disabled': showOne}">立即购买</a>
  </div>

</template>

<script>
  import api from '../../services/api'
  import lstore from '../../tools/lstore';
  // import user from '../../services/userinfo'
  import error from '../../services/error'
  import page from '../page'
  import tool from '../../tools/tool'
  import citys from  '../common/citys'
  import wxpay from '../../tools/pay'
  import formError from '../../tools/formerror'
  import cookie from "../../tools/cookie";

  var method = {};
  var store = {};
  store.form = {};//是否可购买
  store.userForm = {};//用户信息
  store.goodsInfoLists = {};//商品的信息
  store.selectArea = false;//显示区域选择
  store.cookie = '';
  store.share_id = '';//分享人id
  store.openid = '';//opennid

  store.money = '';
  store.showOne = false;

  //初始化信息
  var initInfo = function(){
    store.userForm = {
      linkman:store.shareUser.name,
      tel:store.shareUser.mobile,
      city:store.shareUser.province + store.shareUser.city + store.shareUser.area,
      address:store.shareUser.address
    };
    if(store.shareUser.area == null || store.shareUser.area == ''){
      store.userForm.city = "请选择所在区域";
    }
  };
  store.num = 1;//默认数量

  method.areacheck = function () {
    store.selectArea = true;
  };
  //选择区域
  method.getareas = function (p,pname,city,cname,area,aname) {
    lstore.remove('citys');
    lstore.set_item('citys', {'city': city, 'area': area,'name':aname});
    store.userForm.city = pname + cname + aname;
    store.area = area;

    method.canBuy();
  };
  //关闭区域
  method.closearea = function () {
    this.selectArea = false;
  };
  //按钮减
  method.subtract = function () {
    store.num > 1 ? (store.num--): 1;
  };
  //按钮加
  method.add = function () {
    store.num < 999 ? (store.num++): 999;
  };

  method.diff = function (before,after) {
    if(!before || !after){
      return false;
    }
    const condition = before != after;
    if (condition) {
      store.vm.$messagebox.show(
        {'title':'温馨提示','describe':'您所选择的收货地址有价格变动','describes':'请确认价格后付款'},
        {cb:function () {
            this.cancle();
          }, buttonName:['确定']});
    }
  };

//  该地区商品是否可以购买
  method.canBuy = function () {
    store.form = {
      link_id:store.link_id,
      shop_sn:store.shop_sn,
      type:store.utype,
      id:store.user_id,
      area:store.area,
      share_id:store.share_id,
      share_type:store.share_type
    };
    console.log("confirm",store.form);
    api.share_can_buy(store.form).then(function (res) {
      if (res.code == error.success){
        method.diff(store.goodsInfoLists.saleprice, res.result.saleprice);
        store.goodsInfoLists = res.result;
        store.pid = store.goodsInfoLists.pid;//pid
        store.money = store.goodsInfoLists.saleprice;
        lstore.set_item('needmoney',store.money);

      }

    })
  };

//  点击立即付款
  var errorconf = {
    "city":{
      "required":true,
      "required_tip":"请选择所在地"
    },
    "linkman":{
      "required":true,
      "required_tip":"收货人不能为空"
    },
    "tel":{
      "required":true,
      "required_tip":"手机号不能为空"
    },
    "address":{
      "required":true,
      "required_tip":"地址不能为空"
    }
  };
  method.toBuy = function () {
    var SubmitOk = formError.createErrorTip.call(this, store.userForm, errorconf);
    if(store.userForm.city =='请选择所在区域'){
      store.vm.$toast('请选择所在区域','bottom');
      var SubArea = false;
    }else {
      var SubArea = true;
    }
    if (!SubmitOk || !SubArea) {
      return false;
    }
    method.creat_share_order();
  };


  //生成四种订单
  method.creat_share_order = function(){
    store.showOne = true;//不能一直点
    var params = {
      shop_sn:store.shop_sn,
      link_id:store.link_id,

      share_id:store.share_id,
      share_type:store.share_type,
      buy_user:store.user_id,
      buy_user_type:store.utype,

      name:store.userForm.linkman,
      tel:store.userForm.tel,
      address:store.userForm.city + store.userForm.address,

      pid:store.pid,
      amount:store.num,
      money:store.money,

      area:store.area
    };
    api.creat_share_order(params).then(function (res) {
      if(res.code == error.success){
        store.order_type = res.result.ordertype;
        store.order_sn = res.result.id;
        setTimeout(function () {
          store.showOne = false;
        },3000);

        method.paymoneys();
    }
    })

  };
  //支付
  method.paymoneys = function () {
    console.log("支付的时候",lstore.get_item('openid').val);
    //  支付
    const tradeform = {
      order_type: store.order_type,//订单类型
      need_pay_price: store.money * store.num,
      order_sn: store.order_sn//订单id
    };
    // 获取支付流水
    api.get_trade(tradeform).then(function (res) {
      store.trade_sn = res.result.trade_sn;
      lstore.set_item('trade_sn', store.trade_sn);
      if (store.trade_sn) {
        try {
          const params = {
            'openid': lstore.get_item('openid').val,
            'trade_sn': store.trade_sn,
            'title': '测试',
            'uid': store.user_id,
            'wait_pay_price':store.money * store.num
          };
          api.get_jsapi(params).then(function (res) {
            store.jsapi = JSON.parse(res.result.js);
            var def = wxpay(store.jsapi);
            def.then(function (response) {
              if (response === 'ok') {
                store.vm.$router.push({
                  path: '/paySucc'
                });
              }
            });
          });
        } catch (e) {

        }
      }
    });
  };


export default {
  name: "confirmOrder",
  data() {
    return store
  },
  methods: method,
  beforeMount(){
    store.vm = this;
    store.openid = cookie.get.call(this,'openid');//取openid
  },
  mounted() {
    page.title("确认订单");
    lstore.set_item('sitetype',5);
    // user.login_page = false;
    //存分享的信息
    store.link_id = this.$route.query.link_id;
    store.shop_sn = this.$route.query.shop_sn;
    store.workid = this.$route.query.workid;
    store.custid = this.$route.query.custid;
    store.shareArea = this.$route.query.area;

    //分享链接得到的内容
    store.shareProductInfo = {
      link_id:store.link_id,
      shop_sn:store.shop_sn,
      workid:store.workid,
      custid:store.custid,
      shareArea:store.shareArea
    };
    //存入分享的信息
    if(store.link_id  && store.shop_sn){//商品信息存在的话
      lstore.set_item('shareProductInfo', store.shareProductInfo);
    }
    //判断是否登录
    // if (store.openid){
    //   store.openid = lstore.get_item('openid').val
    // }
    //  查openid



    //取用户信息
    store.shareUser = lstore.get_item("shareUser");
    if (store.shareUser) {
      store.shareUser = lstore.get_item("shareUser").val;

      store.area = store.shareUser.area_id;//页面加载完成时区域id
      store.utype = store.shareUser.sign_type;//页面加载完成时用户类型
      store.user_id = store.shareUser.id;//页面加载完成时用户id

    }

    console.log("shareUser",store.shareUser);
    //取商品信息
    store.goodsInfo = lstore.get_item("shareProductInfo");
    if (store.goodsInfo){
      store.goodsInfo = lstore.get_item("shareProductInfo").val;
      store.link_id = store.goodsInfo.link_id;
      store.shop_sn = store.goodsInfo.shop_sn;

      //存入信息生成订单的时候所要的信息
      store.workid = store.goodsInfo.workid;
      store.custid = store.goodsInfo.custid;
      if(store.workid){
        store.share_id = store.workid;
        store.share_type = 0;
      }else if(store.custid){
        store.share_id = store.custid;
        store.share_type = 1;

        if(store.shareUser.area == ''){
          store.area = store.goodsInfo.shareArea;
        }

      }

    }
    initInfo();//初始化信息

    // store.cookie = cookie.get.call(this,'openid');
    store.cookie = cookie.get.call(this,'zjbird');

    method.canBuy();

    if(store.cookie){
      return false;
    }
    store.vm.$messagebox.show(
      {'title':'温馨提示','describe':'已切换至您所在地区'},
      {cb:function () {
          this.cancle();
        }, buttonName:['确定']});
    //请求商品信息

  },
  components: {
    citys
  },
}
</script>
