/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 15:35:54
 * @LastEditTime: 2020-06-17 15:36:05
 */ 
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'usercheckin',
    {
      id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      userId: {
        type: DataTypes.BIGINT(11),
        field: 'user_id',
        unique: true,
        comment: '用户Id'
      },
      loginIp: {
        type: DataTypes.STRING,
        field: 'login_ip',
        allowNull: false,
        defaultValue: '',
        validate: { isIP: true },
        comment: '登录IP'
      }
    },
    {
      timestamps: true,
      tableName: 'userCheckin',
      comment: '用户登录信息',
      indexes: [
        {
          name: 'usercheckin_userId',
          method: 'BTREE',
          fields: ['user_id']
        }
      ]
    }
  )
}