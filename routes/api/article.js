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
    const findResult = await Article.find({secret: false}).sort({ date: -1 });
    // console.log(findResult);
    if(findResult.length === 0){
        ctx.status = 400;
        ctx.body = {
            message: '没有任何数据'
        }
    }else{
        ctx.body = findResult;
    }
});

/*
@route GET /api/article/:size/:page
@desc 分页获取文章
 */
router.get('/:size/:page', async ctx => {
    // console.log('我进来了');
    // console.log(ctx.params.size);
    // console.log(ctx.params.page);
    const size = parseInt(ctx.params.size);
    const page = parseInt(ctx.params.page);
    const findResult = await Article.find({secret: false}).sort({ date: -1 });
    // console.log(findResult);
    if(findResult.length > 0){
        const totalArticles = findResult.length;
        let resultList = [];
        const num = size * (page - 1);  //前面已经加载了的数量
        if(num < totalArticles){
            // console.log(num + size);
            if((num + size) < totalArticles){
                resultList = findResult.slice(num, num + size);
            }else{
                resultList = findResult.slice(num);
            }
        }else{
            ctx.status = 400;
            ctx.body = {
                message: '没有任何数据',
                totalArticles: totalArticles
            }
            return;
        }
        // console.log(totalArticles);
        // console.log(resultList);
        ctx.status = 200
        ctx.body = {
            totalArticles: totalArticles,
            data: resultList
        }
    }else{
        ctx.status = 400;
        ctx.body = {
            message: '没有任何数据',
            totalArticles: 0
        }
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
        // 生成文章的专属路径
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
        if(tagList.length > 0){
            tagList.map(item => {
                tags.unshift({name: item});
            });
        }
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
        ctx.body = { message: '文章发布成功！' }
    }
);

/*
@route POST /api/article/secret
@desc 私密接口，保存为草稿
 */
router.post('/secret', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const { errors, isValid } = validatePostInput(ctx.request.body);
        // 判断是否验证通过
        if (!isValid) {
            ctx.status = 400;
            ctx.body = errors;
            return;
        }
        // 生成文章的专属路径
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
            if(findPath.length > 0 || path === 'secret'){ //这里要预防超权问题
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
        if(tagList.length > 0){
            tagList.map(item => {
                tags.unshift({name: item});
            });
        }
        const toPost = {
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            path: path,
            classify: ctx.request.body.classify,
            tags: tags,
            secret: true
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
        ctx.body = { message: '草稿保存成功！' }
    }
);

/*
@route GET /api/article/:path
@desc 公开接口，获取未加密的文章
 */
router.get('/:path', async ctx => {
    // console.log(ctx.params.path);
    const findResult = await Article.find({path: ctx.params.path, secret: false});
    if(findResult.length > 0){
        const addVisited = findResult[0];
        addVisited.visited += 1;
        const dataChange = await Article.findOneAndUpdate(
            { path: ctx.params.path },
            { $set: addVisited },
            { new: true }
        ); 
        // console.log(dataChange);
        ctx.body = findResult[0];
    }else{
        ctx.status = 400;
        ctx.body = { message: '路径不正确！'};
    }
});



/*
@route GET /api/article/
@desc 私密接口，保存为草稿
 */
router.get('/secret/:path', passport.authenticate('jwt', { session: false }),async ctx => {
    //这个地方还需要进一步加密，判断用户是不是博主
    const findResult = await Article.find({path: ctx.params.path, secret: true});
    if(findResult.length > 0){
        ctx.body = findResult[0];
    }else{
        ctx.status = 400;
        ctx.body = { message: '路径不正确！'};
    }
});

module.exports = router.routes();
