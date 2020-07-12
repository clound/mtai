/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-12 14:25:32
 * @LastEditTime: 2020-07-12 16:17:18
 */
import { commonGet, commonPost } from './tools'
export const getImgs = function () {
  return commonGet('/crawel/list')
}
// 登录
export const login = function (params) {
  let { username, password } = { ...params }
  return commonPost('/user/login', {
    username,
    password
  })  
}
// 获取所有数据信息
export const getUserInfos = function (params) {
  let { phone, hit, current, pageSize } = { ...params }
  return commonPost('/mtai/getUserInfos', {
    ...(phone ? { phone } : ''),
    ...(hit ? { choosed: true } : ''),
    page: current,
    limit: pageSize
  })  
}
// 添加账号
export const addAccount = function (params) {
  let { phone, passwd } = { ...params }
  return commonPost('/mtai/addAccount', {
    phone,
    passwd
  })
}
// 导入账号
export const importAccounts = function (accounts) {
  return commonPost('/mtai/importAccounts', {
    data: accounts
  })
}
// 刷新信息
export const refreshInfo = function () {
  return commonGet('/mtai/refreshInfo')
}
// 统计数据
export const getStatistic = function () {
  return commonGet('/mtai/getusers')
}