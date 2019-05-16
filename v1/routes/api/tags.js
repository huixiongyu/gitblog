const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const Tag = require('../../models/Tag');

/*
@router  POST api/tags
@desc 私密接口，需要登录权限
 */
router.post('/', passport.authenticate('jwt', { session: false }),
    async ctx => {
    // 存储到数据库
    const findResult = await Tag.find({ name: ctx.request.body.newTag });
    if (ctx.request.body.newTag === ''  ) {
        ctx.status = 500;
        ctx.body = { Tag: '标签不能为空！' };
    } else if(findResult.length > 0){
        ctx.status = 500;
        ctx.body = { Tag: '标签已经存在！' };
    }else{
        const newTag = new Tag({
            name: ctx.request.body.newTag
        });
        // 存储到数据库
        await newTag
            .save()
            .catch(err => {
                console.log(err)
            });
        // console.log(`标签：${newTag}创建成功！`)
        //
        // 返回json数据
        ctx.body = { message: '新标签创建成功！' }
    }
});

/*
@router  GET api/tags
@desc 公开接口,获取所有标签内容
 */
router.get('/',
    async ctx => {
    // 查询数据库
    const findResult = await Tag.find();
    if (findResult.length === 0) {
        ctx.status = 200;
        ctx.body = { message: '标签为空', tags : []};
    } else {
        ctx.status = 200;
        ctx.body = { message: '获取到标签', tags : findResult};
    }
});


/**
 * @route DELETE api/tags/
 * @desc  删除整个用户接口地址
 * @access 接口是私有的
 */

router.post('/delete', passport.authenticate('jwt', { session: false }),
    async ctx => {
        console.log(ctx.request);
        const tag = await Tag.deleteOne({ name: ctx.request.body.name });
        // console.log(tag);
        if (tag.ok === 1) {
            // 有文章的时候需要增加内容，关联文章的Tag删掉
            ctx.status = 200;
            ctx.body = { success: true };
        } else {
            ctx.status = 404;
            ctx.body = { error: '标签不存在' };
        }
    }
);

module.exports = router.routes();