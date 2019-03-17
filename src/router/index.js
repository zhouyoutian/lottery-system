import Router from 'vue-router'
import Vue from 'vue'
import main from '../components/Main'
import editor from '../components/Editor'
import login from '../components/Login'
Vue.use(Router)

export const constantRouterMap = [
    {
      path: '/',
      component: main
    },
    {
      path: '/editor',
      component: editor
    },
    {
      path: '/login',
      component: login
    }
  ]
  
  export default new Router({
    routes: constantRouterMap
  })