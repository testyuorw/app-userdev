var Loading = {};
var template = '<div class="com-loadding"><div class="pacman">' +
  '<div></div>' +
  '<div></div>' +
  '<div></div>' +
  '<div></div>' +
  '<div></div>' +
  '</div></div>';
Loading.install = function (Vue) {
  Vue.prototype.$loadding = function () {
    var _loadding = document.querySelector('.com-loadding');
    var body = document.body;
    if (!_loadding) {
      var loadTpl = Vue.extend({
        template:template
      });
      var tpl = new loadTpl().$mount().$el;
      body.appendChild(tpl);
    }else{
      body.removeChild(document.querySelector('.com-loadding'));
    }
    Vue.prototype.$loadding.close = function () {
      var body = document.body;
      body.removeChild(document.querySelector('.com-loadding'));
    };
  };
};
module.exports=Loading;
