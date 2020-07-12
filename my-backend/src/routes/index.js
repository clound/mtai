/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 14:48:52
 * @LastEditTime: 2020-07-10 18:20:08
 */
const Router = require('koa-router')
const router = new Router()

// module.exports = function (app) {
//   app.use(require('./users').routes())
//   app.use(require('./crawel').routes())
// }
router.use('/user', require('./users'))
router.use('/crawel', require('./crawel'))
router.use('/mtai', require('./mtai'))
module.exports = router