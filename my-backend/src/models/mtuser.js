/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-10 12:50:08
 * @LastEditTime: 2020-07-11 21:58:42
 */ 
'use strict'

module.exports = function (sequelize, DataTypes) {
  const MtUser = sequelize.define(
    'mtuser',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false, //非空
        autoIncrement: true, //自动递增
        primaryKey: true, //主键
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passwd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unique: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户设备Id'
      },
    },
    {
      freezeTableName: true,
      comment: '茅台用户信息',
    }
  )
  MtUser.associate = function (models) {
    MtUser.hasOne(models.mtuserinfo, {
      as: 'mtuserinfo',
      foreignKey: 'user_id',
      targetKey: 'id',
    })
  }
  // User.getUsers = function (options) {
  //   return this.findOne(options)
  // }
  return MtUser
}
