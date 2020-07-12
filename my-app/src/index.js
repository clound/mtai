/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-05 16:43:53
 * @LastEditTime: 2020-07-11 10:16:36
 */ 
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import Pages from './pages'
// import * as serviceWorker from './serviceWorker'
import '@/style/index.less'

ReactDOM.render(
  <Provider store={store}>
    <Pages />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
