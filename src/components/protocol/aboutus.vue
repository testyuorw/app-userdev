<template>
  <div class="container h100">
    <!--导航栏-->
    <ul class="nav-header about-us">
      <li class="nav-header-item" @click="toLast()">
        <p class="look-all"><i class="icon-arrow-s"></i></p>
      </li>
      <li class="nav-header-item fz16">
        关于我们
      </li>
      <li class="nav-header-item">
      </li>
    </ul>

    <!--内容-->
    <div class="about-logo-box">
      <img src="../../assets/images/logos.png" alt="住建鸟" class="logo"/>
    </div>
    <div class="about-content">
      <div class="content-one">
        <p>住建鸟致力于打造材料正品采购及去除中间差价环节的垂直领域平台，我们有别于传统的家装公司，整合线下各渠道资源，力求以服务为核心载体，集合线上与线下供应链为一体化的最优良的用户体验平台。</p>
      </div>
      <div class="content-two">
        <h3>"服务商"+"水电工程师"</h3>
        <p>打造材料正品采购及去除中间差价环节的垂直领域平台：平台激励代理商，使代理商升级为服务商，由服务商驱动工友，让工友服务于用户 。</p>
      </div>
      <div class="content-three">
        <p>成为中国最大的用户与工友直接互动的互联网装修平台。</p>
      </div>
    </div>
    <div class="about-footer">
      <p >地址：上海市黄浦区淮海中路381号中环广场6楼</p>
      <p>住建鸟网络科技（上海）有限公司</p>
    </div>
  </div>
</template>
<script>
  import page from '../page'
  import api from '../../services/api'
  import lstore from '../../tools/lstore';
  import user from '../../services/userinfo'
  import error from '../../services/error'
  var method = {};
  var store = {};

  //  去上一页
  method.toLast = function () {
      console.log('run');
    var self = this;
    self.$router.push({
      path: store.router,
      query:store.query
    });
  };
  export default{
    name: 'aboutus',
    methods:method,
    mounted:function () {
      page.title("关于我们");
      //    取路由和参数
      store.router = lstore.get_item('router').val;
      store.query = lstore.get_item('query').val;
    }
  }
</script>
