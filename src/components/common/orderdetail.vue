<template>
<div>
  <!-- line -->
  <div class="bt b--light-gray mb3"></div>
  <!-- line -->
  <div class="h100 pa2">
    <div class="g-order-time-flow  bl  b--light-gray pl5">
      <!-- finish start -->
      <div class="pb4 mb4 oh bb b--light-gray" v-if="info.workstatus >= code.engine_finish">
        <div class="tc g-time-icon pa">
          <p><img class="dib" :src="icon[current_icon.finish]"></p>
          <p class="font-18 darkOrange ml2" v-text="info.finishTime.date"></p>
          <p class="f3 darkOrange ml2" v-text="info.finishTime.time"></p>
        </div>
        <p class="darkOrange font-18 mb4">施工完成</p>
        <p class="darkOrange font-18 mb3">家装卫士验收完成</p>
      </div>
      <!-- finish end -->
      <!-- image type -->
      <div class="pb4 mb4 oh bb b--light-gray"  v-for="sv in info.eng_imgs" v-if="info.eng_imgs.length">
        <div class="tc g-time-icon pa">
          <p ><img class="dib" :src="icon[sv.icon || current_icon.upload]"></p>
          <p class="font-18 gray ml2" v-text="sv.date"></p>
          <p class="f3 moon-gray ml2" v-text="sv.time"></p>
        </div>
        <p :class="{darkOrange:sv.icon,'near-black':sv.icon}" class="font-18 mb4" v-text="'装修卫士：'+hiddenName(sv.engineer)"></p>
        <p :class="{darkOrange:sv.icon,'gray':sv.icon}" class="gray font-18 mb3">上传图片</p>
        <div>
          <img class="img-order-time-img fl mr2  mb2" :src="item" v-for="item in sv['photos']">
        </div>
      </div>
      <!-- image type end -->
      <!-- worker image type -->
      <div class="pb4 mb4 oh bb b--light-gray" v-for="worker in info.imgs">
        <div class="tc g-time-icon pa">
          <p ><img class="dib" :src="icon[worker.icon || current_icon.upload]"></p>
          <p :class="{darkOrange:worker.icon,'gray':!worker.icon}" class="font-18  ml2" v-text="worker.date"></p>
          <p :class="{darkOrange:worker.icon,'moon-gray':!worker.icon}" class="f3  ml2" v-text="worker.time"></p>
        </div>
        <p :class="{darkOrange:worker.icon,'near-black':!worker.icon}" class="font-18 mb4" v-text="'工友：'+hiddenName(info.worker.name)"></p>
        <p :class="{darkOrange:worker.icon,'gray':!worker.icon}" class="font-18 mb3">上传图片</p>
        <div >
          <img class="img-order-time-img fl mr2  mb2" :src="item" v-for="item in worker['photos']" @click="openimg(item)">
        </div>
      </div>
      <!-- worker image type end -->
      <!-- express start -->
      <div class="pb4 mb4 oh bb b--light-gray" v-show="info.express_time.time">
        <div class="tc g-time-icon pa">
          <p ><img class="dib" :src="icon[current_icon.express]"></p>
          <p class="font-18 gray ml2" v-text="info.express_time.date"></p>
          <p class="f3 moon-gray ml2" v-text="info.express_time.time"></p>
        </div>
        <p class="near-black font-18 mb4" v-text=" '材料'+ info.express_status"></p>
        <div class="font-18 mb3" v-if="info.express_number !==''"><span class="gray">物流单号：</span><span class="darkOrange " v-text="info.express_number || '无'"></span></div>
      </div>
      <!-- express end -->
      <!-- work start -->
      <div>
        <div class="tc g-time-icon pa">
          <p><img class="dib" :src="icon[current_icon.work]"></p>
          <p class="font-18 gray ml2" v-text="info.acceptTime.date"></p>
          <p class="f3 moon-gray ml2" v-text="info.acceptTime.time"></p>
        </div>
        <p class="near-black font-18 mb4" :class="{darkOrange:!info.imgs.length,'near-black':info.imgs.length}">开始施工</p>
        <p class="gray font-18 mb3" :class="{darkOrange:!info.imgs.length,'near-black':info.imgs.length}">工友开始施工</p>
      </div>
      <!-- work end  -->
    </div>
  </div>
  <!-- line -->
  <div class="mt3  mb3"></div>
  <!-- line -->
