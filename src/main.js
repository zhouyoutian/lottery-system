import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import './assets/public.scss'
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'
import {appStore} from './store/appStore'

Vue.config.productionTip = false
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  if (to.path == '/editor') {
    if (appStore.user && appStore.user.role === 0) {
      next()
    } else {
      next({path: '/login'})
    }
  }
  next()
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
