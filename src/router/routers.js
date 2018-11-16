/* eslint-disable */
import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true,
	          title: '首页',
        },
        component: () => import('@/view/single-page/home.vue')
      }
    ]
  },
  //左侧菜单栏
  
  
  {
    path: '/user',
    name: 'user',
    meta: {
      icon: 'md-person',
      title: '人员信息'
    },
    component: Main,
    children: [
      {
        path: 'pcDetail',
        name: 'pcDetail',
        meta: {
          icon: 'ios-list-box',
          title: '电脑借用管理'
        },
        component: () => import('@/view/pcDetail.vue')
      },
      {
        path: 'pcBrrow',
        name: 'pcBrrow',
        meta: {
          icon: 'ios-create',
          title: '电脑借用登记'
        },
        component: () => import('@/view/pcBrrow.vue')
      },
      {
        path: 'pcChange/:id',
        name: 'pcChange',
        meta: {
          icon: 'md-clipboard',
          title: '信息更改',
          hideInMenu: true
        },
        component: () => import('@/view/pcChange.vue')
      }
    ]
  },
  {
    path: '/pc',
    name: 'pc',
    meta: {
      icon: 'md-desktop',
      title: '电脑管理'
    },
    component: Main,
    children: [
      {
        path: 'pcInfo',
        name: 'pcInfo',
        meta: {
          icon: 'md-list-box',
          title: '电脑库存'
        },
        component: () => import('@/view/pcInfo.vue')
      },
      {
        path: 'pcAdd',
        name: 'pcAdd',
        meta: {
          icon: 'md-add',
          title: '电脑新增'
        },
        component: () => import('@/view/pcAdd.vue')
      },
      {
        path: 'pcEdit/:id',
        name: 'pcEdit',
        meta: {
          icon: 'md-clipboard',
          title: '信息编辑',
          hideInMenu: true
        },
        component: () => import('@/view/pcEdit.vue')
      }
    ]
  },
//{
//  path: '/',
//  name: 'sign',
//  component: Main,
//  children: [
//    {
//      path: 'sign',
//      name: 'sign',
//      meta: {
//        icon: 'md-list-box',
//        title: '签名生成'
//      },
//      component: () => import('@/view/sign/sign.vue')
//    },
//    
//  ]
//},
  
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
