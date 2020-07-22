import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
const { pathToRegexp } = require("path-to-regexp")
import { model } from 'utils/model'
import { Color } from 'utils'

const { queryAccounts, queryWeather } = api

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '深圳',
      temperature: '30',
      name: '晴',
      icon: '//s5.sencdn.com/web/icons/3d_50/2.png',
    },
    sales: [],
    quote: {
      avatar:
        'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar:
        'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathToRegexp('/dashboard').exec(pathname) ||
          pathToRegexp('/').exec(pathname)
        ) {
          dispatch({ type: 'query' })
          // dispatch({ type: 'queryWeather' })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryAccounts, parse(payload))
      if (data.success) {
        let { hit, count } = data
        yield put({
          type: 'updateState',
          payload: {
            numbers: [{
              icon: 'team',
              color: Color.blue,
              title: '账号',
              number: count,
            },
            {
              icon: 'message',
              color: Color.purple,
              title: '中签',
              number: hit,
            }]
          }
        })
      }
    },
    *queryWeather({ payload = {} }, { call, put }) {
      payload.location = 'nanjing'
      const result = yield call(queryWeather, payload)
      const { success } = result
      if (success) {
        const data = result.results[0]
        const weather = {
          city: data.location.name,
          temperature: data.now.temperature,
          name: data.now.text,
          icon: `//s5.sencdn.com/web/icons/3d_50/${data.now.code}.png`,
        }
        yield put({
          type: 'updateState',
          payload: {
            weather,
          },
        })
      }
    },
  },
})
