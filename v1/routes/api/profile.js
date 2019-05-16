const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');

//引入模板
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//字段验证
const validateProfileInput = require('../../validation/profile');

/*
@route GET /api/profile/test
@desc profile接口验证
 */
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = { msg: 'profile works...' };
});


/*
@route POST /api/profile
@desc 添加和编辑profile接口
 */
router.post('/', passport.authenticate('jwt', { session: false }),
    async ctx => {
        const { errors, isValid } = validateProfileInput(ctx.request.body);
        console.log('我进来profile路由了')
        // 判断是否验证通过
        if (!isValid) {
            ctx.status = 400;
            ctx.body = errors;
            return;
        }
        console.log('已经通过验证')
        const profileFields = {};
        console.log(ctx.state);
        profileFields.email = ctx.state.user[0].email;
        profileFields.username = ctx.state.user[0].username;
        console.log(profileFields);
        profileFields.nick = ctx.request.body.nick;
        profileFields.github = ctx.request.body.github;
        console.log(profileFields);
        if (ctx.request.body.company) profileFields.company = ctx.request.body.company;
        if (ctx.request.body.location) profileFields.location = ctx.request.body.location;
        if (ctx.request.body.bio) profileFields.bio = ctx.request.body.bio;
        if (ctx.request.body.website) profileFields.website = ctx.request.body.website;
        if (ctx.request.body.zhihu) profileFields.zhihu = ctx.request.body.zhihu;
        if (ctx.request.body.yuncun) profileFields.yuncun = ctx.request.body.yuncun;
        if (ctx.request.body.weibo) profileFields.weibo = ctx.request.body.weibo;
        console.log(profileFields);

        // 查询数据库
        const profile = await Profile.find({ email: profileFields.email });
        console.log(profile);
        if (profile.length > 0) {
            // 编辑更新
            const profileUpdate = await Profile.findOneAndUpdate(
                { email: profileFields.email },
                { $set: profileFields },
                { overwrite: true, new: true }
            );
            console.log('更新了profile')
            ctx.body = profileUpdate;
        } else {
            await new Profile(profileFields).save().then(profile => {
                console.log('创建了新的profile')
                ctx.status = 200;
                ctx.body = profile;
            });
        }
    }
);

/*
@route GET /api/profile/user?username=xxx
@desc 获取用户信息
 */
router.get('/user', async ctx => {
    const errors = {};
    const username = ctx.query.username;
    console.log(`我进来了！！要找的用户信息是：${username}`);
    const profile = await Profile.find({ username: username });
    const user = await User.find({username: username });
    console.log(`我找到的用户是${profile}`);
    console.log(`我找到的用户是${user}`);
    if (profile.length < 1) {
        errors.noprofile = '未找到该用户信息';
        ctx.status = 404;
        ctx.body = errors;
    } else {
        const newResponse = {};
        newResponse.username = user[0].username;
        newResponse.email = user[0].email;
        newResponse.avatar = user[0].avatar;
        newResponse.nick = profile[0].nick;
        newResponse.location = profile[0].location;
        newResponse.bio = profile[0].bio;
        newResponse.company = profile[0].company;
        newResponse.website = profile[0].website;
        newResponse.github = profile[0].github;
        newResponse.zhihu = profile[0].zhihu;
        newResponse.yuncun = profile[0].yuncun;
        newResponse.weibo = profile[0].weibo;
        ctx.body = newResponse;
    }
});
/*
@route GET /api/profile/followers
@desc 获取所有用户信息，在follower页面显示
@detial 用户名、昵称、bio、头像
 */

router.get('/followers', async ctx => {
    const user = await User.find();
    // console.log(user);
    let len = user.length;
    for(var item = 0; item < len ; item++){
        if(user[item].identity === 'admin'){
            user.splice(item, 1);
            break;
        }
    }
    // console.log(`这是去除admin之后的用户列表${user}`);
    len = user.length;
    let responseList = [];
    for(var i=0;i < len; i++ ){
        const newProfile ={
            username: user[i].username,
            avatar: user[i].avatar
        };
        const profile = await Profile.find({ username: user[i].username });
        // console.log(profile);
        newProfile.nick = profile[0].nick;
        newProfile.bio = profile[0].bio;
        newProfile.company = profile[0].company;
        newProfile.location = profile[0].location;
        newProfile.github = profile[0].github;
        responseList.push(newProfile);
        // console.log(user[i]);
    }
    ctx.body = responseList;
});

/*
@route GET /api/profile/followers/:size/:page
@desc 分页获取注册用户
 */
router.get('/followers/:size/:page', async ctx => {
    const size = parseInt(ctx.params.size);
    const page = parseInt(ctx.params.page);
    const user = await User.find().sort({ date: 1 });;
    // console.log(user);
    let len = user.length;
    for(var item = 0; item < len ; item++){
        if(user[item].identity === 'admin'){
            user.splice(item, 1);
            break;
        }
    }
    // console.log(`这是去除admin之后的用户列表${user}`);
    len = user.length;
    if(len === 0){
        ctx.status = 400;
        ctx.body = {
            message: '没有任何注册用户',
            totalArticles: 0
        }        
    }
    let responseList = [];
    for(var i=0;i < len; i++ ){
        const newProfile ={
            username: user[i].username,
            avatar: user[i].avatar
        };
        const profile = await Profile.find({ username: user[i].username });
        // console.log(profile);
        newProfile.nick = profile[0].nick;
        newProfile.bio = profile[0].bio;
        newProfile.company = profile[0].company;
        newProfile.location = profile[0].location;
        newProfile.github = profile[0].github;
        responseList.push(newProfile);
        // console.log(user[i]);
    }
    const num = size * (page - 1);  //前面已经加载了的数量
    let resultList = [];
    if(num < len){
        if((num + size) < len){
            resultList = responseList.slice(num, num + size);
        }else{
            resultList = responseList.slice(num);
        }
    }else{
        ctx.status = 400;
        ctx.body = {
            message: '没有任何数据'
        }
        return;
    }

    ctx.status = 200
    ctx.body = {
        totalFollowers: len,
        data: resultList
    }
});

module.exports = router.routes();