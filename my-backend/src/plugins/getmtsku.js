/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-08-31 18:25:14
 * @LastEditTime: 2020-09-08 18:49:58
 */
const mail = require('./mail')
const httpRequest = require('../libs/request')
let { Headers, LOGIN_URL, skuUrl, Cart_URL, 
  PresaleToken_URL,
  Order_URL, USERINFO_URL } = require('./config')
function login(userInfo) {
  /**
   * @return {
        "data": {
          "inquire": 1,
          "loginTime": "2020-07-09 12:03:06",
          "loginName": "13511603513", 15950064239
          "userSession": "BFB972AC5C3C764A633659D66F5170D2",
          "id": 669804
        },
        "stateCode": 0
      }
   */
  let { phone, passwd, unique } = userInfo
  Headers = Object.assign({}, Headers, {
    unique
  })
  let options = {
    method: 'POST',
    uri: LOGIN_URL,
    // proxy: 'http://127.0.0.1:8888',
    // rejectUnauthorized: false,
    form: {
      param: `{"loginName":"${phone}","password":"${passwd}"}`
    },
    headers: Headers
  }
  return httpRequest(options, 'Login')
}
function getUserInfo(userInfo) {
  /**
   * @return {
        "data": {
          "birthday": "1993-03-21",
          "idCard": "",
          "regionName": "",
          "pic": "",
          "cardNo": "90206373853236",
          "unSendOrderCount": 0,
          "loginName": "15950064239",
          "unReceiveOrderCount": 0,
          "nickname": "赵梦成15950064239",
          "unPayOrderCount": 0,
          "id": 2040109,
          "shopId": "999999",
          "memberId": 2040109,
          "inquire": 1,
          "address": "",
          "uname": "赵梦成",
          "sex": 1,
          "mobile": "15950064239",
          "collectCount": 0,
          "unreadMessageCount": 184,
          "unEvaluateOrderCount": 0,
          "zipcode": "",
          "realName": "",
          "regionId": 0,
          "clerkCode": "",
          "accountBalance": 0,
          "ncmsMemberId": "7949601361296994372"
        },
        "stateCode": 0
      }
   */
  let { userId, sessionId, unique } = userInfo
  Headers = Object.assign({}, Headers, {
    unique,
    userId,
    userSession: sessionId
  })
  // console.log(Headers);
  let options = {
    method: 'POST',
    uri: USERINFO_URL,
    // proxy: 'http://127.0.0.1:8888',
    // rejectUnauthorized: false,
    headers: Headers
  }
  return httpRequest(options, 'GetUserInfo')
}
function getmtsku(shop) {
  // Headers = Object.assign({}, config.header, {
  //   // cookie: config.orderCookie(token)
  // })
  // let form = Object.assign({}, config.orderJson, {
  //   token
  // })
  let options = {
    method: 'GET',
    uri: `${skuUrl}`,
    // proxy: 'http://127.0.0.1:8888',
    // rejectUnauthorized: false,
    qs: {
      // param: `{"activityId":"2","shopCode":"206076","longitude":116.41024359809028,"latitude":39.91640353732639}`
      param: `${shop}`
    },
    // headers: Headers,
    json: true
  }
  // console.log(options)
  return httpRequest(options, 'getmtsku')
}
/**
 * @return {
	"data": {
		"result": true,
		"tip": "合法请求"
	},
	"stateCode": 0
}
 */
function addCart(params) {
  let {
    activityId,
    ruleId,
    goodsId,
    productId,
    ncmsMemberId,
    mobile,
    number,
    userId,
    userSession,
    unique
  } = params
  Headers = Object.assign({}, Headers, {
    userId,
    userSession,
    unique
  })
  let options = {
    method: 'GET',
    uri: `${Cart_URL}`,
    // proxy: 'http://127.0.0.1:8888',
    // rejectUnauthorized: false,
    qs: {
      param: `{"activityId":"${activityId}","presaleRuleId":"${ruleId}","goodsId":${goodsId},"productId":${productId},"ncmsMemberId":"${ncmsMemberId}","mobile":"${mobile}","number":${number}}`
    },
    headers: Headers,
    json: true
  }
  return httpRequest(options, 'addCart')
}
/**
 * @return {
	"stateCode": 0,
	"msg": "success",
	"message": "success",
	"data": {
		"result": "6d45ed9cb9e05b10d99ade86bbb1d09f"
	},
	"success": true
}
 */
function presaleToken(params) {
  let {
    presaleRuleId,
    subsiteId,
    userId,
    userSession,
    unique
  } = params
  Headers = Object.assign({}, Headers, {
    userId,
    userSession,
    unique
  })
  let options = {
    method: 'POST',
    uri: `${PresaleToken_URL}`,
    // proxy: 'http://127.0.0.1:8888',
    // rejectUnauthorized: false,
    form: {
      param: `{"presaleRuleId":"${presaleRuleId}","subsiteId":"${subsiteId}"}`
    },
    headers: Headers,
  }
  return httpRequest(options, 'presaleToken')
}
/**
 * {
	"stateCode": 0,
	"msg": "success",
	"data": 4475300,
	"success": true
}
 */
function order(params) {
  let {
    token,
    goodsId,
    presaleRuleId,
    subsiteId,
    userId,
    userSession,
    unique
  } = params
  Headers = Object.assign({}, Headers, {
    userId,
    userSession,
    unique
  })
  // console.log(params, Headers);
  let options = {
    method: 'POST',
    uri: `${Order_URL}`,
    // proxy: 'http://127.0.0.1:8888',
    // rejectUnauthorized: false,
    form: {
      param: `{"token":"${token}","paymentModeType":"1","invoice":{"status":0},"subsiteId":${subsiteId},"goodsId":${goodsId},"presaleRuleId":"${presaleRuleId}"}`
    },
    headers: Headers,
  }
  return httpRequest(options, 'order')
}
module.exports = {
  login,
  getUserInfo,
  getmtsku,
  addCart,
  presaleToken,
  order
}