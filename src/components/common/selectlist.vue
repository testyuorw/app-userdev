<template>
  <div class="selectlists-box-bg">
    <div class="select-first">
      <span @click="cancle">取消</span>
      <span>{{select.name}}</span>
      <span @click="sure">确认</span>
    </div>
    <ul class="selectlists-box-lists">
      <li v-for="(list,index) in options.selectData"  v-text="list.name" @click="show(list.id,list.name)" :class="[select.ind?'main-color':'on']"></li>
    </ul>
  </div>

</template>
<style lang="scss">
  .selectlists-box-bg{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(50,50,50,0.5);
    z-index: 9999;
  }
  .selectlists-box-lists{
    position: absolute;
    bottom:0;
    left: 0;
    background-color: #fff;
    width: 100%;
    overflow-y: auto;
    height: 20rem;
    li{
      line-height: 4rem;
      padding:0 2%;
      font-size: 1.6rem;
      color: #999;
    }
    li:not(:first-child){
      border-top:1px solid #f8f8f8;
    }
  }
  .select-first{
    background-color: #f7f7f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 20rem;
    left: 0;
    width: 100%;
    line-height: 4rem;
    font-size: 1.6rem;
    padding: 0 2%;
  }
  .selecton{
    color:orange !important;
  }
</style>
<script>
  var store = {};
  store.isSelect = false;
//  store.ind = '';//给选择项加背景色
  export default{
      data(){
          return {
            select:{
              name:'',
              ind:false
            },
            options:{
              selectData:[],
              cb:function () {},
              cshow:function (id,name) {}
            },
            store
          }
      },
      methods:{
          cancle(){
              this.$selectbox['cancle']();
            },
          sure(){
              this.$selectbox['sure']();
          },
          show(id,name){
            this.$selectbox['look'](id,name);
          }
    }
  }
</script>
