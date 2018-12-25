<template>
  <div class="container h100">
    <div class="login-box w100">
      <div>
        <a href="javascript:void (0);">
          <img src="../../assets/images/login-bg.png" alt="住建鸟-登录" class="login-banner">
        </a>
      </div>

      <form class="login">
        <div class="form-group mb20">
          <input type="tel" v-model="form.mobile" placeholder="手机号" class="user-input user-phone" maxlength="11">
        </div>
        <div class="form-group validate">
          <input type="text" class="user-input user-validate" v-model.trim="form.code" placeholder="请输入验证码" maxlength="6">
          <a @click="getCode()" :disabled="count<60" class="get-verification" v-text="verify_text" :class="showCode ? 'bg6' : 'bgo' "></a>
        </div>
        <div class="form-group mt200">
          <a href="javascript:void(0)" class="btn-login" @click="login">1立即登录</a>
          <div class="agree">
            <router-link to="/userProtocol" class="agree-protocol">注册/登录即代表同意《住建鸟用户使用协议》</router-link>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>
<script>
  import api from '../../services/api';
  import error from '../../services/error'
  import cookie from '../../tools/cookie'
  import page from '../page'
  import hook from '../../tools/hook'
  import info from '../../tools/info'
  import lstore from '../../tools/lstore';
  import formError from '../../tools/formerror'
  import apiUrl from '../../conf/api'
  var method = {};
  var store = {};
  const verifyText = {'true': 's后重新获取', 'false': '获取验证码'};
  store.form = {mobile: '', code: ''};
  const verifyCodeGetTime = 60;
  store.count = verifyCodeGetTime;
  store.timer = null;
  store.checked = true;
  store.verify_text = '获取验证码';
  store.showCode = false;


  //  获取验证码
  var  ResetGetVerifyCode = function () {
    store.count = verifyCodeGetTime;
    clearInterval(store.timer);
    store.verify_text = verifyText['false'];
    store.showCode = false;
  };
  const verifyCodeHandle = function (response) {
    store.timer = setInterval(function () {
      if (store.count > 0 && store.count <= verifyCodeGetTime) {
        store.count--;
        store.verify_text = store.count + verifyText['true'];
        store.showCode = true;
      } else {
          ResetGetVerifyCode();
      }
    }, 1000);
    this.$toast(response.msg, 'bottom');
  };
  method.getCode = function () {

    var phone = {mobile: store.form.mobile,captcha:store.form.code};
    var errorconf = {
      "mobile": {
        "required": true,
        "required_tip": "手机号不能为空"
      }
    };
    var SubmitOk = formError.createErrorTip.call(this, store.form, errorconf);
    if (!SubmitOk) {
      return false;
    }
store.img = apiUrl + "/api/imgCode?mobile=" + store.form.mobile;
  ResetGetVerifyCode();

  var callback = function(code) {
    var phone = { mobile: store.form.mobile, captcha: code };
    var promise = api.get_phone(phone);
    var self = this;
    promise.then(function(response) {
      self.cancle();
      if (response.code == error.success) {
        //正常出现验证
        verifyCodeHandle.call($this, response);
      }else{
        store.vm.$toast(response.msg,'bottom');
      }
    });
  };
  this.$messagebox.show(
    { title: "验证码" },
    { cb: callback, buttonName: ["确定"], showalert: true, vimg: store.img }
  );
    // var promise = api.get_phone(phone);
    // let $this = this;
    // store.showbox = '';
    // promise.then(function (response) {
    //     var rescode = error.hour_status;
    //   if (rescode == error.success) {//正常出现验证
    //     verifyCodeHandle.call($this, response);
    //   }
    //   else if (rescode == error.hour_status) {//一小时验证超过上限，出验证码弹出框
    //     store.img = apiUrl + '/api/imgCode?mobile=' + store.form.mobile;
    //     ResetGetVerifyCode();
    //     var callback = function (code) {
    //       console.log("点击确定要验证验证码是否正确");
    //       var self = this;
    //       store.usercode = code;
    //       store.code = {uuid:store.uuid,mobile:store.form.mobile,captcha:store.usercode};
    //       console.log(store.code);
    //       api.captcha_check(store.code).then(function (res) {
    //         if(res.code == error.success){
    //           self.cancle();
    //           verifyCodeHandle.call($this, response);
    //         }else if(res.code == error.error){
    //           $this.$toast(res.msg,'bottom');
    //         }
    //       });
    //     };
    //     $this.$messagebox.show(
    //       {'title': '验证码'},
    //       {cb: callback, buttonName: ['确定'], showalert: true, vimg: store.img});
    //   }
    //   else if (rescode == error.day_status) {//一天验证超过上限
    //     $this.$toast('获取验证码次数已达上限', 'bottom');
    //   }
    // });
  };
  //点击登录按钮
  method.login = function () {
    cookie.remove.call(this, 'ShareLoginPage');
    // var url = {'true': '/userInfo?workid='+store.workid, 'false': {1: '/allWorker', 2: '/manyOrders',3:'/allProduct',4:'workerDetail/?workid='+store.workid}};
    const self = this;
    var errorconf = {
      "mobile": {
        "required": true,
        "required_tip": "手机号不能为空"
      },
      "code": {
        "required": true,
        "required_tip": "验证码不能为空"
      }
    };
    var SubmitOk = formError.createErrorTip.call(this, store.form, errorconf);
    if (!SubmitOk) {
      return false;
    }
    //调用登录接口
    api.share_login(store.form).then(function (res) {
      console.log(res);
      var result = res.result;
      if (error.success == res.code) {
        lstore.set_item('shareUser', result);
        //self.$router.push({path: '/confirmOrder'});
      }
      else if(error.error == res.code){
        self.$toast(res.msg, 'bottom');
      }
      cookie.set.call(self, 'sharezjbird', res.result,1);//设置为已登录cookie
    });
  };

  export default{
    name: 'shareLogin',
    data(){
      return store
    },
    mounted(){
      page.title('登录');
      store.openid = cookie.get.call(this, 'openid');//取openid

      store.openids = lstore.get_item('openid');//取openid
      // lstore.remove('ShareLoginPage');
      store.form.openid = store.openid;
      console.log("openid"+ store.openid);
      console.log("openids"+ store.openids);

    },
    methods: method
  }
</script>
