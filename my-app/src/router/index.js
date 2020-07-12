/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 14:26:00
 * @LastEditTime: 2020-07-12 15:46:14
 */ 
import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import AllComponents from '@/components'
import routesConfig from './config'
import queryString from 'query-string'

export default class CRouter extends Component {
  requireAuth = (permission, component) => {
    const { auth } = this.props
    const { permissions } = auth.data
    // const { auth } = store.getState().httpData;
    if (!permissions || !permissions.includes(permission))
      return <Redirect to={'404'} />
    return component
  }
  requireLogin = (component, permission) => {
    const { auth } = this.props
    const { username } = auth.data
    console.log(auth);
    if (process.env.NODE_ENV === 'development' && !username) {
      console.log('------------------');
      // 线上环境判断是否登录
      return <Redirect to={'/login'} />
    }
    console.log(component)
    return permission ? this.requireAuth(permission, component) : component
  }
  render() {
    return (
      <Switch>
        {Object.keys(routesConfig).map((key) =>
          routesConfig[key].map((r) => {
            const route = (r) => {
              const Component = AllComponents[r.component]
              return (
                <Route
                  key={r.route || r.key}
                  exact
                  path={r.route || r.key}
                  render={(props) => {
                    const reg = /\?\S*/g
                    // 匹配?及其以后字符串
                    const queryParams = window.location.hash.match(reg)
                    // 去除?的参数
                    const { params } = props.match
                    Object.keys(params).forEach((key) => {
                      params[key] = params[key] && params[key].replace(reg, '')
                    })
                    props.match.params = { ...params }
                    const merge = {
                      ...props,
                      query: queryParams
                        ? queryString.parse(queryParams[0])
                        : {},
                    }
                    // 重新包装组件
                    const wrappedComponent = (
                        <Component {...merge} />
                    )
                    return r.login
                      ? wrappedComponent
                      : this.requireLogin(wrappedComponent, r.auth)
                  }}
                />
              )
            }
            return r.component ? route(r) : r.subs.map((r) => route(r))
          })
        )}

        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    )
  }
}
