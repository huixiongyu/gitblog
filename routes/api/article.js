const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const crypto = require('crypto');
const Article = require('../../models/Article');
const Tag = require('../../models/Tag');
const validatePostInput = require('../../validation/article');

//检测是否存在特殊字符
function checkIsHasSpecialStr(str){
    let myReg = /[~!@#$%^&*()/\|,.<>?"'();:+=\[\]{}]/;
    return myReg.test(str);
}

//测试
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = { msg: 'article works...' };
});

/*
@router  GET /api/article
@desc 公开接口，获取所有分类
 */
router.get('/', async ctx=> {
    const findResult = await Article.find({screte: false});
    if(findResult.length === 0){
        ctx.status = 200;
        ctx.body = {
            message: '没有任何数据',
            data: []
        }
    }else{
        ctx.body = findResult;
    }
});

/*
@route GET /api/article
@desc 私密接口，增加文章
 */
router.get('/secrete', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const findResult = await Article.find({screte: true});
        if(findResult.length === 0){
            ctx.status = 200;
            ctx.body = {
                message: '没有任何数据',
                data: []
            }
        }else{
            ctx.body = findResult;
        }
    }
);


/*
@route POST /api/article
@desc 私密接口，增加文章
 */
router.post('/', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const { errors, isValid } = validatePostInput(ctx.request.body);
        // 判断是否验证通过
        if (!isValid) {
            ctx.status = 400;
            ctx.body = errors;
            return;
        }
        // 生产文章的专属路径
        let path = ctx.request.body.path;
        if(path === ''){
            let current_date = (new Date()).valueOf().toString();
            let random = Math.random().toString();
            path = crypto.createHash('sha1').update(current_date + random).digest('hex');
            console.log(path);
        }else if(checkIsHasSpecialStr(path)){
            ctx.status = 400;
            ctx.body = {path: "路径存在非法字符！"};
            return;
        }
        else{
            const findPath = await Article.find({path: path});
            if(findPath.length > 0){
                ctx.status = 400;
                ctx.body = { path: '该路径已经存在！'};
                return ;
            }
        }
        console.log(ctx.state.user.username);
        // 处理标签
        let tags = ctx.request.body.tags;
        let tagList = tags.split(',');
        for(let item of tagList){
            const findTag= await Tag.find({ name: item });
            if(findTag.length > 0){
                console.log(item);
            }else{
                const newTag = new Tag({
                    name: item
                });
                // 存储到数据库
                await newTag
                    .save()
                    .catch(err => {
                        console.log(err)
                    });
            }
        }
        tags = [];
        tagList.map(item => {
            tags.unshift({name: item});
        });
        const toPost = {
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            path: path,
            classify: ctx.request.body.classify,
            tags: tags,
            secret: false
        };
        const newArticle= new Article(toPost);
        // 存储到数据库
        await newArticle
            .save()
            .catch(err => {
                console.log(err)
            });
        console.log(`标签：${newArticle}创建成功！`)
        //
        // 返回json数据
        ctx.body = { message: '新分类创建成功！' }
    }
);

module.exports = router.routes();