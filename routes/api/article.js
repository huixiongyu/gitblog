const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const crypto = require('crypto');
const Article = require('../../models/Article');
const Tag = require('../../models/Tag');
const User = require('../../models/User');
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
@route GET /api/article/secret
@desc 私密接口，获取私密的文章
 */
router.get('/secret', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const findResult = await Article.find({scret: true});
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
        }else{
            const findPath = await Article.find({path: path});
            if(findPath.length > 0){
                ctx.status = 400;
                ctx.body = { path: '该路径已经存在！'};
                return ;
            }
        }
        //现在设置可以保存的文章
        const toPost = {};
        toPost.title = ctx.request.body.title;
        toPost.content = ctx.request.body.content;
        toPost.path = path;
        toPost.classify = ctx.request.body.classify;
        toPost.secret = false;
        // 处理标签
        let tags = ctx.request.body.tags;
        tags.replace(/\s+/g,"");
        if(tags !== ''){
            let tagList = tags.split(','); 
            console.log(`我存储的tagList是${tagList}`);
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
            let newTags = [];
            if(tagList.length > 0){
                tagList.forEach(item => {
                    newTags.unshift({name: item});
                });
                toPost.tags = newTags;
            }
        }
        const newArticle= new Article(toPost);
        // 存储到数据库
        await newArticle
            .save()
            .catch(err => {
                console.log(err)
            });
        // console.log(`标签：${newArticle}创建成功！`)
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
    }else{
        const findPath = await Article.find({path: path});
        if(findPath.length > 0){
            ctx.status = 400;
            ctx.body = { path: '该路径已经存在！'};
            return ;
        }
    }
    //现在设置可以保存的文章
    const toPost = {};
    toPost.title = ctx.request.body.title;
    toPost.content = ctx.request.body.content;
    toPost.path = path;
    toPost.classify = ctx.request.body.classify;
    toPost.secret = true;
    // 处理标签
    let tags = ctx.request.body.tags;
    tags.replace(/\s+/g,"");
    if(tags !== ''){
        let tagList = tags.split(','); 
        console.log(`我存储的tagList是${tagList}`);
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
        let newTags = [];
        if(tagList.length > 0){
            tagList.forEach(item => {
                newTags.unshift({name: item});
            });
            toPost.tags = newTags;
        }
    }
    const newArticle= new Article(toPost);
    // 存储到数据库
    await newArticle
        .save()
        .catch(err => {
            console.log(err)
        });
    // console.log(`标签：${newArticle}创建成功！`)
    //
    // 返回json数据
    ctx.body = { message: '文章发布成功！' }
}
);
/* 
@route POST /api/article/star/
@desc 私密接口，需要登录才能设置
*/
router.post('/like', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const username = ctx.request.body.username;
        const path = ctx.request.body.path;
        const articleInfo = await Article.find({path: path});
        if(articleInfo.length > 0){
            const starList = articleInfo[0].stars;
            if(starList.length > 0){
                const isLike = starList.filter(item => item.user ===username).length > 0;
                console.log(starList);
                if (isLike) {
                    ctx.status = 400;
                    ctx.body = { message: '该用户已赞过' };
                    return;
                }else{
                    const newLike = {user: username};
                    const starsUpdate = await Article.findOneAndUpdate(
                        { path: path },
                        { $push: {stars: newLike} },
                        { $sort: 1,new: true }
                    ); 
                    ctx.status = 200;
                    ctx.body =starsUpdate;
                    return ;
                }
            }else{
                const newLike = {user: username};
                const starsUpdate = await Article.findOneAndUpdate(
                    { path: path },
                    { $push: {stars: newLike} },
                    { $sort: 1,new: true }
                );  
                ctx.status = 200;
                ctx.body =starsUpdate;
                return ;
            }
        }else{
            ctx.status = 400;
            ctx.body = {message: '文章不存在！'};
        }

    }
);
/* 
@route POST /api/article/unlike
@desc 私密接口，需要登录才能设置
*/
router.post('/unlike', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const username = ctx.request.body.username;
        const path = ctx.request.body.path;
        const articleInfo = await Article.find({path: path});
        if(articleInfo.length > 0){
            const starList = articleInfo[0].stars;
            if(starList.length > 0){
                const isExit = starList.filter(item => item.user ===username).length > 0;
                console.log(starList);
                if (!isExit) {
                    ctx.status = 400;
                    ctx.body = { message: '还没点赞呢' };
                    return;
                }else{
                    const removeIndex = 0;
                    for(let item in starList){
                        if(item.user === username)
                            removeIndex = item
                    }
                    starList.splice(removeIndex, 1);
                    const starsUpdate = await Article.findOneAndUpdate(
                        { path: path },
                        { $set: {stars: starList} },
                        { $sort: 1,new: true }
                    ); 
                    ctx.status = 200;
                    ctx.body =starsUpdate;
                    return ;
                }
            }else{
                ctx.status = 400;
                ctx.body = { message: '还没点赞呢' };
                return;
            }
        }else{
            ctx.status = 400;
            ctx.body = {message: '文章不存在！'};
        }

    }
);

/* 
@route GET /api/article/comment?path=xxxx
@desc 获取评论列表
*/
router.get('/comment', async ctx => {
    // console.log(ctx.request.body.path);
    const articleInfo = await Article.find({path: ctx.query.path});
    const resultList = [];
    if(articleInfo.length > 0){
        const commentList = articleInfo[0].comments;
        // console.log(commentList);
        if(commentList.length === 0 ){
            ctx.body = resultList;
            return;
        }else{
            for(let item of commentList){
                // console.log(resultList);
                const commentItem = {
                    id: item.id,
                    from: item.from,
                    to: item.to,
                    comment: item.comment,
                    date: item.date,
                    read: item.read
                }
                let fromResult = await User.find({username: commentItem.from});
                let fromInfo = fromResult[0];
                commentItem.avatar = fromInfo.avatar;
                // console.log(commentItem);
                resultList.push(commentItem);
                // console.log(resultList);
            }
            // console.log(resultList);
            ctx.status = 200;
            ctx.body =resultList;
            return ;
        }
    }else{
        ctx.body = {
            data: []
        };
        return;        
    }     
}
);

