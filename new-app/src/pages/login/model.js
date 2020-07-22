/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-17 22:41:04
 * @LastEditTime: 2020-07-22 10:12:56
 */ 
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import { message } from 'antd'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {},
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathToRegexp('/login').exec(location.pathname)) {
  //       }
  //     })
  //   },
  // },
  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      // console.log(data, locationQuery)
      if (!data.code) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathToRegexp('/login').exec(from)) {
          if (['', '/'].includes(from)) history.push('/dashboard')
          else history.push(from)
        } else {
          history.push('/dashboard')
        }
      } else if (data.code === 1003) {
        message.warn(data.msg)
        history.push('/signup')
        // throw data
      } else {
        message.warn(data.msg)
      }
    },
  },
}
