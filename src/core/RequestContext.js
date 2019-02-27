let context = function(Vue){
    Vue.prototype.$context = {
        title : function(title){
            document.title = title;
        }
    }
}

export default context;