/* 
@route POST /api/article/comment/
@desc 私密接口，需要登录才能提交评论
*/
router.post('/comment', passport.authenticate('jwt', { session: false }),
    async ctx => {
        if(ctx.request.body.comment === ''){
            ctx.status = 400;
            ctx.body = {
                message: '评论不能为空'
            };
            return;
        }
        // console.log(ctx.request.body.from)
        // console.log(ctx.request.body.to)
        // console.log(ctx.request.body.comment)
        const from = await User.find({username: ctx.request.body.from});
        const to = await User.find({username: ctx.request.body.to});
        const articleInfo = await Article.find({path: ctx.request.body.path});
        if((from.length > 0) && (to.length > 0) && (articleInfo.length > 0)){
            const newComment = {
                from: ctx.request.body.from,
                to: ctx.request.body.to,
                comment: ctx.request.body.comment,
                date: Date.now(),
                read: false
            };
            // articleInfo[0].comments.unshift(newComment);
            const commentUpdate = await Article.findOneAndUpdate(
                { path: ctx.request.body.path },
                { $push: {comments: newComment} },
                { $sort: 1,new: true }
            );    
            console.log(commentUpdate);
            ctx.body =  { message: '评论插入成功！' };
            ctx.status = 200;
        }else {
            ctx.status = 404;
            ctx.body = {message: '查找不到用户！'};
        }
   
    }
);

/**
 * @route DELETE api/aritcle/comment?path=xxxx
 * @desc  删除某条评论，只有管理员和用户自己可以操作
 * @access 接口是私有的
 */
router.post('/comment/delete',passport.authenticate('jwt', { session: false }),
    async ctx => {
        console.log(ctx.request.body);
        const id = ctx.request.body.id;
        const from = ctx.request.body.from;
        const owner = ctx.request.body.username;
        const path = ctx.request.body.path;
        if(from !== owner){
            ctx.status = 401;
            ctx.body = {message: '错误的请求！'};         
            return ;   
        }else{
            const article = await Article.find({path: path});
            if (article.length > 0) {
                const commentList = article[0].comments;
                const idExist = commentList.filter(item => item.id === id)
                if (idExist.length === 0) {
                  ctx.status = 400;
                  ctx.body = { error : '该评论不存在' };
                  return;
                }
          
                // 获取要删掉的评论 id
                const removeIndex = commentList
                  .map(item => item.id)
                  .indexOf(id);
                console.log(removeIndex);
                article[0].comments.splice(removeIndex, 1);
                console.log(article);
                const articleUpdate = await Article.findOneAndUpdate(
                  { path: path },
                  { $set: {comments: article[0].comments} },
                  { new: true }
                );
                ctx.body = articleUpdate;
            } else {
                ctx.status = 404;
                ctx.body = { error: '文章不存在' };
            }            
        }
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

/*
@route DELETE /api/article/admin/:id
@desc 私密接口，删除指定id的文章
*/
router.delete('/admin/:id', passport.authenticate('jwt', { session: false }),async ctx => {
   const id = ctx.params.id;
   const findResult = await Article.findById(id);
   if(!findResult){
        ctx.status = 400;
        ctx.body = { message: '删除失败！'};
        return ; 
   }
   const deleteResult =await Article.deleteOne({_id: id});
   if(deleteResult.ok === 1){
       console.log('response');
       ctx.status = 200;
       ctx.body = { message: '成功删除！'};
       return;
   }   
});


/*
@route GET /api/article/admin/:type/:size/:page
@desc 私密接口，后台获取所有文章，包括草稿，所以需要身份验证
@detail type包括all、secret和open
@response 文章总数、当前页面的文章
*/
router.get('/admin/:type/:size/:page', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const articleType = ctx.params.type;
        const size = ctx.params.size;
        const page = ctx.params.page;
        let findArticle = [];
        if(articleType === 'all'){
            findArticle = await Article.find({});
        }else if(articleType === 'open'){
            findArticle = await Article.find({secret: false});
        }else if(articleType === 'secret'){
            findArticle = await Article.find({secret: true});
        }else{
            ctx.status = 400;
            ctx.body = { message: '路径不正确！'};
            return ;
        }
        if(findArticle.length > 0){
            const totalArticles = findArticle.length;
            let resultList = [];
            const num = size * (page - 1);  //前面已经加载了的数量
            if(num < totalArticles){
                if((num + size) < totalArticles){
                    resultList = findArticle.slice(num, num + size);
                }else{
                    resultList = findArticle.slice(num);
                }
            }else{
                ctx.status = 400;
                ctx.body = {
                    message: '没有任何数据',
                    totalArticles: totalArticles
                }
                return;
            }
            const responseList = [];
            for(let item of resultList){
                const child = {
                    title: item.title,
                    date: item.date,
                    comment: item.comments.length,
                    secret: item.secret,
                    id: item._id,
                    classify: item.classify
                }
                responseList.push(child);
            }
            ctx.status = 200
            ctx.body = {
                totalArticles: totalArticles,
                data: responseList
            }
        }else{
            ctx.status = 400;
            ctx.body = {
                message: '没有任何数据',
                totalArticles: 0
            }
            return ;
        }        
});

module.exports = router.routes();
