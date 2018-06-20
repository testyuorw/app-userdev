<template>
  <div class="container w100 h100 many-orders bgf5">
    <div class="h100 w100" v-show="orderLists.length !== 0">
      <!--我的订单那块的导航栏，分享出去没有-->
      <ul class="nav-header" v-show="!weShare">
        <router-link tag="li" to="/settings" class="nav-header-item">
          <img src="../../assets/images/settings.png" alt="设置">
        </router-link>
        <li class="nav-header-item fz16 ml4">
          我的订单
        </li>
        <li class="nav-header-item">
          <a class="flex-ajc" @click="servicephone()" :href="phone">
            <div class="mr1">
              <img src="../../assets/images/service-man.png" alt="">
            </div>
            <p>客服</p>
          </a>
        </li>
      </ul>

      <!--订单列表-->
      <div style="overflow: hidden;">
        <refresh :on-refresh="onRefresh" :on-infinite="onInfinite" :class="{top45:!weShare}">
          <ul class="all-orders-box">
            <li class="all-orders-item" v-for="item in orderLists" :class="{mbp:!weShare}">
              <!-- share before start -->
              <div class="one" v-show="!weShare">
                <div><span class="darkOrange">订单编号：</span><span class="c9" v-text="item.id"></span></div>
                <a href="javascript:void(0);" class="btn-orange-share" @click="open=true"
                   v-show="item.showContent">分享</a>
              </div>
              <div class="two" v-show="!weShare">
                <div class="flex-ajc">
                  <p style="margin-right: 1rem;">工友：<span class="c9" v-text="item.worker.name"></span></p>
                  <p class="c9" v-text="item.time.date"></p>
                </div>
                <p v-text="moneyList[item.workstatus]"
                   :class="[(item.workstatus < 1 || item.workstatus == 11 ) ? 'c9' : 'darkOrange']"></p>
              </div>
              <div class="btn-group" v-show="!weShare">
                <a href="javascript:void (0);" class="btn btn-orange" v-show="item.paybtn"
                   @click="go(item.workstatus,item)" v-text="item.statusText"></a>
                <a href="javascript:void (0);" class=" btn cancel" v-show="item.cancelbtn" @click="canOrder(item.id)">取消订单</a>
              </div>
              <!-- share before end -->

              <!-- share after start -->
              <div v-text="item.time.alldate" class="wechatTime" v-show="weShare && item.workstatus>2">2017年01月30日</div>
              <!-- share after end -->
              <div v-show="item.showContent">
                <!--工地详情-->
                <div class="work-area" v-show="item.workstatus > 3" :class="{mt3:!weShare}">
                  <div class="work-title flex-space-between">
                    <p class="darkOrange">工地详情</p>
                    <a href="javascript:void(0);" class="flex-ac" style="margin-right: 1rem;"
                       @click="item.showWork=!item.showWork">
                      <span v-if="item.showWork == true" class="c9">点击收起</span>
                      <span v-else class="c9">点击查看</span>
                      <i class="icon-arrows" :class="[ item.showWork ? 'arrow-up': 'arrow-down']"></i>
                    </a>
                  </div>
                  <!--工地组件-->
                  <div v-if="item.showWork">
                    <orderdetail :order_id="item.id"></orderdetail>
                  </div>
                </div>
                <!--材料详情-->
                <div class="material-details">
                  <div class="material-title flex-space-between">
                    <p class="darkOrange">材料详情</p>
                    <a href="javascript:void(0);" class="flex-ac" style="margin-right: 1rem;"
                       @click="showMaterial(item)">
                      <span v-if="item.showMaterial == true" class="c9">点击收起</span>
                      <span v-else class="c9">点击查看</span>
                      <i class="icon-arrows" :class="[ item.showMaterial ? 'arrow-up': 'arrow-down']"></i>
                    </a>
                  </div>
                  <!--内容区域-->
                  <div v-show="item.showMaterial">
                    <ul class="material-body bgf5 w100">
                      <li class="material-money ">
                        <p>安装费</p>
                        <p v-text=" '¥'+ paydetailList.fee"> ¥200</p>
                      </li>
                      <li class="material">
                        <p>材料清单</p>
                      </li>
                      <li v-for="item in paydetailList.materials">
                        <div>
                          <p v-text="item.name">世丰PPR管冷热水管 白色管材</p>
                          <p class="c9">单价：{{item.price}}元/{{item.measure}}*{{item.amount}}</p>
                        </div>
                        <p v-text=" '¥'+ item.mny">¥50</p>
                      </li>
                    </ul>
                    <!--合计-->
                    <div class="total-money">
                      <p>合计:¥{{ (Number(paydetailList.fee) + Number(paydetailList.materialsfee)).toFixed(2) }}</p>
                    </div>
                    <!--未付款-->
                    <div class="payed flex-space-between border-t"
                         v-show="paydetailList.paystatus == 0||paydetailList.paystatus == 1">
                      <p>未付款</p>
                      <div class="flex-ac">
                        <p class="c9 mr2" v-show=" paydetailList.paystatus == 1">*70%</p>
                        <p v-show="paydetailList.paystatus == 1">合计：¥{{(Number(paydetailList.feepay70) +
                          Number(paydetailList.materialsfee70)).toFixed(2) }}</p>
                        <p v-show="paydetailList.paystatus == 0">合计：¥{{(Number(paydetailList.fee) +
                          Number(paydetailList.materialsfee)).toFixed(2) }}</p>
                      </div>
                    </div>
                    <!--已付款-->
                    <div class="payed flex-space-between border-t"
                         v-show="paydetailList.paystatus == 1||paydetailList.paystatus == 2">
                      <p v-show="paydetailList.paystatus == 1">已付款</p>
                      <p v-show="paydetailList.paystatus == 2">已结清</p>
                      <div class="flex-ac">
                        <p class="c9 mr2" v-show="paydetailList.paystatus == 1">*30%</p>
                        <p v-show="paydetailList.paystatus == 1">合计：¥{{(Number(paydetailList.feepay30) +
                          Number(paydetailList.materialsfee30)).toFixed(2) }}</p>
                        <p v-show="paydetailList.paystatus == 2">合计：¥{{(Number(paydetailList.fee) +
                          Number(paydetailList.materialsfee)).toFixed(2) }}</p>
                      </div>
                    </div>
                  </div>

                </div>
                <!--我的评价-->
                <div class="my-comment border-t" v-show="item.workstatus == 11">
                  <p class="my-comment-title">我的评价</p>
                  <div class="comment-star">
                    <p class="c9" v-text="item.comment" v-if="item.comment != ''"></p>
                    <p class="c9" v-else>暂无</p>
                    <div class="flex-ac mt2">
                      <p class="c9" v-text="item.comment_time.date"></p>
                      <div class="ml3">
                        <star-rating :rating="item.comment_star" :show-rating="false" :star-size="20" :read-only="true"
                                     :increment="0.1"></star-rating>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </refresh>
      </div>
    </div>

    <!--没有数据的时候显示的-->
    <div class="none-img-box h100 w100" v-show="orderLists.length == 0">
      <!--我的订单那块的导航栏，分享出去没有-->
      <ul class="nav-header pat0" v-show="!weShare">
        <router-link tag="li" to="/settings" class="nav-header-item">
          <img src="../../assets/images/settings.png" alt="设置" style="margin-bottom: 0;">
        </router-link>
        <li class="nav-header-item fz16 ml4">
          我的订单
        </li>
        <li class="nav-header-item">
          <a class="flex-ajc" @click="servicephone()" :href="phone">
            <div class="mr1">
              <img src="../../assets/images/service-man.png" alt="" style="margin-bottom: 0;">
            </div>
            <p>客服</p>
          </a>
        </li>
      </ul>

      <img src="../../assets/images/none.png" alt="啊哦~没有找到哦~">
      <p>您还没有订单哦 </p>
      <p> 快去预约工友</p>
      <!--预约工友按钮-->
      <div class="pf w100">
        <router-link class="btn-order w100" :to="{path:'/allWorker',query:{user_id:form.custid}}">预约工友</router-link>
      </div>
    </div>
    <!--预约工友按钮-->
    <div class="pf w100" v-if="weShare">
      <router-link class="btn-order w100" :to="{path:'/allWorker',query:{user_id:form.custid}}">预约工友</router-link>
    </div>
    <!--分享页面-->
    <div class="share-page" v-show="open" @click="open =false">
      <div class="share-box pr4">
        <p class="share-title">点击右上角，分享给好友</p>
        <div class="img-box">
          <img src="../../assets/images/hand.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../services/api'
  import lstore from '../../tools/lstore';
  import user from '../../services/userinfo'
  import error from '../../services/error'
  import refresh from '../common/refresh'
  import loadmore from '../../services/loadmore'
  import StatusCode from '../../services/StatusCode'
  import page from '../page'
  import tool from '../../tools/tool'
  import orderdetail from '../common/orderdetail.vue'
  import starRating from '../common/stars/star-rating'
  import wxpay from '../../tools/pay'

  var method = {};
  var store = {};
  store.open = false;//分享的
  store.weShare = '';
  store.phone = '';

  store.orderLists = {};
  store.paydetailList = {};
  store.money = '';
  store.moneyList = StatusCode.order;
  //  store.wechat_share = false;
  store.form = {};
  store.payform = {};
  store.orderId = '';


  var init = function () {
    store.form = {custid: '', offset: 1};
  };

  //  取消订单，只有3状态会显示按钮
  method.canOrder = function (oid) {
    var self = this;
    //获取原因
    api.cancel_reson({use: 'howner_service'}).then(function (res) {
      store.cancel_id = res.result[0].id;
    });

    this.$messagebox.show(
      {'title': '温馨提示', 'describe': '是否取消订单'},
      {
        cb: function () {
          api.cancelorder({id: oid, custid: store.form.custid, cancel_id: store.cancel_id}).then(function (res) {
            if (res.code == error.success) {
              self.$router.push({path: '/manyOrders'});
            }
          });
          method.getList();
          this.cancle();
        }, buttonName: ['是', '否']
      });
  };


  //  黄色的那个按钮，各种状态
  var comment = function (all) {
    let self = this;
    self.$router.push({
      path: '/evaluationOfWorkers',
      query: {id: all.id, worker_id: all.workid}
    })
  };
  var confirm = function (all) {
    var self = this;
    const params = {
      'id': all.id,
      'custid': store.user.user_id
    };
    self.$messagebox.show(
      {'title': '温馨提示', 'describe': '您的工地是否已经完工?'},
      {
        cb: function () {
          api.order_confirm(params).then(function (response) {
            if (error.success == response.code) {
              method.getList();
            }
          });
          this.cancle();
        }, buttonName: ['确定', '取消']
      });

  };
  var paymoney = function (all) {
    var self = this;
    if (all.paytype == 0) {//全额付款
      store.money = parseFloat(all.fee) + parseFloat(all.materialsfee);
    }
    else if (all.paytype == 1) {//分两次付款
      if (all.paystatus == 0) {//没付钱
        store.money = parseFloat(all.feepay30) + parseFloat(all.materialsfee30);
      } else if (all.paystatus == 1) {//付了一部分
        store.money = parseFloat(all.feepay70) + parseFloat(all.materialsfee70);
      }
    }
    //  获取交易编号
    var then = method.getpayorder(all.id);
    then.then(function () {
      const tradeform = {
        order_type: store.ordertype,
        need_pay_price: store.money,
        order_sn: all.id
      };
      api.get_trade(tradeform).then(function (res) {
        store.trade_sn = res.result.trade_sn;
        lstore.set_item('trade_sn', store.trade_sn);
        if (store.trade_sn) {
          try {
            const params = {
              'openid': tool.get.call(store.vm, 'openid'),
              'trade_sn': store.trade_sn,
              'title': '测试',
              'uid': store.user.user_id,
              'wait_pay_price': store.money
            };
            api.get_jsapi(params).then(function (response) {
              store.jsapi = JSON.parse(response.result.js);
              var def = wxpay(store.jsapi);
              def.then(function (response) {
                console.log(response);
                if (response === 'ok') {
                  self.$router.push({
                    path: '/manyOrders'
                  });
                }
              });
            });
          } catch (e) {
            console.log(e.message)
          }
        }
      });

    });
  };
  //各种状态对应的方法
  var TaskHandleCallback = {};
  TaskHandleCallback[3] = function (item) {
    item.showContent = true;
    item.paybtn = true;
    item.cancelbtn = true;
    item.statusText = '立即付款';
//      paymoney();
  };
  TaskHandleCallback[7] = function (item) {
    var PayCondition = {};
    PayCondition[1] = function (item) {
      item.statusText = '立即付款';
      item.paybtn = true;
//      paymoney();
    };
    PayCondition[2] = function (item) {
      item.paybtn = false;
    };
    var PayStatus = item.paystatus;
    if (PayCondition.hasOwnProperty(PayStatus)) {
      PayCondition[PayStatus](item);
    }
    item.showContent = true;
  };
  TaskHandleCallback[8] = function (item) {
    item.showContent = true;
  };
  TaskHandleCallback[9] = function (item) {
    item.showContent = true;
    item.paybtn = true;
    item.statusText = '确认完工';
  };
  TaskHandleCallback[10] = function (item) {
    item.showContent = true;
    item.paybtn = true;
    item.statusText = '立即评价';
  };
  TaskHandleCallback[11] = function (item) {
    item.showContent = true;
  };

  //  默认的一些设置
  var TaskBtnHandle = function (item) {
    item.showContent = false;//材料详情和工地详情
    item.paybtn = false;
    item.cancelbtn = false;
    var WorkStatus = item.workstatus;
    if (TaskHandleCallback.hasOwnProperty(WorkStatus)) {
      TaskHandleCallback[WorkStatus].call(this, item);
    }
  };

  var task = {
    11: TaskBtnHandle,
    10: comment,
    9: confirm,
    8: TaskBtnHandle,
    7: paymoney,
    3: paymoney,
  };
  var BtnTask = {
    11: TaskBtnHandle,
    10: TaskBtnHandle,
    9: TaskBtnHandle,
    8: TaskBtnHandle,
    7: TaskBtnHandle,
    3: TaskBtnHandle

  };
  //黄色按钮显示的方法
  method.go = function (workerstatus, oid) {
    if (task.hasOwnProperty(workerstatus)) {
      task[workerstatus].call(this, oid);
    }
  };
  //  各种订单状态的显示，及方法
  method.allStatus = function (list) {
    list.forEach(function (item) {
      var WorkStatus = item.workstatus;
      if (WorkStatus < 3) {
        TaskBtnHandle.call(store.vm, item);
      }
      if (BtnTask.hasOwnProperty(WorkStatus)) {
        BtnTask[WorkStatus].call(store.vm, item);
      }
    })
  };
  store.showDefault = false;
  //  获取数据
  method.getList = function () {
    api.get_orderlists(store.form).then(function (response) {
//      store.workerid = response.result.workid;
//      store.order_sn = response.result.id;
      if (response.code == error.success) {
//          控制点击收起
        response.result.forEach(function (item) {
          if (item.worker == null) {
            item.worker = {name: '无'}
          }
          item.showWork = false;
          item.showMaterial = false;
          if (!store.showDefault && item.workstatus > 3) {
            item.showWork = true;
            store.showDefault = true;
          }
          item.showContent = false;//材料详情和工地详情
          item.paybtn = false;
          item.cancelbtn = false;
          item.statusText = '';//黄色按钮显示的文字
        });
        method.allStatus(response.result);
        response.result.forEach(function (item) {
          var date = formartDate(item.created_at);
          if (item.commentTime) {
            var commentTime = formartDate(item.commentTime);
            item.comment_time = commentTime;
          } else {
            item.comment_time = '';
          }
          item.time = date;
        });

        store.orderLists = loadmore.push(response.result, store.form.offset);
      }
    });
  };

  //  付款订单信息（一次付款和二次付款）
  method.getpayorder = function (orderid) {
    return api.get_orderdetail({id: orderid}).then(function (res) {
      if (res.code == error.success) {
        store.paydetailList = res.result;
        store.ordertype = res.result.ordertype;
      }
      return res;
    });
  };
  //材料详情点击展示
  method.showMaterial = function (item) {
    item.showMaterial = !item.showMaterial;
    if (item.showMaterial == true) {
      method.getpayorder(item.id);
    }
  };
  //  method.showWorkerArea = function (id) {
  //    store.orderId = id;
  //  };

  //  格式化时间
  function formartDate(time) {
    try {
      if (time) {
        time = time.replace(/-/g, '/');
      }
      let formart = new Date(time || 0);
      formart.date = formart.getFullYear() + '-' + (formart.getMonth() + 1) + '-' + formart.getDate();
      formart.alldate = formart.getFullYear() + '年' + (formart.getMonth() + 1) + '月' + formart.getDate() + '日';
      formart.time = formart.getHours() + ':' + formart.getMinutes();
      return formart;
    } catch (e) {

    }
    return {date: '', time: '', alldate: ''}
  }

  //  刷新
  method.onRefresh = function (done) {
    store.form.offset = 1;
    method.getList();
    if ('function' == typeof done) {
      done();
    }
  };
  //  上拉
  method.onInfinite = function (done) {
    store.form.offset++;
    method.getList();
    if ('function' == typeof done) {
      done();
    }
  };

  //  获取客服电话
  method.servicephone = function () {
    api.service_phone().then(function (res) {
      var result = res.result;
      store.phone = 'tel:' + result.service_phone;
    })
  };


  export default {
    name: 'allOrders',
    data() {
      return store;
    },
    methods: method,
    watch: {
      '$route': init
    },
    components: {
      refresh, orderdetail, starRating
    },
    mounted: function () {
      store.vm = this;
      init();
      store.weShare = page.WechatShare();

      store.user = user.info.apply(this);
      var custid = store.user.user_id;
      if (store.weShare == false) {//没有分享
        // store.form.custid = 22512;
        store.form.custid = store.user.user_id;
        this.$router.push({query: {custid: custid}});
      } else if (store.weShare == true) {
        store.form.custid = this.$route.query.custid;
      }


      method.getList();
      lstore.set_item('sitetype', 2);
      page.title('我的订单');

      method.servicephone();
    }
  }
</script>
