/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 16:27:21
 * @LastEditTime: 2020-06-17 17:04:46
 */ 
const Router = require('koa-router')
const router = new Router()
const crawelController = require('../controllers').crawel
router.user
router.get('/list', async (ctx, next) => {
    await crawelController.list(ctx)
})
router.get('/fetch', function (ctx, next) {
    crawelController.create(ctx)
    
})

module.exports = router.routes()