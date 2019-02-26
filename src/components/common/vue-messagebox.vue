<template>
    <section class="messagebox-container" v-bind:style="message.height?'height:' + message.height : ''">
        <div class="messagebox" v-bind:class="[visible?'fade-in':'fade-out']">
          <div class="alert-header">
            <h2 class="alert-header-title">{{message.title}}</h2>
            <span class="alert-header-close" @click="cancle">×</span>
          </div>
          <div class="yzm-box" v-show="showalert">
            <input type="text" placeholder="按右图输入" maxlength="6" v-model.trim="usercode">
            <div class="yzm-img">
              <img :src="options.vimg" @click="times(options)" alt="wait" class="yzm">
            </div>
          </div>
            <div class="describe" v-show="!showalert">
              <p>{{message.describe}}</p>
              <p>{{message.describes}}</p>
            </div>
            <p v-bind:class="[message.showButton?'show':'hide']" class="alert-btn-group">
              <span class="sure" v-bind:style="{color:options.buttonColor[0],background:options.buttonBgcolor[0]}" v-text="options.buttonName[0]" @click="sure" ></span>
              <span class="cancle" v-bind:style="{color:options.buttonColor[1],background:options.buttonBgcolor[1]}" v-text="options.buttonName[1]" @click="cancle" v-if="options.buttonName.length>=2"></span>
            </p>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                message:{
                    title:'',
                    describe:'',
                    describes:'',
                    showButton:'',
                    height:''
                },
                options:{
                    buttonName:[],
                    buttonColor:[],
                    buttonBgcolor:[],
                    bgColor:'',
                    vimg:'',
                    cb:function () {

                    }
                },
                visible:false,
                showalert:false,
                usercode:''
            }
        },
        methods:{
            times:function (src) {
                const time = new Date().getTime();
                if(src.vimg.indexOf('&t=') > -1){
                    src.vimg = src.vimg.substr(0,src.vimg.indexOf('&t='));
                }
                src.vimg = src.vimg + '&t=' + time;
            },
            cancle(){
                this.$messagebox['cancle']();
            },
            sure(){
                this.$messagebox['sure'].apply(this.usercode);
            },
            getimg(){
              this.$messagebox['getimg']();
            }

        }
    }
</script>


<style scoped lang="scss">
  .yzm-box{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    padding:1.4rem 0;
    input {
      width: 40%;
      border-radius: 5px;
      padding-left: 0.5rem;
    }
    .yzm-img{
      width: 40%;
      border:1px solid #f5f5f5;
      border-radius: 5px;
    display:flex;
      .yzm{
        width: 100%;
        border:1px solid #ccc;
        border-radius: 5px;
      }
    }
  }

    @keyframes fade-in{
        0% {
            opacity: 0;
            transform:scale(0.7);
        }
        100% {
            opacity: 1;
            transform:scale(1);
        }
    }
    @keyframes fade-out{
        0% {
            opacity: 1;
            transform:scale(1);
        }
        100% {
            opacity: 0;
            transform:scale(0.7);
        }
    }
    .alert-header{
      background: url("../../assets/images/alert-image.png");
      background-size: 100%;
      width: 100%;
      height: 6rem;
      margin-top: -2rem;
      margin-bottom: 1rem;
      .alert-header-title{
        display: inline-block;
        margin-top: 2rem;
        font-weight: normal;
        font-size: 1.8rem;
        line-height: 4.5rem;
      }
      .alert-header-close{
        font-size: 2rem;
        position: absolute;
        top:0;
        right: 1rem;
      }
    }
    .alert-btn-group{
      padding-bottom:2.4rem;
      .cancle{
        border: 1px solid #ccc;
      }
      span{
        display: inline-block;
        width: 90%;
        /*height: 3rem;*/
        font-size: 1.6rem;
        text-align: center;
        line-height: 3rem;
        border-radius: 4px;
        margin: 0 1rem;
        cursor: pointer;
        &:hover{
           opacity: .8;
         }
      }
    }
    .messagebox-container{
        position: absolute;
        left: 0;
        top:0;
        bottom: 0;
        right: 0;
        z-index: 100000;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.61);
        .messagebox{
            width: 24rem;
            text-align: center;
            background: #fff;
            border-radius: 4px;
            color: #333;
            /*padding: 2rem;*/
            min-height: 13rem;
            .describe{
                text-align: center;
                padding: 1.6rem 0.5rem 2.4rem;
                font-size: 1.6rem;
                color:#666;
            }
            .show{
                /*display: block;*/
                display: flex;
            }
            .hide{
                display: none;
            }


        }
        .fade-in{
            animation-name: fade-in;
            animation-duration:0.3s;
            animation-fill-mode: both;
        }
        .fade-out{
            animation-name: fade-out;
            animation-duration:0.3s;
            animation-fill-mode: both;
        }
    }
</style>



