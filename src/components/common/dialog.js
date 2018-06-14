import messageboxComponet from './vue-messagebox'
import Promise from "Promise"
let messagebox = {};
messagebox.install = function (Vue, options) {
  var opt = {
    buttonName: ['取消', '确认'],
    buttonColor: ['#333', '#666'],
    buttonBgcolor: ['#ffd102', '#fff'],
    bgColor: '#fff',
    vim:"wait",
    cb: function () {

    }

  }
  for (var key in options) {
    opt[key] = options [key]
  }
  const messageboxControll = Vue.extend(messageboxComponet);
  var instance = new messageboxControll().$mount(document.createElement('div'));

  Vue.prototype.$messagebox = function (message, option) {
    if (typeof option == 'object') {
      for (var key in option) {
        opt[key] = option[key]
      }
    }
    var default_option  = {
      showalert:false,
      showbox:false
    };
    option = Object.assign(default_option, option);
    instance.message = message;
    instance.visible = true;
    instance.usercode = '';
    instance.showalert = option.showalert;
    instance.options = opt;
    if (opt.buttonName.length < 1) {
      instance.message.showButton = false;
    } else {
      instance.message.showButton = true;
    }


    document.body.appendChild(instance.$el);
    return instance;
  }


  Vue.prototype.$messagebox['show'] = function (message, option) {
    Vue.prototype.$messagebox(message, option);
  }


  Vue.prototype.$messagebox['cancle'] = function () {
    instance.visible = false;
    document.body.removeChild(instance.$el);
  }

  Vue.prototype.$messagebox['sure'] = function () {
    // console.log(instance.showalert);
    instance.options.cb.call(Vue.prototype.$messagebox, this);
    // console.log(opt);
    /*if(instance.showbox == false){
      instance.visible = false;
      document.body.removeChild(instance.$el);
    }*/

  }

};
export default messagebox;


