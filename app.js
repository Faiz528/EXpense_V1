require('dotenv').config();
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const Parser = require('body-parser')
const sequelize = require('./util/database')
const cors = require('cors')
const User = require('./model/user')
const Expenses = require('./model/expense')
const Order = require('./model/order')
const forgotPassword = require('./model/forgotpassword')
const Downloaded = require('./model/download')
const helmet = require('helmet')
const compressions = require('compression')
const morgan = require('morgan')

const accessLog = fs.createWriteStream(
  path.join(__dirname,'access.log'),{flags:'a'}
)
app.use(Parser.json({extended:false}))
app.use(cors())
app.use(express.static('public'));
app.use(helmet())
app.use(compressions())
app.use(morgan('combined',{stream:accessLog}))

const Signup = require('./expenses/route/sign')
app.use(Signup)
const Login = require('./expenses/route/log')
app.use(Login)
const Expense = require('./expenses/route/expense')
app.use(Expense)
const Password = require('./expenses/route/forgot')
app.use(Password)



User.hasMany(Expenses)
Expenses.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(forgotPassword)
forgotPassword.belongsTo(User)

User.hasMany(Downloaded)
Downloaded.belongsTo(User)


sequelize.
sync().then(result=>{
  app.listen(3000)
}).catch(err=>{
    console.log(err)
})