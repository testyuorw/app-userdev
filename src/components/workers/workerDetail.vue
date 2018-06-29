<template>
  <div class="container w100 h100 bgf5">
    <!--导航栏-->
    <ul class="nav-header">
      <li class="nav-header-item" @click="tolast()">
        <p class="look-all"><i class="icon-arrow-s"></i></p>
      </li>
      <li class="nav-header-item fz16">
        工友详情
      </li>
      <li class="nav-header-item">
      </li>
    </ul>
    <!--工友繁忙-->
    <div class="tips-orderlists" v-show="workerdata.busy_status">
      工友繁忙，暂不接单。
    </div>
    <!--工友信息-->
    <div class="user-info-wrap w100">
      <div class="user-info">
        <div class="header flex-ac w100">
          <div class="mr3">
            <img src="../../assets/images/bird.png" alt="">
          </div>
          <p class="white fz12">住建鸟平台认证工程师</p>
        </div>
        <div class="main pr">
          <div>
            <img src="../../assets/images/info-bg.png" alt="">
          </div>
          <div class="pat0 flex-space-between w100 h100 p4">
            <div>
              <img :src="workerdata.avator" alt="无" class="main-headerimg">
            </div>
            <div class="name-num nl2">
              <p v-text="workerdata.name"></p>
              <div class="grade">
                <star-rating  inactive-color="#ccc" active-color="#fff" :rating="workerdata.star" :show-rating="false" :star-size="20" :read-only="true" :increment="0.1"></star-rating>
                <span class="grade-num ml2" v-text="workerdata.star"></span>
              </div>
              <!--<stars :disabled="true" :value.sync="workerdata.star"></stars>-->

            </div>
            <div class="age flex-ajc">
              <img src="../../assets/images/age.png" alt="年龄：">
              <p v-text=" '工龄'+workerdata.workage+'年' "></p>
            </div>
          </div>

        </div>
        <div class="footer">
          <div class="footer-item">
            <div class="left">
              <div>
                <img src="../../assets/images/special.png" >
              </div>
              <p>特长：</p>
            </div>
            <div  class="right" v-if="workerdata.howner_labels.length !== 0">
              <span class="c9" v-for="item in workerdata.howner_labels" v-text="item + '。'"></span>
            </div>
            <div  class="right" v-if="workerdata.howner_labels.length == 0">
              <span class="c9">暂无</span>
            </div>
          </div>
          <div class="footer-item">
            <div class="left">
              <div>
                <img src="../../assets/images/type.png" >
              </div>
              <p>工种：</p>
            </div>
            <div class="right">
              <p class="c9" v-text="workerdata.worker_type" v-if="workerdata.worker_type !== ''"></p>
              <p class="c9" v-else>暂无</p>
            </div>

          </div>
          <div class="footer-item">
            <div class="left">
              <div>
                <img src="../../assets/images/myself.png" >
              </div>
              <p>自我评价：</p>
            </div>
            <div class="right">
              <p class="c9" v-text="workerdata.comment" v-if="workerdata.comment !== ''"></p>
              <p class="c9" v-else>暂无</p>
            </div>

          </div>

        </div>
      </div>
    </div>

    <!--优秀案例和其他案例-->
    <div class="case-wrap">
      <!--头部导航-->
      <div class="case-toggle-title oh-y-a">
        <div class="case-good case" :class="[showcontent ? 'case-on': 'case-off']" @click="showcontent=true">优秀案例</div>
        <div class="case" :class="[!showcontent ? 'case-on': 'case-off']" @click="showcontent=false">其他案例</div>
      </div>
      <div>
        <!--优秀案例-->
        <ul class="all-order" v-show="showcontent">
          <li v-show="!ok">
            <div class="pt4 pb4 w100 flex-ajc">
              <img src="../../assets/images/nocase.png" alt="啊哦~没有找到哦~" style="width: 17%;">
            </div>
          </li>
          <li v-for="item in orderLists" v-show="ok">
            <p class="c6 mt1 mb1 fz15" v-text="item.detail"></p>
            <div class="fix-img" >
              <div class="fix-img-item" v-for="img in item.photos">
                <img :src="img"  @click="openimg(img)">
              </div>
            </div>
            <p v-text="item.created_time" class="c9 fz14"></p>
          </li>
          <li class="nothing"></li>
        </ul>
        <!--其他案例-->
        <ul v-show="!showcontent" class="all-order">
          <li v-show="!ok2">
            <div class="pt4 pb4 w100 flex-ajc">
              <img src="../../assets/images/nocase.png" alt="啊哦~没有找到哦~" style="width: 17%;">
            </div>
          </li>
          <li v-for="item in otherCase" v-show="ok2">
            <p class="c6 mt1 mb1 fz15" style="word-break:break-all;" v-text="item.detail"></p>

            <div class="fix-img">
              <div class="fix-img-item" v-for="img in item.photos">
                <img :src="img" @click="open(img)">
              </div>

            </div>
            <p v-text="item.created_time" class="c9 fz14"></p>
          </li>
          <li class="nothing"></li>
        </ul>
      </div>
    </div>

    <!--底部固定按钮-->
    <div class="btn-group-order">
      <a href="javascript:void(0);" class="obt" @click="canOrder()" v-text="orderOne"></a>
      <a href="javascript:void (0);" class="share obt" @click="open=true">分享</a>
    </div>

    <!--分享页面-->
    <div class="share-page" v-show="open" @click="open =false">
      <div class="share-box pr4">
        <p class="share-title mt50">点击右上角，分享给好友</p>
        <div class="img-box">
          <img src="../../assets/images/hand.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../services/api';
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import page from '../page'
  import hook from '../../tools/hook'
