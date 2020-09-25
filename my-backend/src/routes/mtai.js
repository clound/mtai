/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-09 11:56:29
 * @LastEditTime: 2020-09-25 09:37:19
 */ 
const Router = require('koa-router')
const router = new Router()
const mtaiController = require('../controllers').mtai
const mtuserController = require('../controllers').mtuser
const Tips = require('../utils/tips')
const util = require('../utils/tools')
const crypto = require('crypto')
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbSCYMupAFFYE5vs1Zxu+
77NB03lDoeKvsqLgGQndwdGSj5NppiDguoyTN0dHANlsG7zvhyauyueGx32
LvcvfKuzfpGxMazwt91ivI+uL3ZbHkbOi74NUS8ob7Teol0iQO8ZAMmRL2f
SPeDL0RHFUf4CN185lxlZ0egiM3kTarJQIDAQAB
-----END PUBLIC KEY-----
`;
function encryptPasswd(str) {
  const encodeData = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, Buffer.from(str)).toString('base64')
  return encodeData
}
router.get('/getAccounts', async (ctx, next) => {
  await mtuserController.getAccounts(ctx)
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

router.post('/updateAccount', async (ctx, next) => {
  await mtuserController.update(ctx)
})
router.post('/deleteAccount', async (ctx, next) => {
  await mtuserController.delete(ctx)
})
router.get('/refreshAccount', async (ctx, next) => {
  ctx.body = {
    ...Tips[0]
  }
  let res = await mtuserController.getReqUsers(ctx)
  // console.log(res)
  if (!res.count) return
  for (let k = 0; k < res.count; k ++) {
    console.log('开始查询-----------', k)
    let { id: userId, phone, passwd, unique } = res.rows[k]
    let loginINfo = await mtaiController.login({ 
      phone,
      passwd: encryptPasswd(passwd),
      unique
    })
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
    let jifenInfo = await mtaiController.getJifenStatus({ unique, sessionId: userSession, userId: id })
    // console.log(jifenInfo);
      let { items } = jifenInfo.data
      let jifenArr = items && items.map(v => {
        return {
          pay_amount: v.pay_amount || '',
          store_name: v.store_name || '',
          points: v.points || '',
          transaction_time: v.transaction_time || ''
        }
      }) || []
      // console.log(jifenArr)
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
          orderCreated,
          jifen: JSON.stringify(jifenArr)
        }
        // console.log(updateInfo)
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