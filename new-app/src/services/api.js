/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-17 22:41:04
 * @LastEditTime: 2020-07-22 10:36:23
 */ 
export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user/info',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',
  signupUser: 'POST /user/signup',

  queryUser: '/user/:id',
  queryUserList: '/user/userlist',
  updateUser: 'POST /user/update/:id',
  createUser: 'POST /user/signup',
  removeUser: 'POST /user/delete/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  queryAccounts: '/mtai/getAccounts',

  queryAccountList: 'POST /mtai/getUserInfos',
  addAccount: 'POST /mtai/addAccount',
  importAccounts: 'POST /mtai/importAccounts',
  refreshAccount: '/mtai/refreshAccount',
  updateAccount: 'POST /mtai/updateAccount',
  deleteAccount: 'POST /mtai/deleteAccount',
}
