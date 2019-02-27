import Vue from 'vue'
import Router from 'vue-router'
import routes from './customer'
import URI from '@/tools/URI'

Vue.use(Router)

let router = new Router({
  routes: routes
});

router.beforeEach((to,from,next)=>{
  let needLogin = false;
  let match = router.getMatchedComponents(to);
  if(match.length == 0){
    let path = URI.getPath("hash");
    let component = () => import('@/components' + path);
    component().then(function(obj){
      let needLogin = false;
      if(obj.needLogin) needLogin = obj.needLogin;
      let title = '';
      if(obj.title) title = obj.title;
      router.addRoutes([{
        path:path,
        component,
        meta:{ needLogin:needLogin,title :title }
      }]);
      router.push(to);
      next();
    }).catch(function(e){
      console.log(e);
    })

  }else{
    console.log(to);
    let instance = null;
    let item = match[0];
    if(typeof(item) == 'function'){
      instance = item();
    }else{
      instance = new Promise((resolve, reject) => {
        resolve(item);
      });
    }
    instance.then(function(component){
        if(component.needLogin){
          next('/login')
        }else{
          if(to.meta && (typeof(to.meta.needLogin) == 'undefined' || to.meta.needLogin)){
            next('/login')
          }else{
            next();
          }
        }
      });
  }
  // if(to.meta && typeof(to.meta.needLogin) != 'undefined' && to.meta.needLogin){
  //   next('/login');
  // }else{
     
  // }
});

export default router;