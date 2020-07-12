/*
 * @Descripttion: File Description
 * @version: 0.0.1
 * @Author: cloud
 * @Date: 2020-06-17 15:36:39
 * @LastEditTime: 2020-06-17 15:37:03
 */ 
'use strict'

var config = require('../config/mysql')
var Sequelize = require('sequelize')
var db = {
  sequelize: new Sequelize(
    config.sequelize.database,
    config.sequelize.username,
    config.sequelize.password,
    config.sequelize
  ),
}
db.User = db.sequelize.import('../model/user.js');
// db.Crawel = db.sequelize.import('../model/crawel.js')
// db.Student = db.sequelize.import('../model/students.js')
// db.course = db.sequelize.import('../model/course.js')
// db.Selcourse = db.sequelize.import('../model/selcourse.js')

// db.Student.belongsToMany(db.course, {
//   through: {
//     model: db.Selcourse,
//     unique: false,
//   },
//   foreignKey: 'sid',
// })

// db.course.belongsToMany(db.Student, {
//   through: {
//     model: db.Selcourse,
//     unique: false,
//   },
//   foreignKey: 'cid',
//   onDelete: 'NO ACTION',
// })

// db.sequelize.sync();
module.exports = db