//  import stars from '../common/stars.vue'
  import starRating from '../common/stars/star-rating'
  import user from '../../services/userinfo';
  import lstore from '../../tools/lstore'

  var method = {};
  var store = {};
  store.form = {};
  store.workerdata={};
  store.ok = true;
  store.ok2 = true;
  store.orderLists= {};
  store.otherCase = {};
  store.open = false;
  store.desc = "住建鸟认证工友";

//  store.canorder = false;

  store.isbusy = '';
  store.orderOne = '';
  store.showcontent = true;//显示内容的切换

  method.openimg = function (src) {
    this.$image(src);
  };

  method.getWorkerInfo = function () {
    console.log("我是工友信息");
    var self = this;
    api.workerDetail(store.form).then(function (response) {
      store.workerdata = response.result;
      console.log("worl",store.workerdata);
      store.name =  response.result.name;
      store.isbusy = response.result.busy_status;
      store.orderOne = store.isbusy ? "预约其他工友":"预约他";
      method.weChatShare();
    });


  };
  method.toast =function () {
    var self = this;
    this.$messagebox.show(
      {'title':'温馨提示','describe':'是否立即预约工友'+store.name},
      {cb:function () {
          self.$router.push({
          path: '/orderAworker',
          query:{workid:store.form.user_id,user_id:store.custid}
        });
        this.cancle();
      }, buttonName:['预约','取消']});
  };
  method.canOrder = function () {
    var CheckLogin = user.info.apply(this);
    lstore.set_item('sitetype', 4);
    var self = this;
      if(CheckLogin){//登录了
        try{
          if(store.isbusy == true){
            self.$router.push({
              path: '/allWorker'
            });
          }else if(store.isbusy == false) {
            self.$router.push({
              path: '/orderAworker',
              query: {workid: store.form.worker_id}
            });
          }
        }catch(e){}
      }else if(!CheckLogin){//没登录
          self.$router.push({
            path: '/login',
            query: {workid: store.form.worker_id}
          });
        lstore.set_item('sitetype', 4);
        lstore.set_item('workid', store.form.worker_id);
      }


  };
//优秀案例和其他案例
  method.getOrderList = function () {
//      store.form.offset = store.offset;
    api.historyOrder(store.form).then(function (res) {
//        console.log(res.result.length);
      if(res.result.length == 0){
        store.ok = false;
      }else {
        store.ok = true;
        store.orderLists = res.result;
      }

    })
  };

  method.getOther = function () {
    api.otherCase(store.form).then(function (res) {
//        console.log(res);
      if(res.result.length == 0){
        store.ok2 = false;
      }else {
        store.ok2 = true;
        store.otherCase = res.result;
      }
    })
  };

//  去上一页
  method.tolast = function () {
    var self = this;

    if(store.router == '/workerDetail'){
      self.$router.push({
        path: '/'
      });
    }else {
      self.$router.push({
        path: store.router,
        query:store.query
      });
    }

  };
  //  存路径
  method.saveRouter = function () {
    setTimeout(function () {
      lstore.set_item('router',store.nextRouter);
      lstore.set_item('query',store.nextQuery);
    },1000);
  };

  //微信分享的方法
  method.weChatShare = function () {
    try {
      api.share({url:window.location.href}).then(function (response) {
        const  result = response.result;
        const config = {
          debug: false,
          appId: result['appid'],
          timestamp: result['timestamp'],
          nonceStr: result['nonceStr'],
          signature: result['signature'],
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
        };
        wx.config(config);
        if(store.workerdata.comment != ''){
          store.desc = store.workerdata.comment;
        }
        wx.ready(function () {
          var shareData = {
            title: store.name + '个人档案',
            desc: store.desc,
            link: window.location.href,
            imgUrl: store.workerdata.avator,
            success:function () {
            }
          };
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
        });
        wx.error(function(res){
          console.log(res)
        });
      })
    }catch (e) {
      console.log(e.message);
    }
  };
  export default {
    name:'workerDetail',
    data(){
        return store
    },
    methods:method,
    components:{
      starRating
    },
    mounted:function () {
      var self = this;
      lstore.set_item('sitetype', 4);
      store.weShare = page.WechatShare();
      store.user = user.info.apply(this);
      store.custid = store.user.user_id;
      var workid = self.$route.query.workid;//其他案例和优秀案例要传的工友id
      store.form.worker_id = workid;
      store.form.user_id = self.$route.query.workid;//工友详情接口传的工友id
      var user_id = self.$route.query.custid;
      method.getWorkerInfo();

      page.title('工友详情');
      method.getOrderList();
      method.getOther();
//    取路由和参数
      store.router = lstore.get_item('router').val;
      store.query = lstore.get_item('query').val;
      store.nextRouter = this.$route.path;
      store.nextQuery = this.$route.query;
      method.saveRouter();
      console.log("run");
      // method.weChatShare();//微信分享


    }


  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
