<template>
  <div class="container w100 bgf5 h100">
    <form action="" class="pt10">
      <div class="user-info login-once">
        <div class="form-group">
          <label>姓名</label>
          <input type="text" placeholder="请填写真实姓名" v-model="form.name" maxlength="12">
        </div>
        <div class="form-group">
          <label>性别</label>
          <div class="sex">
            <a href="javascript:void (0)" class="user-sex" v-bind:class="{ userBtnIn : male,userBtnOff : !male }" @click="isMale()">男</a>
            <a href="javascript:void (0)" class="user-sex" v-bind:class="{ userBtnIn : female,userBtnOff : !female }" @click="isFemale()">女</a>
          </div>
        </div>
        <div class="form-group">
          <label>地址</label>
          <div @click="toggle()" class="flex-ajc">
            <p  v-text="message" class="c9"></p>
            <i class="icon-arrow"></i>
          </div>
          <city @areas="getareas" @select="closearea" v-show="ok"></city>
        </div>
        <div class="form-group">
          <textarea class="pl10 address" placeholder="请填写详细地址，不少于5个字" v-model="form.address" maxlength="100" minlength="5"></textarea>
        </div>
      </div>
      <div class="btn-group-order">
        <a href="javascript:void(0)" class="btn-login w100" @click="start()">确定</a>
      </div>
    </form>
  </div>

</template>

<script>
  import city from './common/city.vue'
  import api from '../services/api';
  import error from '../services/error'
  import cookie from '../tools/cookie'
  import formError from '../tools/formerror'
  import page from './page'
  import hook from '../tools/hook'
  import user from '../services/userinfo';
  import lstore from '../tools/lstore';
  var method = {};
  var store = {};
  store.ok = false;
  store.isLessFive = '';

  store.male = false;
  store.female = false;
  store.message = "请选择地址";

  store.form ={name:'',address:''};


//获取省市区id,name
method.getareas = function (p,pname,c,cname,a,aname) {
  store.message =  pname+" "+ cname+" "+ aname;
  store.form.province = p;
  store.form.city = c;
  store.form.area = a;
};
  method.toggle =function () {
    store.ok = true;
  };
  method.closearea = function () {
    store.ok = false;
  };

//  获取是男是女
  method.isMale =function () {
    store.male = !store.male;
    store.form.sex = 1;
    store.female = false;
    console.log(store.form);
  };
  method.isFemale = function () {
    store.female = !store.female;
    store.form.sex = 2;
    console.log(store.form);
    store.male = false;
  };
  var errorconf = {
    "name":{
      "required":true,
      "required_tip":"姓名不能为空"
    },
    "sex":{
      "required":true,
      "required_tip":"性别不能为空"
    },
    "province":{
      "required":true,
      "required_tip":"请选择省市区"
    },
    "address":{
      "required":true,
      "required_tip":"地址不能为空"
    }
  };

  method.isLessFive = function () {//少于5个字
    if(store.form.address.length <5){
      store.vm.$toast("不能少于5个字", 'center');
      store.isLessFive = false;
    }else if(store.form.address.length >=5){
      store.isLessFive = true;
    }
  };

  method.start = function () {

    var self = this;
    var Submit = formError.createErrorTip.call(this, store.form, errorconf);
    method.isLessFive();
    var SubmitOk = Submit && store.isLessFive;
    if (!SubmitOk) {
      return false;
    }
    store.form.user_id = store.user.user_id;
    api.perfect(store.form).then(function (response) {
      if(response.code == 200){
        if(store.sitetype == 1){
          self.$router.push({
            path: '/'
          });
        }else if(store.sitetype == 2){
          self.$router.push({
            path: '/manyOrders'
          });
        }else if(store.sitetype == 4){
          self.$router.push({
            path: '/workerDetail',
            query:{workid:store.workid}
          });
        }
      }
    })
  };

  export default{
    name:'userInfo',
    data(){
      return store
    },
    methods: method,
    components:{
      city
    },
    mounted(){
        store.vm = this;
      var self = this;
     store.user = user.info.apply(this);
      store.sitetype = lstore.get_item('sitetype').val;
      store.workid = self.$route.query.workid;
      console.log(store.workid);
//      method.getareas();
    }
  }
</script>

