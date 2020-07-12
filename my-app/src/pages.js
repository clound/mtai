/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 15:21:59
 * @LastEditTime: 2020-06-15 10:43:19
 */ 
import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NotFound from '@/components/pages/NotFound'
import Login from '@/components/pages/Login'
import App from '@/entry/App'

export default () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/app/dashboard/index" push />}
      />
      <Route path="/app" component={App} />
      <Route path="/404" component={NotFound} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
