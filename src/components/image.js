var image = {};
image.install = function (Vue) {
  var template = '<div v-on:click="close()" class="com-image">'+
    '<div class="h100"><img v-bind:src="src" v-bind:class="{bounceIn:animation}"></div>'+
    '</div>';
  var method = {};
  method.close = function () {
    var _image = document.querySelector('.com-image');
    var body = document.body;
    body.removeChild(_image)
  };
  Vue.prototype.$image = function (src) {
    var _image = document.querySelector('.com-image');
    var body = document.body;
    if (!_image) {
      var loadTpl = Vue.extend({
        template:template,
        data(){
          return {
            src:src,
            animation:true
          }
        },
        methods:method
      });
      var tpl = new loadTpl().$mount().$el;
      body.appendChild(tpl);
    }
  };
};
module.exports = image;
