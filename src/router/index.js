import Vue from 'vue';
import VueRouter from 'vue-router';
var routes = null, router = null;

Vue.use(VueRouter);
// 引入路由
import Index from '@/pages/index';
import Edit from '@/pages/editPage';

// 定义路由
routes = [
  {
    name: 'index',
    path: '/',
    component: Index
  },
  {
    name: 'editPage',
    path: '/editPage',
    component: Edit
  }
];
// 实例路由
router = new VueRouter({
    mode: 'hash',  // history 不带#号
    routes: routes
});

export default router;
