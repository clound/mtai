/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-09 11:58:01
 * @LastEditTime: 2020-09-25 09:34:50
 */
const httpRequest = require('../libs/request')
const tool = require('../utils/tools')
const prefix = 'https://app.crv.com.cn'
const LOGIN_URL = `${prefix}/app_api/v1/dc-app-api/mobile/api/user/login`
const USERINFO_URL = `${prefix}/app_api/v1/dc-app-api/mobile/api/user/info`
const LOGOUT_URL = `${prefix}/app_api/v1/dc-app-api/mobile/api/user/logout`
const APPLY_SHOP_URL = `${prefix}/app_timelimit/v1/dc-timelimit/presale/onlineDraw/token`
const APPLY_STATUS_URL = `${prefix}/app_timelimit/v1/dc-timelimit/presale/getPreSaleActivity`
const JIFEN_URL = `${prefix}/app_api/v1/dc-app-api/mobile/api/point/queryPoints`
let Headers = {
  host: 'app.crv.com.cn',
  Connection:	'keep-alive',
  language:	'zh-CN',
  'User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92',
  appVersion: '3.1.11',
  os: 'ios',
  channel: 'ios',
  networkType: 'wifi',
  osVersion:	12.1,
  subsiteId: 102,
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  // unique:	'ios-55AC6BA3-EB07-4803-BC3C-E0CE2821A12F',
  appkey:	'ef1fc57c13007e33',
  'X-Requested-With':	'com.crv.wanjia',
  addressId: '',
  appHref: 'http://localhost:8080/var/mobile/Containers/Data/Application/3A0BD31B-0FCB-45CC-9480-7CAEF813B2DA/Library/Application%20Support/3.1.11/index.html?cordova_js_bootstrap_resource=/var/containers/Bundle/Application/E34B0004-D782-4646-8354-A7CA6EBACD13/%E5%8D%8E%E6%B6%A6%E4%B8%87%E5%AE%B6.app/www/cordova.js#/tabs/appIndex/preSaleSelfMentionTwo?preSaleRuleId=118&title=53%E5%BA%A6500ml%E9%A3%9E%E5%A4%A9%E8%8C%85%E5%8F%B0%E9%85%92%E9%A2%84%E5%94%AE-%E6%8A%BD%E7%AD%BE',
  Referer: 'http://localhost:8080/var/mobile/Containers/Data/Application/3A0BD31B-0FCB-45CC-9480-7CAEF813B2DA/Library/Application%20Support/3.1.11/index.html?cordova_js_bootstrap_resource=/var/containers/Bundle/Application/E34B0004-D782-4646-8354-A7CA6EBACD13/%E5%8D%8E%E6%B6%A6%E4%B8%87%E5%AE%B6.app/www/cordova.js'
}
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports = {
  login(userInfo) {
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
  },
  logout(userInfo) {
    let { userId, userSession, unique } = userInfo
    Headers = Object.assign({}, Headers, {
      userId,
      userSession,
      unique
    })
    let options = {
      method: 'POST',
      uri: LOGOUT_URL,
      // proxy: 'http://127.0.0.1:8888',
      // rejectUnauthorized: false,
      headers: Headers
    }
    return httpRequest(options, 'Logout')
  },
  getUserInfo(userInfo) {
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
  },
  getApplyShop(userInfo) {
    /**
     * @param {"presaleRuleId":"118","ncmsMemberId":"7949601361296994372","mobile":"15950064239","presaleTime":"2020/07/09 22:00","preSaleTimeId":352}
     * {
        "data": {
          "data": {
            "result": "6月消费金额不足300元",
            "isSigned": 1,
            "topImage": "http://appres.crv.com.cn/images/maotai/head_118.png",
            "bottomImage": "http://appres.crv.com.cn/images/maotai/detail_118.png",
            "datePeriod": "07月01日 00:00 ~ 07月31日 23:59",
            "type": 0,
            "noticeTime": "15:00",
            "point": 33655
          },
          "stateCode": 0
        },
        "stateCode": 0
      }
     */
    /**
     * @return {
        "data": {
          "data": {
            "result": "18e0f8ed19ee8c45e4aeb2d01ddaf9f7",
            "signInfo": {
              "choosed": false,
              "choosedDay": "",
              "cityName": "苏州市",
              "limitDate": "",
              "orderCreated": false,
              "shopCode": "206076",
              "shopName": "苏州新湖店",
              "signCount": 528
            },
            "isSigned": 0,
            "topImage": "http://appres.crv.com.cn/images/maotai/head_118.png",
            "selectedNode": "tencent",
            "versionFlag": 0,
            "bottomImage": "http://appres.crv.com.cn/images/maotai/detail_118.png",
            "datePeriod": "07月01日 00:00 ~ 07月31日 23:59",
            "noticeTime": "15:00",
            "enableCaptcha": "Y"
          },
          "stateCode": 0
        },
        "stateCode": 0
      }      
      {
        "data": {
          "data": {
            "result": "达到最大限购次数",
            "signInfo": {
              "choosed": true,
              "choosedDay": "2020-07-09",
              "cityName": "苏州市",
              "limitDate": "2020年07月12日 15:00",
              "orderCreated": true,
              "shopCode": "206076",
              "shopName": "苏州新湖店",
              "signCount": 525
            },
            "isSigned": 1,
            "topImage": "http://appres.crv.com.cn/images/maotai/head_118.png",
            "bottomImage": "http://appres.crv.com.cn/images/maotai/detail_118.png",
            "datePeriod": "07月01日 00:00 ~ 07月31日 23:59",
            "type": 0,
            "noticeTime": "15:00"
          },
          "stateCode": 0
        },
        "stateCode": 0
      }
     */
    let { userId, sessionId, mobile, ncmsMemberId, unique } = userInfo
    Headers = Object.assign({}, Headers, {
      unique,
      userId,
      userSession: sessionId
    })
    let queryString = `{"presaleRuleId":"118","ncmsMemberId":"${ncmsMemberId}","mobile":"${mobile}","presaleTime":"${tool.parseTime(new Date(), '{y}/{m}/{d}')} 22:00","preSaleTimeId":352}`
    let options = {
      method: 'GET',
      uri: APPLY_SHOP_URL,
      // proxy: 'http://127.0.0.1:8888',
      // rejectUnauthorized: false,
      qs: {
          param: queryString // -> uri + '?access_token=xxxxx%20xxxxx'
      },
      headers: Headers,
      json: true
    }
    return httpRequest(options, 'getApplyShop')
  },
  getApplyStatus(ctx) {
    /**
     * @param {"ruleId":"118","code":"206076"}
     * @return {
        "data": {
          "city": {
            "cityId": 1081,
            "cityName": "苏州市"
          },
          "countDown": 31228,
          "goodsInfo": [{
            "description": "",
            "goodsId": 9314611,
            "iamgeUrl": "",
            "name": "",
            "preSaleStockCycleId": 10432,
            "productId": 84317
          }],
          "isOfflineActivity": "0",
          "nextStartTime": "",
          "offlineActivityId": "",
          "preSaleRuleId": 118,
          "preSaleTimeId": 352,
          "saleCount": 6,
          "saleTime": "2020/07/09 22:00",
          "serviceStatus": "NORMAL",
          "status": "BEGINNING",
          "store": {
            "cityId": 0,
            "cityName": "",
            "code": "206076",
            "distance": 0,
            "endTime": null,
            "latitude": "",
            "longitude": "",
            "psId": 679,
            "saleCount": 0,
            "startTime": null,
            "storeName": "苏州新湖店",
            "storesAddress": ""
          }
        },
        "stateCode": 0
      }
      {
        "data": {
          "city": {
            "cityId": 1081,
            "cityName": "苏州市"
          },
          "countDown": 41791,
          "goodsInfo": [{
            "description": "",
            "goodsId": 9314611,
            "iamgeUrl": "",
            "name": "",
            "preSaleStockCycleId": 10432,
            "productId": 84317
          }],
          "isOfflineActivity": "0",
          "nextStartTime": "",
          "offlineActivityId": "",
          "preSaleRuleId": 118,
          "preSaleTimeId": 352,
          "saleCount": 6,
          "saleTime": "2020/07/10 22:00",
          "serviceStatus": "NORMAL",
          "status": "BEGINNING",
          "store": {
            "cityId": 0,
            "cityName": "",
            "code": "206076",
            "distance": 0,
            "endTime": null,
            "latitude": "",
            "longitude": "",
            "psId": 679,
            "saleCount": 0,
            "startTime": null,
            "storeName": "苏州新湖店",
            "storesAddress": ""
          }
        },
        "stateCode": 0
      }
     */
    let { userId, userSession, shopCode } = ctx.session
    Headers = Object.assign({}, Headers, {
      userId,
      userSession
    })
    let queryString = `{"ruleId":"118","code":"${shopCode}"}`
    let options = {
      method: 'GET',
      uri: APPLY_STATUS_URL,
      // proxy: 'http://127.0.0.1:8888',
      // rejectUnauthorized: false,
      qs: {
          param: queryString // -> uri + '?access_token=xxxxx%20xxxxx'
      },
      headers: Headers,
      json: true
    }
    return httpRequest(options, 'getApplyStatus')
  },
  getJifenStatus(userInfo) {
    let { userId, sessionId, unique } = userInfo
    Headers = Object.assign({}, Headers, {
      unique,
      userId,
      userSession: sessionId
    })
    let queryString = `{"page":"1","pageCount":"12","pointsType":"","storeCode":""}`
    let options = {
      method: 'POST',
      uri: JIFEN_URL,
      // proxy: 'http://127.0.0.1:8888',
      // rejectUnauthorized: false,
      qs: {
          param: queryString // -> uri + '?access_token=xxxxx%20xxxxx'
      },
      headers: Headers,
      json: true
    }
    return httpRequest(options, 'getJifenStatus')
  }
}
