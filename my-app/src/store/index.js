/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 14:13:38
 * @LastEditTime: 2020-06-15 09:57:48
 */

import { createStore, applyMiddleware } from 'redux'
//引入Reducer
import Reducer from './reducers'
//引入中间件
import thunkMiddleware from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
const configureStore = (initialState) => {
  const store = createStoreWithMiddleware(
    Reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  return store
}
export default configureStore()