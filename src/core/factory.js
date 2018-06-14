/**
 * 工厂模式
 * Created by Berno on 2016/5/18.
 */
(function (Vue) {
    var factoryScope = {};
    Vue.factory = function (name, func) {
        if ('undefined' === typeof  func) {
            return factoryScope[name];
        } else if ('function' === typeof  func || 'object' === typeof func) {
            factoryScope[name] = func;
            return factoryScope[name];
        }
    };
})(Vue);