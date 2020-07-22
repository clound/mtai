import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import { pageModel } from 'utils/model'
import { notification } from 'antd'

const {
  queryAccountList,
  addAccount,
  importAccounts,
  updateAccount,
  refreshAccount,
  deleteAccount
} = api

export default modelExtend(pageModel, {
  namespace: 'account',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/account').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          // console.log('payload, ', payload, location.query)
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(queryAccountList, payload)
      if (res) {
        let data = (res.data.rows && res.data.rows.map((v, i) => {
          return {
            ...v.mtuserinfo,
            id: v.id,
            phone: v.phone,
            index: i + 1
          }
        })) || []
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: (res.data && res.data.count) || 0,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(deleteAccount, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(addAccount, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      // const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload }
      const data = yield call(updateAccount, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    
    *import({ payload }, { call, put }) {
      const data = yield call(importAccounts, {
        data: payload
      })
      if (data.success) {
        notification['success']({
          message: '成功',
          description: '导入成功！'
        })
        yield put({ type: 'updateLoading', payload: {
          uploading: false
        }})
      } else {
        notification['error']({
          message: '失败',
          description: '导入失败！'
        })
      }
    },

    *refresh({}, { call, put }) {
      const data = yield call(refreshAccount)
      if (data) {
        yield put({ type: 'query' })
      } else {
        notification['error']({
          message: '失败',
          description: '更新失败！'
        })
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    updateLoading(state, { payload }) {
      return { ...state, ...payload }
    }
  },
})
