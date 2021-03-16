/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-10 12:50:08
 * @LastEditTime: 2021-03-16 14:16:15
 */
'use strict'

module.exports = function (sequelize, DataTypes) {
  const MtUserSession = sequelize.define(
    'mtusersession',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false, //非空
        autoIncrement: true, //自动递增
        primaryKey: true, //主键
        unique: true,
      },
      usession: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
        comment: '用户Session'
      }
    },
    {
      indexes: [{
        unique: true,
        fields: ['user_id']
      }],
      freezeTableName: true,
      comment: '茅台用户登录信息',
    }
  )
  return MtUserSession
}
