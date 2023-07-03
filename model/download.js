const  Sequelize  = require('sequelize')
const sequelize = require('../util/database')
const Download = sequelize.define('downloaded',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    file:{
        type:Sequelize.STRING,
        allowNull : false
    }
})
module.exports = Download