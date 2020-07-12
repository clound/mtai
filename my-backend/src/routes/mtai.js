/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-09 11:56:29
 * @LastEditTime: 2020-07-11 22:53:41
 */ 
const Router = require('koa-router')
const router = new Router()
const mtaiController = require('../controllers').mtai
const mtuserController = require('../controllers').mtuser
const Tips = require('../utils/tips')
const util = require('../utils/tools')

router.get('/getusers', async (ctx, next) => {
  await mtuserController.getUsers(ctx)
})
router.post('/importAccounts', async (ctx, next) => {
  await mtuserController.bulkCreate(ctx)

})
router.post('/addAccount', async (ctx, next) => {
  // console.log(ctx.request.body)
  // let data = [{
  //   phone: '13256781234',
  //   passwd: '123456'
  // }, {
  //   phone: '18052526354',
  //   passwd: '211233'
  // }, {
  //   phone: '17153241625',
  //   passwd: '123456'
  // }]
  await mtuserController.create(ctx)

})
router.get('/refreshInfo', async (ctx, next) => {
  ctx.body = {
    ...Tips[0]
  }
  let res = await mtuserController.getReqUsers(ctx)
  if (!res.count) return
  for (let k = 0; k < res.count; k ++) {
    console.log('开始查询-----------', k)
    let { id: userId, phone, passwd, unique } = res.rows[k]
    let loginINfo = await mtaiController.login({ phone, passwd, unique })
    let loginResult = JSON.parse(loginINfo)
    let { userSession, id } = loginResult.data
    let userInfo = await mtaiController.getUserInfo({ unique, sessionId: userSession, userId: id })
    let userInfoResult = JSON.parse(userInfo)
    let { uname, ncmsMemberId, mobile } = userInfoResult.data
    let applyInfo = await mtaiController.getApplyShop({ unique, sessionId: userSession, userId: id, ncmsMemberId, mobile })
    let { result, signInfo: {
        choosed = false, 
        choosedDay = '',
        cityName = '',
        shopName = '',
        limitDate = '',
        orderCreated = false
      } = {} } = applyInfo.data.data
    let updateInfo = {
      userId,
      uname,
      mobile,
      result,
      choosed, 
      choosedDay,
      cityName,
      shopName,
      limitDate,
      orderCreated
    }
    let lastInfo = await mtuserController.updateUserInfo(updateInfo)
    console.log(`${uname}/${phone}/${lastInfo?'插入':'更新'}记录`, util.parseTime(new Date(), '{y}/{m}/{d} {h}:{i}:{s}'))
  }

})
router.get('/login', async (ctx, next) => {
  let res = await mtaiController.login(ctx)
  let result = JSON.parse(res)
  console.log(result, ctx.session)
  ctx.session.sessionId = result.data.userSession
  ctx.session.userId = result.data.id
  ctx.body = res
})
router.get('/logout', async (ctx, next) => {
  let res = await mtaiController.logout(ctx)
  ctx.body = res
})
router.post('/getUserInfos', async (ctx, next) => {
  await mtuserController.getAllUserInfo(ctx)
})
// router.get('/getApplyShop', async (ctx, next) => {
//   let res = await mtaiController.getApplyShop(ctx)
//   console.log(res, typeof res)
//   let result = res
//   ctx.session.shopCode = (result.data.data.signInfo && result.data.data.signInfo.shopCode) || ''
//   ctx.body = res
// })
// router.get('/getApplyStatus', async (ctx, next) => {
//   let res = await mtaiController.getApplyStatus(ctx)
//   ctx.body = res
// })


module.exports = router.routes()