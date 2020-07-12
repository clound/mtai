/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 14:51:10
 * @LastEditTime: 2020-07-11 09:37:50
 */ 
// import upload from './upload'
// import * as api from './api'
// import * as auth from './auth'

// export default {
//   upload,
//   api,
//   auth
// }
const user = require('./user')
// const articles = require('./articles')
const crawel = require('./crawel')
const mtai = require('./mtai')
const mtuser = require('./mtuser')

module.exports = {
  user,
  // articles,
  crawel,
  mtai,
  mtuser
}