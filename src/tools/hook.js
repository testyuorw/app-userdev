var hook = {};
hook.install = function (Vue) {
    Vue.prototype.$hook = function () {
    };
    Vue.prototype.$hook.enter = function (cb) {
        document.body.onkeypress = function (event) {
          if(event.keyCode == 13){
              cb()
          }
        };
    };
};
module.exports = hook;
