/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 14:56:09
 * @LastEditTime: 2020-07-22 09:08:32
 */ 
const Router = require('koa-router')
const router = new Router()
const userController = require('../controllers').user;
const checkToken = require('../middleware/check_auth')


router.post('/signup', async (ctx, next) => {
    await userController.create(ctx)
})

router.post('/login', async (ctx, next) => {
    await userController.login(ctx)
})
router.get('/info', async (ctx, next) => {
    await userController.getUserInfo(ctx)
})
router.get('/userlist', async (ctx, next) => {
    await userController.getUserList(ctx)
})
router.post('/update/:id', async (ctx, next) => {
    console.log(222);
    await userController.update(ctx)
})
router.post('/delete/:id', async (ctx, next) => {
    await userController.delete(ctx)
})
router.get('/logout', async (ctx, next) => {
    await userController.logout(ctx)
})

module.exports = router.routes()