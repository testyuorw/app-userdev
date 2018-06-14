import selectboxComponet from './selectlist.vue'
let selectbox = {};

selectbox.install = function (Vue, options) {
  var opt = {
    selectData:["aaa","bbb","ccc","ddd","eee","ccc "],
    cb:function () {},
    cshow:function (id,name) {}
  };
  for (var key in options){
    opt[key] = options [key]
  }
  const selectboxControll = Vue.extend(selectboxComponet);
  var instance = new selectboxControll ().$mount(document.createElement('div'));
  Vue.prototype.$selectbox = function (select,option) {
    if(typeof option == 'object'){
      for (var key in option){
        opt[key] = option[key]
      }
    }
    instance.select = select;
    instance.options = opt;
    document.body.appendChild(instance.$el);
  };

  Vue.prototype.$selectbox['show'] = function (select,option) {
    Vue.prototype.$selectbox(select, option);
  };

  Vue.prototype.$selectbox['cancle'] = function () {
    document.body.removeChild(instance.$el);
  };

  Vue.prototype.$selectbox['sure'] = function () {
    instance.options.cb();
    document.body.removeChild(instance.$el);
  };

  Vue.prototype.$selectbox['look'] = function (id,name) {
    instance.options.cshow(id,name);
  }
};


export default selectbox;





