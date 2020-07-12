/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 14:56:09
 * @LastEditTime: 2020-07-12 16:17:52
 */ 
const Router = require('koa-router')
const router = new Router()
const userController = require('../controllers').user;
const checkToken = require('../middleware/check_auth')


router.post('/signup', (ctx, next) => {
    userController.create(ctx)
})

router.post('/login', async (ctx, next) => {
    await userController.login(ctx)
})
router.get('/info', (ctx, next) => {
    console.log(ctx);
    userController.getUserInfo(ctx)
})
router.get('/logout', (ctx, next) => {
    userController.logout(ctx)
})

module.exports = router.routes()