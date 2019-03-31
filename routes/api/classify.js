const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const Classify = require('../../models/Classify');

/*
@router  GET api/classify
@desc 公开接口，获取所有分类
 */
router.get('/', async ctx=> {
   const findResult = await Classify.find();
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
@router  POST api/classify
@desc 私密接口，需要登录权限
 */
router.post('/', passport.authenticate('jwt', { session: false }),
    async ctx => {
        // 存储到数据库
        const findResult = await Classify.find({ name: ctx.request.body.name });
        if (ctx.request.body.name === ''  ) {
            ctx.status = 500;
            ctx.body = { Classify: '分类不能为空！' };
        } else if(findResult.length > 0){
            ctx.status = 500;
            ctx.body = { Classify: '该分类已经存在！' };
        }else{
            const newClass= new Classify({
                name: ctx.request.body.name
            });
            // 存储到数据库
            await newClass
                .save()
                .catch(err => {
                    console.log(err)
                });
            // console.log(`标签：${newClass}创建成功！`)
            //
            // 返回json数据
            ctx.body = { message: '新分类创建成功！' }
        }
    });

/**
 * @route DELETE api/classfiy
 * @desc  删除整个分类，有子类的时候会增加复杂度
 * @access 接口是私有的
 */

router.delete('/', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const classify = await Classify.deleteOne({ name: ctx.request.body.name });
        console.log(classify.deletedCount);
        if (classify.deletedCount === 0) {
            ctx.status = 404;
            ctx.body = { error: '该分类不存在' };
        } else {
            ctx.status = 200;
            ctx.body = { success: true };
        }
    }
);

/**
 * @route PATCH api/classfiy
 * @desc  修改分类的名字，有子类的时候会增加复杂度
 * @access 接口是私有的
 */

router.patch('/', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const findResult = await Classify.find({ name: ctx.request.body.oldClass });
        if(findResult.length === 0){
            ctx.status = 500;
            ctx.body = { Classify: '该分类不存在！' };
        }else{
            if(ctx.request.body.newClass === ''){
                ctx.status = 500;
                ctx.body = { Classify: '改变的分类名称不可以为空！' };
            }else{
                const classifyUpdate = await Classify.findOneAndUpdate(
                    { name: ctx.request.body.oldClass },
                    { $set: {name : ctx.request.body.newClass }},
                    { new: true}
                    );
                ctx.body = classifyUpdate;
            }
        }
    }
);

/*
@router  GET api/classify/child
@desc 公开接口，获取所有分类
 */
router.get('/child', async ctx=> {
    console.log(ctx.query.name);
    const findResult = await Classify.find({name: ctx.query.name});
    if(findResult.length === 0){
        ctx.status = 200;
        ctx.body = {
            message: '没有任何数据',
            data: []
        }
    }else{
        ctx.status = 200;
        ctx.body = findResult[0].children;
    }
});


/*
@router  POST api/classify/child
@desc 私密接口，需要登录权限
@detail  添加子类  如果子类存在则不能插入
 */
router.post('/child', passport.authenticate('jwt', { session: false }),
    async ctx => {
        // 查询数据库
        const findResult = await Classify.find({ name: ctx.request.body.name });
        console.log(findResult);
        if(findResult.length === 0){
            ctx.status = 500;
            ctx.body = { Classify: '该分类不存在！' };
        }else{
            console.log(findResult[0].children.some(item => item.name === ctx.request.body.child));
            if(findResult[0].children.some(item => item.name === ctx.request.body.child)){
                ctx.status = 500;
                ctx.body = { Classify: '该子类已经存在！' };
            }else{
                const newChild = {
                    name: ctx.request.body.child,
                    amount: 0,
                    date: Date.now()
                };
                findResult[0].children.unshift(newChild);
                const classifyUpdate = await Classify.update(
                    {name: ctx.request.body.name},
                    {$push: {children: newChild}},
                    {$sort: 1}
                );
                console.log(classifyUpdate);
                if(classifyUpdate.ok ===1 ){
                    const updateResult = await Classify.find({ name: ctx.request.body.name });
                    if (updateResult.length > 0) {
                        ctx.status = 200;
                        ctx.body = updateResult;
                    }else{
                        ctx.status = 500;
                        ctx.body = { message: '服务器错误'}
                    }
                }else{
                    ctx.status = 500;
                    ctx.body = { message: '数据更新失败！'};
                }
            }
        }
    });

/*
@router  DELETE api/classify/child
@desc 私密接口，需要登录权限
@detail 删掉子类
 */
router.delete('/child', passport.authenticate('jwt', { session: false }),
    async ctx => {
        // 查询数据库
        const findResult = await Classify.find({ name: ctx.request.body.name });
        console.log(findResult);
        if(findResult.length === 0){
            ctx.status = 500;
            ctx.body = { Classify: '该分类不存在！' };
        }else{
            if (findResult[0].children.length > 0) {
                // 找元素下标
                const removeIndex = findResult[0].children
                    .map(item => item.name)
                    .indexOf(ctx.request.body.child);
                // 删除
                findResult[0].children.splice(removeIndex, 1);
                // 更新数据库
                const classUpdate = await Classify.findOneAndUpdate(
                    {name: ctx.request.body.name},
                    {$set: findResult[0]},
                    {new: true}
                );
                ctx.body = classUpdate;
            }else {
                ctx.status = 404;
                ctx.body = { errors: '没有任何数据' };
            }
        }
    });

/**
 * @route PATCH api/classfiy/child
 * @desc  修改子类的名字
 * @access 接口是私有的
 */

router.patch('/child', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const findResult = await Classify.find({name: ctx.request.body.name});
        if (findResult.length === 0) {
            ctx.status = 500;
            ctx.body = {Classify: '该分类不存在！'};
        } else {
            if (findResult[0].children.length > 0) {
                //要插入的元素不能跟原有的数据重名
                if(findResult[0].children.some(item => item.name === ctx.request.body.newChild)){
                    ctx.status = 500;
                    ctx.body = {errors: '要更改的名字跟之前的重名啦～～'};
                }else{
                    // 找元素下标
                    const modifyIndex = findResult[0].children
                        .map(item => item.name)
                        .indexOf(ctx.request.body.oldChild);
                    // 删除
                    findResult[0].children[modifyIndex].name = ctx.request.body.newChild;
                    // 更新数据库
                    const classUpdate = await Classify.findOneAndUpdate(
                        {name: ctx.request.body.name},
                        {$set: findResult[0]},
                        {new: true}
                    );
                    ctx.body = classUpdate;
                }
            } else {
                ctx.status = 404;
                ctx.body = {errors: '没有任何数据'};
            }
        }
    }
);

module.exports = router.routes();