</div>
</template>
<script>
   import api from '../../services/api'
   import error from '../../services/error'
   import code from '../../services/code'
   import tool from '../../tools/tool'
   import page from '../page'
   let store = {};
   let method = {};
   store.img = [];
   store.code = code;
   store.current_icon = {
       'work': 'work',
       'express': 'express',
       'upload': 'upload',
       'finish': 'finish'
   };
   store.icon = {
       'work': '/static/img/v2_2/icon-work-2.png',
       'work_last': '/static/img/v2_2/icon-work-1.png',
       'express': '/static/img/v2_2/icon-express1.png',
       'express_last': '/static/img/v2_2/icon-express2.png',
       'upload': '/static/img/v2_2/icon-upload-1.png',
       'upload_last': '/static/img/v2_2/icon-upload-2.png',
       'finish': '/static/img/v2_2/icon-finish.png',
   };
   store.worker_img = {};
   for (let i = 1; i <= 6; i++) {
       store.img.push(i + '.jpg');
   }
   store.info = {
     acceptTime:{date:'',time:''},
     express_time:{date:'',time:''}
   };
   function formartDate (list) {
       list.forEach(function (item) {
           if (item.created_at) {
             item.created_at = item.created_at.replace(/-/g, '/');
             let formart = new Date(item.created_at || 0);
             item.date = (formart.getMonth() + 1) + '-' + formart.getDate();
             var Minutes = formart.getMinutes();
             Minutes = (Minutes<10) ? ('0'+ (Minutes).toString()) : Minutes;
             item.time = formart.getHours() + ':' + Minutes;
           }
       })
   }

    method.getOrderDetail = function () {
        api.get_orderdetail({id:this.order_id}).then(function (response) {
            console.log(response);
            if (response.code == error.success) {
                let result = response.result;
                result.acceptTime = [{created_at:result.acceptTime}];
                result.express_time = [{created_at:result.express_time}];
                result.finishTime = [{created_at:result.finishTime}];
                formartDate(result.eng_imgs);
                formartDate(result.imgs);
                formartDate(result.acceptTime);
                formartDate(result.express_time);
                formartDate(result.finishTime);
                let engine_length = result.eng_imgs.length;
                let worker_length = result.imgs.length;
                if(engine_length && result.workstatus <  code.engine_finish){
                    let eng_item = result.eng_imgs[0];
                    eng_item.icon = 'upload_last'
                }
                if (worker_length && !engine_length) {
                    let worker_item = result.imgs[0];
                    worker_item.icon = 'upload_last';
                }
                result.acceptTime = result.acceptTime[0];
                result.express_time = result.express_time[0];
                if (!worker_length) {
                    result.express_time.icon = 'express_last';
                }
                result.finishTime = result.finishTime[0];
                store.info = result;
            }
        });
    };
//     method.openimg = function (src) {
//         console.log(src);
////       this.$image(src);
//     };
   export default{
     data(){
         return store
     },
     methods:{
       openimg:function (src) {
          this.$image(src);
       },
       hiddenName:function(str){
         if (page.WechatShare()) {
           return str.split('').fill('*', 1).join('');
         } else {
           return str;
         }
       }
     },
     props:{
        order_id:{
            type: Number,
            required: true,
            default: 0
        }
     },
     name:'orderdetail',
     mounted:function () {
         method.getOrderDetail.apply(this);
     }
   }
</script>
