<template>
<div class="g-right-nav  pl60 flex-ac mb30">
  <div class="g-right-nav-location">
    <span class="fz14 t-location">位置</span>
    <span class="fz14 t-location-text lh14" v-text="title"></span>
  </div>
  <div class="flex-ac flex-right pr">
    <img :src="userinfo.avator" class="g-profile-small" v-if="userinfo.avator">
    <img src="../../assets/images/icon/profile.png" v-if="!userinfo.avator">
    <span class="font-12 bold ml10" v-text="'你好，'+userinfo.nickname"></span>
    <a href="javascript:void(0);" v-on:click="ChildMenu=!ChildMenu" class="icon-arrow-down"></a>
    <ul class="g-right-nav-options" v-bind:class="{hide:!ChildMenu,show:ChildMenu}">
      <li><a class="font-12 main-color" href="#/settings">账号设置</a></li>
      <li><a class="font-12 main-color" v-on:click="logout()" href="javascript:void(0);">退出</a></li>
    </ul>
  </div>
</div>
</template>
<script>
  import userinfo from '../../services/userinfo'
  import pageService from '../../services/pageServ'
  var store = {};
  store.userinfo='';
  store.ChildMenu = false;
  store.title = '';
  var method = {};
  method.logout = function () {
      userinfo.logout.apply(this);
      this.$router.push({path: '/login'})
  };
  export default{
      name:"top",
      methods:method,
      data:function () {
        return store;
      },
      computed:{
        '$route':function () {
          this.ChildMenu = false;
        }
      },
      mounted(){
        this.ChildMenu = false;
         setTimeout(function () {
           store.title = pageService.title;
         },500);
        store.userinfo = userinfo.info.apply(this);
      }
  }
</script>
