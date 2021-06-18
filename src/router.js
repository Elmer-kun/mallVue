import Vue from 'vue'
import Router from 'vue-router'
import index from './view/index'
import login from './view/login'
import mallIndex from './view/mallIndex'
import goods from './view/goods/goods'
import orders from './view/orders'
import user from './view/user'
import goodsAdd from "./view/goods/goodsAdd";
import goodsEdit from "./view/goods/goodsEdit";

Vue.use(Router);

export default new Router({
  model: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/mallIndex',
      name: 'mallIndex',
      component: mallIndex,
      children:[
        {
          path: 'goods',
          component: goods
        },
        {
          path: '/addGoods',
          name: 'addGoods',
          component: goodsAdd
        },
        {
          path: '/editGoods',
          name: 'editGoods',
          component: goodsEdit
        },
        {
          path: 'orders',
          component: orders
        },
        {
          path: 'user',
          component: user
        }
      ]
    }
  ]
});

export const menus = [{
  path: "/",
  component: mallIndex,
  name: "Example",
  meta: {
    title: "案例",
    icon: "el-icon-success",
    roles: ['admin', 'user']
  },
  children: [{
    path: "/goods",
    name: "Table",
    component: goods,
    meta: {
      title: "table案例",
      icon: "el-icon-goods",
      roles: ['admin']
    },
    // 三级菜单写法，对应demotable案例下边的两个菜单
    children: [{
      path: "table1",
      name: "Table1",
      component: orders,
      meta: {
        title: "table1",
        icon: "el-icon-mobile-phone",
        roles: ['admin']

      }
    },
      {
        path: "table2",
        name: "Table2",
        component: goods,
        meta: {
          title: "table2",
          icon: "el-icon-service",
          roles: ['admin']
        }
      }
    ]
  },
    {
      path: "tree",
      name: "Tree",
      component: goods,
      meta: {
        title: "树形菜单",
        icon: "el-icon-upload",
        roles: ['user', 'admin']
      }
    }
  ]
}];
