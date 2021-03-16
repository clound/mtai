/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-09 11:56:29
 * @LastEditTime: 2021-03-16 16:53:42
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
  await mtuserController.create(ctx)
})

router.post('/updateAccount', async (ctx, next) => {
  await mtuserController.update(ctx)
})
router.post('/deleteAccount', async (ctx, next) => {
  await mtuserController.delete(ctx)
})
function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {resolve()}, 1000)
  })
}
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
async function getUserSession(row) {
  const { id: userId } = row
  const uSession = await mtuserController.getMtUserSession({ id: userId })
  return (uSession && uSession.usession) || null
}
function userLogin(row) {
  const { id, phone, passwd, unique } = row
  return mtaiController.login({
    phone,
    passwd: encryptPasswd(passwd),
    unique
  }).then(data => {
    mtuserController.updataMtUserSession({
      usession: data,
      userId: id
    })
    return data
  })
}
async function getUserInfo(row, loginInfo) {
  const { unique } = row
  let loginResult = JSON.parse(loginInfo)
  let { userSession, id } = loginResult.data
  let userInfo = await mtaiController.getUserInfo({ unique, sessionId: userSession, userId: id })
  let uInfo = (userInfo && JSON.parse(userInfo)) || {}
  return uInfo
}
function handleData(row) {
  // console.log(row)
  return new Promise(async (resolve) => {
    const { id: userId, unique, phone } = row
    const uSession = await getUserSession(row)
    let loginInfo = uSession
    let loginResult = ''
    if (!loginInfo) {
      loginInfo = await userLogin(row)
      loginResult = JSON.parse(loginInfo)
      if (loginResult.stateCode) {resolve('failed'); return }
    }
    // console.log(loginInfo);
    let uInfo = await getUserInfo(row, loginInfo)
    if (uInfo.stateCode) {
      if (uInfo.stateCode === 3){
        loginInfo = await userLogin(row)
        loginResult = JSON.parse(loginInfo)
        if (loginResult.stateCode) {resolve('failed'); return }
        uInfo = await getUserInfo(row, loginInfo)
      }
    }
    loginResult = JSON.parse(loginInfo)
    if (loginResult.stateCode) {resolve('failed'); return }
    let { userSession, id } = loginResult.data
    let { uname, ncmsMemberId, mobile } = uInfo.data
    let applyInfo = await mtaiController.getApplyShop({ unique, sessionId: userSession, userId: id, ncmsMemberId, mobile })
    if (applyInfo.stateCode) {resolve('failed'); return }
    let { result, signInfo: {
      choosed = false,
      choosedDay = '',
      cityName = '',
      shopName = '',
      limitDate = '',
      orderCreated = false
    } = {} } = applyInfo.data.data
    let zqgqSignInfo = ''
    if (Date.now() < new Date('2020/12/20').getTime()) {
      let zqgqInfo = await mtaiController.getZqgqActivity({ unique, sessionId: userSession, userId: id, ncmsMemberId, mobile })
      if (zqgqInfo.stateCode) {resolve('failed'); return }
      const { signInfo } = zqgqInfo.data.data
      zqgqSignInfo = signInfo
    }
    // 获取15年茅台中签信息
    let mt15Info = await mtaiController.get15mtActivity({ unique, sessionId: userSession, userId: id, ncmsMemberId, mobile })
    if (mt15Info.stateCode) {resolve('failed'); return }
    let { signInfo: mt15SignInfo } = mt15Info.data.data
    let jifenInfo = await mtaiController.getJifenStatus({ unique, sessionId: userSession, userId: id })
    if (jifenInfo.stateCode) {resolve('failed'); return }

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
      zqgqSignInfo: (zqgqSignInfo && JSON.stringify(zqgqSignInfo)) || '',
      mt15SignInfo: (mt15SignInfo && JSON.stringify(mt15SignInfo)) || '',
      jifen: JSON.stringify(jifenArr)
    }
    // console.log(updateInfo)
    let lastInfo = await mtuserController.updateUserInfo(updateInfo)
    console.log(`${uname}/${phone}/${lastInfo?'插入':'更新'}记录`, util.parseTime(new Date(), '{y}/{m}/{d} {h}:{i}:{s}'))
    resolve(uname)
  })
}
router.get('/refreshAccount', async (ctx, next) => {
  ctx.body = {
    ...Tips[0]
  }
  let res = await mtuserController.getReqUsers(ctx)
  if (!res.count) return
  let arr = []
  for (let k = 0; k < res.count; k ++) {
    console.log('开始查询-----------', k)
    // await sleep()
    arr.push(handleData(res.rows[k]))
    if (arr.length === 8) {
      await Promise.all([...arr]).then(data => {
        console.log(data)
      })
      arr.length = 0
    }
  }
})

module.exports = router.routes()