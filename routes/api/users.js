const Router = require('koa-router')
const router = new Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const tools = require('../../config/tools')

// 引入User模型
const User = require('../../models/User')

//测试路由
router.get('/test', async ctx => {
    ctx.status = 200
    ctx.body = { msg: 'users works...' }
})


module.exports = router.routes();