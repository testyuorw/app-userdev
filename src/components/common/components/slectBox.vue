<template>
  <div class="pd-select-box-bg">
    <div class="pd-select-box">
      <!--<div class="btn-group-city">-->
        <!--<button type="reset" class="btn" @click="toggle()">取消</button>-->
        <!--<button class="btn" @click="toggle()">确定</button>-->
      <!--</div>-->
      <div class="pd-select-box2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * Created by k186 on 2017/5/3.
   * gitHub: https://github.com/k186/iosSelect
   */
  /**
   *  selectItemBox components
   * */

  export default{
    name: 'pdSelectBox',
  }
</script>
