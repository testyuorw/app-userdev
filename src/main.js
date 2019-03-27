// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import Loading from './components/loadding'
import hook from './tools/hook'
import VueCookie from 'vue-cookie'
import image from './components/image'
import messagebox from './components/common/dialog'
import Calendar from './components/common/calendar'
import selectbox from './components/common/selectlist'
import Vant from 'vant';
import 'vant/lib/index.css';


// import * as VConsole from 'vconsole'
// const vConsole = new VConsole()

import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';

Vue.use(wcSwiper);
Vue.use(Vant);
Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(Loading)
Vue.use(VueCookie)
Vue.use(hook)
Vue.use(image)
Vue.use(messagebox)
Vue.use(Calendar)
Vue.use(selectbox)

/* eslint-disable no-new */
Vue.filter('cut', function (v) {
  return v.substring(0,1)+"**";
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
