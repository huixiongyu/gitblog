const Router = require('koa-router')
const router = new Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const tools = require('../../config/tools')

// 引入User模型
const User = require('../../models/User')

// 引入字段验证
const validateRegisterInput = require('../../validation/register')

//测试路由
router.get('/test', async ctx => {
    ctx.status = 200
    ctx.body = { msg: 'users works...' }
})

/*
@router  api/users/register
@desc 公开接口
 */
router.post('/register', async ctx => {
    const { errors, isValid } = validateRegisterInput(ctx.request.body)
    // 判断是否验证通过
    if (!isValid) {
        ctx.status = 400
        ctx.body = errors
        return
    }
    // 存储到数据库
    const findResult = await User.find({ email: ctx.request.body.email });
    if (findResult.length > 0) {
        ctx.status = 500
        ctx.body = { email: '邮箱已被占用' }
    } else {
        const avatar = gravatar.url(ctx.request.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        const newUser = new User({
            username: ctx.request.body.username,
            email: ctx.request.body.email,
            avatar,
            password: tools.enbcrypt(ctx.request.body.password)
        })

        // 存储到数据库
        await newUser
            .save()
            .catch(err => {
                console.log(err)
            });

        // 返回json数据
        ctx.body = { message: '注册成功！' }
    }
})

module.exports = router.routes()