/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 14:14:07
 * @LastEditTime: 2020-06-15 15:37:51
 */

import { combineReducers } from 'redux'
const files = require.context('./modules', false, /\.js$/)
const reducers = {}
files.keys().forEach(key => {
  reducers[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

// 使用combineReducers方法整合多个子reducer
const reducer = combineReducers({
  ...reducers
})
export default reducer
