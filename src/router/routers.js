import React, { lazy } from 'react'
import HocRouter from './routeInterceptor'
import FatherLayout from '@/layouts/basic/fatherLayout'
import BasicLayout from '@/layouts/basic'
import { Redirect } from 'react-router-dom'
import Error from '@/pages/error'
import Login from '@/pages/login'
import PageError from '@/pages/error/pageError'
import NoAccessErr from '@/pages/error/noAccess'
import { lazyComponent } from '@/utils/function'
/**
 * @description 没有权限和不依赖BasicLayout组价的路由
*/
export const noLayoutRouter = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to={{ pathname: '/home' }} />
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/pageError',
    exact: true,
    component: PageError,
  },
  {
    path: '/403',
    exact: true,
    component: NoAccessErr,
  },
]
/**
 * @descriptio 含BasicLayout布局路由，静态
 */
export const staticRouter = [
  {
    exact: true,
    path: '/home',
    component: HocRouter(lazyComponent('home')),
    title: '首页',
  },
  {
    exact: true,
    path: '/userInfo',
    title: '用户信息',
    component: HocRouter(lazyComponent('user/userInfo')),
  }
];
/**
 * @description 权限路由,动态的
 */
export const menuRouter = [
  {
    path: '/set',
    title: '设置',
    component: FatherLayout,
    icon: 'setting',
    routes: [
      {
        exact: true,
        path: '/set/userManage',
        component: HocRouter(lazyComponent('set/userManage')),
        title: '用户管理',
      },
    ]
  },
  {
    path: '/404',
    title: '404',
    component: Error,
    hiddle: true
  },
  {
    path: '*',
    render: () => <Redirect to={{ pathname: '/404' }} />,
    hiddle: true
  },
];
export default [
  ...noLayoutRouter,
  {
    component: BasicLayout,
    routes: [...staticRouter, ...menuRouter]
  },
  {
    path: '*',
    render: () => <Redirect to={{ pathname: '/404' }} />
  }
]
