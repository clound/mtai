/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 15:12:28
 * @LastEditTime: 2020-06-17 15:43:29
 */ 
'use strict'

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false, //非空
        autoIncrement: true, //自动递增
        primaryKey: true, //主键
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      comment: '用户信息',
    }
  )
  User.associate = function (models) {
    // User.hasMany(models.topic, {
    //   as: 'Topics',
    //   foreignKey: 'user_id',
    //   targetKey: 'id',
    // })
    User.hasOne(models.usercheckin, {
      as: 'CheckIn',
      foreignKey: 'user_id',
      targetKey: 'id',
    })
  }
  User.getUsers = function (options) {
    return this.findOne(options)
  }
  return User
}
