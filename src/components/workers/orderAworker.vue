<template>
  <div class="container w100 h100">
    <!--导航栏-->
    <ul class="nav-header  border-b">
      <li class="nav-header-item" @click="tolast()">
        <a href="javascript:void (0);" class="look-all"><i class="icon-arrow-s"></i></a>
      </li>
      <li class="nav-header-item fz16">
        预约详情
      </li>
      <li class="nav-header-item">
      </li>
    </ul>
    <form action="" class="order-a-worker">
      <div class="form-group">
        <label>预约服务</label>
        <p @click="getservice" v-text="reqtypename" style="color:#aaa;"></p>
      </div>
      <div class="form-group">
        <label>用户姓名</label>
        <input type="text" placeholder="请填写您的姓名" v-model.trim="form.linkman" maxlength="10">
      </div>
      <div class="form-group">
        <label>手机号码</label>
        <input type="tel" placeholder="请填写您的手机号码" v-model.trim="form.tel" maxlength="11">
      </div>
      <div class="form-group">
        <label>维修地址</label>
        <input type="text" placeholder="请输入您的维修地址" v-model.trim="form.address" maxlength="100" style="width:70%;">
      </div>
      <!--<div class="form-group">-->
        <!--<label>选择工种</label>-->
        <!--<p @click="getWorkType" v-text="worktypename" style="color:#aaa;"></p>-->
      <!--</div>-->
      <div class="form-needs">
        <label>服务需求</label>
        <textarea placeholder="请输入您所要服务的需求详情" class="service-detail" v-model.trim="form.detail" maxlength="200"></textarea>
      </div>
      <div class="btn-group-order">
        <a href="javascript:void(0)" class="btn-order" @click="orderyou()">确定预约</a>
      </div>

    </form>
  </div>
</template>
<script>

  import api from '../../services/api';
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import page from '../page'
  import hook from '../../tools/hook'
  import user from '../../services/userinfo'
  import formError from '../../tools/formerror'
  import lstore from '../../tools/lstore'
  var store = {};
  var method = {};
  store.reqtype = '';//约约服务
  store.reqtypename = '选择服务';
//  store.worktype = '';//选择工种
//  store.worktypename = '选择工种';//选择工种

  store.form = {linkman:'',tel:'',address:'',detail:'',rtype:''};


  method.getservice = function () {
    this.$selectbox.show(
      {'name':'预约服务','ind':true},
      {
        cshow:function (id,name){
          store.form.rtype = id;
          console.log(id);
          store.reqtypename = name;
          console.log(name);
        },
        cb:function () {
          console.log("我点了确定按钮");
        },
        selectData:store.reqtypelists,
      });
  };
//  method.getWorkType = function () {
//    this.$selectbox.show(
//      {'name':'选择工种','ind':true},
//      {
//        cshow:function (id,name){
////          store.form.rtype = id;
//          console.log(id);
//          store.worktypename = name;
//          console.log(name);
//        },
//        cb:function () {
//          console.log("我点了确定按钮");
//        },
//        selectData:store.workerTypeList,
//      });
//  };

  var errorconf = {
    "detail":{
      "required":true,
      "required_tip":"预约内容不能为空"
    },
    "linkman":{
      "required":true,
      "required_tip":"联系人不能为空"
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
  method.orderyou = function () {
    var self = this;
    var SubmitOk = formError.createErrorTip.call(this, store.form, errorconf);
    if (!SubmitOk) {
      return false;
    }
    api.get_order(store.form).then(function (res) {
        console.log(res);
        if(res.code == 200){
          self.$messagebox.show(
            {'title':'温馨提示','describe':'您已成功预约该工友'},
            {cb:function () {
              self.$router.push({
                path: '/allWorker',
                query:{user_id:store.form.custid}
              });
              this.cancle();
            }, buttonName:['确定']});
          store.form = {linkman:'',tel:'',address:'',detail:''};
          store.reqtypename = '选择服务';
        }

    })
  };

  //  去上一页
  method.tolast = function () {
    var self = this;
    self.$router.push({
      path: store.router,
      query:store.query
    });
  };

  export default {
    name:'orderAworker',
    data(){
        return store
    },
    methods:method,
    mounted:function (){
      var self = this;
      store.user = user.info.apply(this);
      store.form.custid = store.user.user_id;
      store.form.workid = self.$route.query.workid;
      api.get_requtype().then(function (res) {
          console.log(res);
        store.reqtypelists = res.result;
      });
      //   请求工种筛选接口
//      api.get_workerType().then(function (res) {
//        if (error.success == res.code) {
//          store.workerTypeList = res.result;
//          console.log(store.workerTypeList);
//        }
//      });


      //    取路由和参数
      store.router = lstore.get_item('router').val;
      store.query = lstore.get_item('query').val;
    }
  }
</script>

\
