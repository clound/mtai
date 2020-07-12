/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 16:20:06
 * @LastEditTime: 2020-06-17 16:25:56
 */ 
'use strict'
module.exports = function (squelize, DataTypes) {
  const Crawel = squelize.define(
    'crawel',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.STRING(10),
      },
      view: {
        type: DataTypes.STRING(10),
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  )
  return Crawel
}
