<template>
  <div class="form-group validate">
    <input type="text" class="user-input user-validate" name="code" v-model.trim="formData.code" placeholder="验证码">
    <a @click="getCode(formData)"  :disabled="!show" >
      <span v-show="show" class="get-verification bgo">获取验证码</span>
      <span v-show="!show" class="get-verification bg6">{{count}}s后重新获取</span>
    </a>
  </div>
</template>
<script>
  export default{
    name: 'phone',
    data(){
      return {
        formData: {
          phone: '',
          code: '',
        },
        show: true,
        count: '',
        timer: null,
      }
    },
    methods: {
      getCode(formData){
        if (!this.timer) {
          this.count = 60;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= 60) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      }

    }
  }
</script>
