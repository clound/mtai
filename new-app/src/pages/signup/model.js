/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-17 22:41:04
 * @LastEditTime: 2020-07-19 21:39:29
 */ 
import { history } from 'umi'
import api from 'api'
import { message } from 'antd'

const { signupUser } = api

export default {
  namespace: 'signup',

  state: {},
  effects: {
    *signup({ payload }, { call }) {
      const data = yield call(signupUser, payload)
      console.log(data)
      if (!data.code) {
        history.push('/login')
      } else {
        message.warn(data.msg)
        // throw data
      }
    },
  },
}
