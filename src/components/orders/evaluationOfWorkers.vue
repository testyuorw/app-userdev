<template>
  <div class="container w100 h100  bgf5 pb10">
    <div class="evaluation evaluation-of-workes bgf">
      <h3 class="orange">工友施工评价</h3>
      <div class="evaluation-box p2">
        <p class="tac">{{ratingtext[form.worker_star]}}</p>
        <star-rating :show-rating="false" @rating-selected="setRating" :star-size="30"></star-rating>
        <textarea placeholder="工友是否满足您的施工需求？" v-model.trim="form.worker_content"></textarea>
        <div class="evaluation-tips">
          <p v-for="(item,index) in app" v-text="item.name" @click="evas(item)"  :class="{texton:item.check}">{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="evaluation evaluation-of-zjbird bgf mt5">
      <h3 class="orange">平台评价</h3>
      <div class="evaluation-box p2">
        <p class="tac">{{ratingtext[form.app_star]}}</p>
        <star-rating :show-rating="false" @rating-selected="setRatings" :star-size="30"></star-rating>
        <textarea placeholder="工友是否满足您的施工需求？" v-model.trim="form.app_content"></textarea>
        <div class="evaluation-tips" >
          <p v-for="item in comment" v-text="item.name"  @click="eva(item)"   :class="{texton:item.check}">态度好</p>
        </div>
      </div>
    </div>
    <a class="btn-order btn-evaluation" @click="submiteva()">确定评价</a>

  </div>
</template>

<script>
  import api from '../../services/api';
  import user from '../../services/userinfo'
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import page from '../page'
  import starRating from '../common/stars/star-rating'
  import formError from '../../tools/formerror'

  var method = {};
  var store = {};
  store.ok = false;

  store.comment= '';
  store.app = '';
  store.ratingtext ={1:"非常不满意",2:"不满意",3:"一般",4:"满意",5:"非常满意"};
  store.rating = '';
  store.ratings = '';
  store.appid = [];
  store.commentid = [];
  store.form = {order_id:'',worker_id:'',user_id:'',worker_content:'',app_labels:'',worker_star:'',app_star:''};

  method.setRating = function (rating) {
    store.form.worker_star = rating;
  };
  method.setRatings = function (rating) {
    store.form.app_star = rating;
  };


  method.eva =function (item) {
    store.commentid.push(item.id);
    item.check=!item.check;
    store.form.app_labels = store.commentid;
  };
  method.evas=function (item) {
    store.appid.push(item.id);
    item.check=!item.check;
    store.form.worker_labels = store.appid;
  };
  var errorconf = {
    "worker_content":{
      "required":true,
      "required_tip":"评价内空不能为空"
    }
  };
  method.submiteva = function () {
    var self = this;
    var SubmitOk = formError.createErrorTip.call(this, store.form, errorconf);
    if (!SubmitOk) {
      return false;
    }
    api.comment(store.form).then(function (res) {
      self.$router.push({
        path:'/manyOrders',
        query:{user_id:store.form.user_id}
      })
    })
  };
  export default {
    name:'evaluationOfWorkers',
    data(){
        return store
    },
    methods:method,
    components:{
      starRating
    },
    mounted:function () {
      api.get_laberls().then(function (res) {
          console.log(res);
        res.result.app.forEach(function (item) {
          item.check = false;
        });

        res.result.comment.forEach(function (item) {
          item.check = false;
        });
        store.app = res.result.app;
        store.comment = res.result.comment;
      });
      var self = this;
      store.user = user.info.apply(this);
      store.form.worker_id = self.$route.query.worker_id;
      store.form.user_id = store.user.user_id;
      store.form.order_id = self.$route.query.id;
    }
  }
</script>

