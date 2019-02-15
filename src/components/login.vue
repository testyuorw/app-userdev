<template>
  <div class="container h100">
    <div class="login-box w100" ref="login-box">
      <div>
        <a href="javascript:void (0);">
          <img src="../assets/images/login-bg.png" alt="住建鸟-登录" class="login-banner">
        </a>
      </div>

      <form class="login">
        <div class="form-group mb20">
          <input
            type="text"
            v-model="form.mobile"
            placeholder="手机号"
            class="user-input user-phone"
            maxlength="11"
          >
        </div>
        <div class="form-group validate">
          <input
            type="text"
            class="user-input user-validate"
            v-model.trim="form.code"
            placeholder="请输入验证码"
            maxlength="6"
          >
          <a
            @click="getCode()"
            :disabled="count<60"
            class="get-verification"
            v-text="verify_text"
            :class="showCode ? 'bg6' : 'bgo' "
          ></a>
        </div>
        <div class="form-group mt200">
          <a href="javascript:void(0)" class="btn-login" @click="login">立即登录</a>
          <div class="agree">
            <router-link to="/userProtocol" class="agree-protocol">注册/登录即代表同意《住建鸟用户使用协议》</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import api from "../services/api";
import error from "../services/error";
import cookie from "../tools/cookie";
import page from "./page";
import hook from "../tools/hook";
import info from "../tools/info";
import lstore from "../tools/lstore";
import formError from "../tools/formerror";
import apiUrl from "../conf/api";
var method = {};
var store = {};
const verifyText = { true: "s后重新获取", false: "获取验证码" };
store.form = { mobile: "", code: "" };
const verifyCodeGetTime = 60;
store.count = verifyCodeGetTime;
store.timer = null;
store.checked = true;
store.verify_text = "获取验证码";
store.showCode = false;

//  获取验证码
var ResetGetVerifyCode = function() {
  store.count = verifyCodeGetTime;
  clearInterval(store.timer);
  store.verify_text = verifyText["false"];
  store.showCode = false;
};
const verifyCodeHandle = function(response) {
  store.timer = setInterval(function() {
    if (store.count > 0 && store.count <= verifyCodeGetTime) {
      store.count--;
      store.verify_text = store.count + verifyText["true"];
      store.showCode = true;
    } else {
      ResetGetVerifyCode();
    }
  }, 1000);
  store.vm.$toast(response.msg, "bottom");
};
method.getCode = function() {
  var errorconf = {
    mobile: {
      required: true,
      required_tip: "手机号不能为空"
    }
  };
  var SubmitOk = formError.createErrorTip.call(this, store.form, errorconf);
  if (!SubmitOk) {
    return false;
  }
  store.img = apiUrl + "/api/imgCode?mobile=" + store.form.mobile;
  ResetGetVerifyCode();

  var callback = function(code) {
    if(!code || code.length < 1) {
      store.vm.$toast('请输入图形验证码！','bottom');
      return;
    }
    var phone = { mobile: store.form.mobile, captcha: code };
    var promise = api.get_phone(phone);
    var self = this;
    promise.then(function(response) {
      if (response.code == error.success) {
        //正常出现验证
        verifyCodeHandle.call(self, response);
        self.cancle();
      }else{
        store.vm.$toast(response.msg,'bottom');
        if(response.code != error.error){
          self.cancle();
        }else{
            self.refresh(store.img);
        }
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
  //           verifyCodeHandle.call($this,  response);
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
method.login = function() {
  var url = {
    true: "/userInfo?workid=" + store.workid,
    false: {
      1: "/allWorker",
      2: "/manyOrders",
      3: "/allProduct",
      4: "workerDetail/?workid=" + store.workid,
      6:'/paySweepCode?id=' + localStorage.paySweepCodeId || ''
    }
  };
  // const self = this;
  var errorconf = {
    mobile: {
      required: true,
      required_tip: "手机号不能为空"
    },
    code: {
      required: true,
      required_tip: "验证码不能为空"
    }
  };
  var SubmitOk = formError.createErrorTip.call(this, store.form, errorconf);
  if (!SubmitOk) {
    return false;
  }
  if (store.sitetype == 5) {
    //表示是商品分享的登录接口
    console.log("form", store.form);

    if (lstore.get_item("openid")) {
      store.openid = lstore.get_item("openid").val;
    }
    store.form.openid = store.openid;
    api.share_login(store.form).then(function(res) {
      console.log("share_login");
      console.log(res);
      var result = res.result;
      if (error.success == res.code) {
        lstore.set_item("shareUser", result);
        cookie.set.call(store.vm, "shareUser", result);
        try {
          store.vm.$router.push({ path: "/confirmOrder" });
        } catch (e) {
          console.log(e);
        }
      } else if (error.error == res.code) {
        store.vm.$toast(res.msg, "bottom");
      }
      cookie.set.call(store.vm, "sharezjbird", res.result, 1000); //设置为已登录cookie
    });
  } else {
    api.login(store.form).then(function(response) {
      if (error.success == response.code) {
        let result = response.result;
        const login_once = result.login_once;
        let location_url = url[login_once];
        if ("object" == typeof location_url) {
          location_url = location_url[store.sitetype];
        }
        store.vm.$router.push({
          path: location_url
        });
      } else if (response.code == error.error) {
        store.vm.$toast(response.msg, "bottom");
      }
      cookie.set.call(store.vm, "zjbird", response.result, 3600);
    });
  }
};
var fetchData = function() {
  var fullPath = store.vm.$route.fullPath;
};
export default {
  name: "login",
  data() {
    return store;
  },
  watch: {
    $route: "fetchData"
  },
  mounted() {
   if (store.sitetype.val==6) { // 单独处理扫码支付订单业务 add on 2019/01/30
      this.$router.push({
        path: '/paySweepCode',
        params: {
          id: localStorage.paySweepCodeId || ''
        }
      })
     return
    }
    page.title("登录");

    store.vm = this;
    //判断有没有登录
    store.path = store.vm.$route.path;

    if (lstore.get_item("workid")) {
      store.workid = lstore.get_item("workid").val;
    }
    //微信分享有关的
    store.sitetype = lstore.get_item("sitetype"); //获取是哪一页
    if (!store.sitetype) {
      store.sitetype = store.vm.$route.query.sitetype
        ? store.vm.$route.query.sitetype
        : 1;
    }
    if (store.sitetype) {
      store.sitetype = store.sitetype.val;
    }

    if (lstore.get_item("openid")) {
      store.openid = lstore.get_item("openid").val;
      store.form.openid = store.openid;
      console.log("mounted", store.openid);
      // api.check_openid({openid:store.openid}).then(function (res) {
      //   console.log("checkopenid");
      //   if (!res.result || res.result == null || res.result == 'null') {
      //     return false;
      //   }
      //   if (res.code == error.success) {
      //     console.log("查看openid存在");
      //     lstore.set_item('shareUser', res.result);
      //     store.vm.$router.push({path: '/confirmOrder'});
      //   }
      // });
    }
  },
  methods: method
};
</script>
