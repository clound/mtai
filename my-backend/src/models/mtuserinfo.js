/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-07-10 12:50:08
 * @LastEditTime: 2021-03-16 11:04:34
 */
'use strict'

module.exports = function (sequelize, DataTypes) {
  const MtUserInfo = sequelize.define(
    'mtuserinfo',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false, //非空
        autoIncrement: true, //自动递增
        primaryKey: true, //主键
        unique: true,
      },
      uname: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名'
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '手机号'
      },
      choosed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: '是否中签'
      },
      choosedDay: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '中签时间'
      },
      zqgq: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
        comment: '中秋国庆活动'
      },
      mt15: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
        comment: '15茅台中签活动'
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '中签城市店铺'
      },
      limitDate: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '最晚支付时间'
      },
      orderCreated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: '订单是否创建'
      },
      jifen: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
        comment: '最新12条消费记录'
      },
      tipInfo: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'result 返回信息'
      }
    },
    {
      indexes: [{
        unique: true,
        fields: ['user_id']
      }],
      freezeTableName: true,
      comment: '茅台用户查询信息',
    }
  )
  // MtUserInfo.associate = function (models) {
  //   User.belongsTo(models.mtuser)
  // }
  // User.getUsers = function (options) {
  //   return this.findOne(options)
  // }
  return MtUserInfo
}
