# gitblog
Github like blog, hexo theme from https://github.com/sabrinaluo

本项目从2019年3月18日开始写

## 运行

```
cd gitblog/
npm install
npm run client-install
npm run dev
```

启动后会前后端连载， 前端端口8080，后端端口3000

浏览器直接打开` http://localhost:8080`

**测试账号:**

```
//admin
email: huixiongyu@gmail.com
password: mimashiyiersansiwu

//member
email: xiaoming@163.com
password: 12345678
```

如果自己部署必须运行运行init文件夹下的admin.js和profile.js用来初始化博主，否则首页无法正常显示





## 文件和使用
* bin server根目录，www.js是入口文件
* example  用来测试各种功能的，比如koa-bodyparser的用法、mongodb连接
* gitblog-client  前端页面
* models  数据库字段
* node_modules/  库
* public 静态文件
* routes 路由
* views 页面，没有用的
* app.js 程序主要逻辑在这里，路由交给routes,校验会交给validator, 数据库插入交给models
* key.js 配置开发环境和生产环境的字段，如数据库地址、端口、加密字符串
* package.json  npm依赖文件
* jwt-decode 前端解析Token数据，也就是后端生成Token的时候用的payload。在登录的时候使用
server是使用koa-generator生成的

## 开发说明
* koa-bodyparser对于POST请求，它可以把koa上下文中的表单数据解析到ctx.request.body中,变成json数据.可以到example中体验   
* koa-json 用来美化json格式, 键值对会变成双引号的键值对
* bcryptjs.hashSync  用户密码不应该直接存储到数据库的，因为数据库脱裤之后别人拿到密码会撞库用户的密码，bcryptjs通过算法生成复杂的密码串
* bcryptjs.compareSync   加密了还需要解密，才能确认登录的用户是数据库存储的那个
* [gravatar](https://www.npmjs.com/package/gravatar) 生产用户登录的头像，比如Github新注册用户没有头像的时候用的是gravatar
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) 简写叫jwt,用来生成用户登录的token，需要用户的信息（headers，不是秘密信息）、加密字符串和过期时间作为参数.客户端会使用sessionStorage或者localStorage存储
* koa-passport 锁和钥匙是一对的，既然生成了Token（锁），那么需要一个工具解开这个token，那就是passport（钥匙）
* passport-jwt 验证Token
* [mongoose](https://www.npmjs.com/package/mongoose)  连接mongoose，创建数据库，查询等。
   * [Quries](https://mongoosejs.com/docs/queries.html)  数据查询
   * [Mongoose之Population使用（数据表的关联）](https://segmentfault.com/a/1190000002727265#articleHeader3)  跨表查询的时候对某个模型的字段查找
   * [findOneAndUpdate doesn't return updated document](https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document)  findOneAnUpdate是更新(可以选择覆盖)，updated可以插入到数组
   * [populate](https://mongoosejs.com/docs/populate.html) 
   * [$lookup-Aggregation](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/) 合并数据表
* [validator](https://www.npmjs.com/package/validator) 表单字段验证前端需要，后端更加需要！
   koa-session
    [async-validator](https://github.com/yiminghe/async-validator) element-ui和iview表单校验的时候基于这个库的实现								
* [cross-env](https://www.npmjs.com/package/cross-env)   package.json运行不同的配置项NODE_ENV
* [concurrently](https://www.npmjs.com/package/concurrently)  开发的时候用来前后端连载，注意写上客户端的--prefix

**开发工具： WebStorm、Postman、MongoDB Atlas**





## 参考链接

* [用Koa2搭建服务器](https://mobilesite.github.io/2017/04/29/develop-backend-service-with-koa2/) 
* [如何设计邮箱重设密码功能](https://segmentfault.com/q/1010000000705053/a-1020000000705125) 
* [使用nodejs发送电子邮件](https://juejin.im/entry/5968d5376fb9a06bc06a6f65) 
* [HTTP常用状态码](https://xdwangiflytek.iteye.com/blog/1343395) 
* [Vue.config.js](https://cli.vuejs.org/zh/config/#devserver-proxy) 
  * 200-服务器成功返回网页	
  * 201-已创建
  * 202-已接受，但未处理
  * 301-永久移动
  * 302-临时移动
  * 400-错误请求
  * 401-未授权
  * 403-禁止
  * 404-请求的网页不存在
  * 405 方法不允许，比如接口是POST，你用了PATCH
  * 500-服务器内部错误
  * 503-服务不可用
* [使用$refs访问Vue中的DOM](https://www.w3cplus.com/vue/accessing-dom-refs.html) 
* [可能比文档还详细--VueRouter完全指北](https://juejin.im/post/5b82bcfcf265da4345153343#heading-11)
* [vue项目用户登录状态管理，vuex+locaStorage实现](https://blog.csdn.net/weixin_38115427/article/details/79443468) 
* [vue：从一个下拉框组件理解vue中的父子通讯](https://juejin.im/post/5a37327df265da4325296431)
* [vue的hover事件](https://blog.csdn.net/sunshine_ping/article/details/80269707) 
* [MongoDB几种查询嵌套数据的方式](https://www.jianshu.com/p/b28a73ba9a16) 
* [MongoDB嵌套文档如何局部更新](https://segmentfault.com/q/1010000014273734) 

## 正在开发的功能
* 后台管理Profile Setting，包括地理定位
* 上传图片
* 后台：管理分类
* 后台：管理标签
* 主页： Followers
* 主页：标签
* 主页：分类 
* 分情况获取全球公认头像(gravatar)地址和自己的头像图片

## 数据库字段
* User
    * username 用户名   **唯一，不可更改**
    * email 邮箱   **唯一，不可更改**
    * gavatar 头像
    * password 加密处理的用户密码
    * identity 用户类型，默认是"member" , 博主的是"admin"
    * banned 禁止登录，默认是false
    * date 注册时间
* UserInfo
    * nick  中文名，昵称
    * location 定位信息：省和市
    * bio 个性签名
    * website  个人网站
    * github 　开源仓库
    * zhihu　知乎
    * wangyiyun　网易云
    * weibo  微博
* Post
    * title  文章标题
    * path 文章地址
    * visited 访问数量
    * content 正文
    * date 发布时间
    * classify    分类--关联表
    * Tags  标签
    * star 喜欢的数量
    * coment 评论列表，
    * secret   决定是否是草稿
* Comment
    * user
    * content
    * read  已读
    * toRead 未读
    * date
    * id 
    * ariticle 所属文章 --关联表
## API设计

* User

  *  注册  POST    /api/users/register 
       * username 必须
       *  email    邮箱是唯一的，姓名可以重复
       *  password 必须
  *  登录  POST  /api/users/signin  
    * email 必须
    * password 必须
  *  修改密码 POST  /api/users/changepassword  
    * username 必须
    * old 旧密码
    * newPass 新密码
    * repeatNew 重复的密码
* Profile

  * 添加或更新个人信息  POST /api/profile  
    * nick 必填
    * username 自动关联登录账户的username(为了方便用户信息查询接口)
    * github 必填，字段符合URL
    * email 自动关联登录账户的email
    * bio 可选
    * website 可选
    * company 可选
    * zhihu 可选
    * yuncun 可选
    * weibo 可选
  * 获取某个人的信息 GET  /api/profile/user?username=xxx
    * xxx代表用户名，可以在blogToken中解析
  * 获取所有用户 GET  /api/users/followers
* Tag
  * 添加标签  POST  /api/tags
    * newTag  标签名  (必须)
* Classify
  * 获取所有分类  GET /api/classify
  * 增加分类 POST  /api/classify
    * name  新增分类名称 （必须）
  * 删除整个分类  DELETE  /api/classify    **有待完善，有子类会连子类删除**
    * name 删除分类的名称 （必须）
  * 修改分类的名称 PATCH /api/classify
    * oldClass 原来分类的名称
    * newClass 修改后分类的名称
  * 获取子类  GET /api/child?name=xxx
    * name 父类名称
  * 插入子类 POST /api/classify/child
    * name  父类的名称
    * child 要插入子类的名称
  * 修改子类名称 PATCH /api/classify/child
    * name  父类的名称
    * oldChild 子类原有名称
    * newChild 子类更新后的名称
  * 删除子类  DELETE /api/classify/child 
    * name  父类的名称
    * child 子类的名称


## 功能特性

* 自定义指令v-rainbow，添加彩色标题
* 自定义过滤器snipate，博客列表展示额定词数裁剪
* 自定义博客地址，或者让它自己生成
* 博客分类可以通过判断该分类是否有子类输出次级标题，v-for遍历li出圆点，子类修改li的属性出空心点
* redis存储session字段



## 功能畅想(都是等待实现的功能)

* 用户角色管理
* 邮箱激活
* 通过邮箱找回密码
    * 注册时要求每个用户使用唯一的邮箱，注册后向用户的邮箱发一封邮件
    * 找回密码时要求用户填写邮箱地址，提示用户如果不记得地址请在邮箱中搜索
    * 找回密码功能限制每帐号每天只能使用三次(只能发三次邮件), 使用缓存来完成这个计数
    * 找回密码时向缓存中写入一个随机的字符串作为 Token, 有效期为一天，向用户的邮箱发送包含 Token 的链接
    * 用户从链接点回来先验证 Token 的有效性，然后提示填写新密码，然后将新密码和 Token 一起提交给后端完成修改密码的操作
    * 删除掉 Token 的缓存
* Token过期之后的refresh
* 气泡提示框，显示个人信息（在follower那个页面）
* 鼠标滚动到一定位置，Menu吸附到顶端，左侧会自动补充头像形成完整的导航栏
* 支持响应式布局，在手机端、平板等各种设备有比较好的浏览体验
* 时间轴（打卡时间轴）
* 分类支持二级，点进分类可以进入该类别发布的时间轴
* 支持Github授权登录
* 支持文章目录（并且设置锚点）
* 支持友链
* 支持发说说（发图片＋文字），在首页导航栏
* 图片的弹出层
* 相册功能（maybe）
* 支持留言微信通知
* 支持音乐播放（云解析）
* 关于我
* 支持打赏（微信和支付宝）
* 支持博客挂件
* 分享到微信
* Github式评论
* SEO
* 方便快捷的部署和配置
* 支持文章置顶
* 支持文章内容加密(输入密码后可见)
* 优化前端API请求接口
* 性能优化,每ms
* 分页：手机端上拉自动加载
* 评论需要登录，手机端是弹框登录，电脑端需要携带评论页面的位置，登录后跳转
* 评论框带表情选择
* webSocket在线校验注册信息，搜索信息
* 管理登录设备数量

## 收获
* 一个神奇的bug!在postman一直测试提交数据，数据库就是没接收到，后来含泪发现请求地址忘记了api前缀！！！
* 多页路由，刚开始把主页写在app.js上面了，等我想登录和注册页面独立显示的时候一时不知道如何显示。后来醒悟到：app.js是入口文件啊，所有要显示的页面都要挂载到那个文件下，所以修改后app.js只剩下\<view-router>\</view-router>
* 默认子路由，可以在父路由中添加redirect子路由路径,还可以在第一个子路由的路径设置为空字符串，然后组件是默认显示的子组件
* 背景平铺全屏(自适应)
```
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: 0;
    background-image: url("../assets/images/register-bg4.jpeg");
    background-size: 100%;
    background-repeat:no-repeat;
    z-index: 0;
    overflow: hidden;
```

* 防止xss攻击，服务端传回Token的时候在首部字段中添加http-Only
* 前端表单提交后，后端接收到的数组其实是字符串，比如“html, css, js, vue”这样，后端需要用split拆成数组
* 后端设计API的时候，对于私密接口（需要验证的），因为验证已代表用户存在，对跨表（关联表）的数据可以先检查能否找到该表，存在则更新，不存在则创建。也就是说更新和创建共用一个post的API
* 关于设计用户组，刚开始我觉得这个东西能够在npm找到，但是谷歌和npm都没有给到我满意的答案。后来问了慕课网讲课的双越老师得到答复，再后来发现自己没有理解Token的结构，因为前端用jwt-decode能够获得加密的字段信息。于是在设计用户的时候添加了字段identity
* ` npm run dev` 的时候莫名奇妙的报错`This is probably not a problem with npm. There is likely additional logging output above.`  下面是一个貌似可行的办法：

```
rm -rf node_modules
rm package-lock.json
npm cache clear --force
npm install
```

* 前端表单自定义验证规则： 在Form里面需要写属性rules，比如`:rules="ruleValidate"` ，并且在FormItem指定ruleValidate中校验的字段名 ` prop ="password"`

```
const validatePassword = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('密码不能为空'));
    } else if (!/^[~!@#$%^&*\-+=_.0-9a-zA-Z]{8,30}$/.test(value)) {
        callback('密码不符合要求，');
    } else {
        callback();
    }   
};

//在表单验证规则里使用
ruleValidate:{
    password:[{validator:validatePassword,trigger:'blur'}]
}

```

* 覆盖UI库的样式可以审查元素找到类名，对样式进行修改，但是此时\<style> 不能设置scoped属性，这表示修改的样式会影响全局。避免影响全局的做法是在需要修改的类上一级元素加一个类，用less或者Sass嵌套的写法，屏蔽对全局的影响。
* 报错, 没有module.exports.

```
 `/api/profile`: `middleware` must be a function, not `object`
```

* koa-passport验证返回的用户字段很有意思，注意model是找findById还是用find，返回值是不同的，我用的是find， 原因我认定jwt加密的payload里email是唯一的(确实有些不安全)，返回的是下面的内容： 

```
{ _passport: 
   { instance: 
      Authenticator {
        _key: 'passport',
        _strategies: [Object],
        _serializers: [],
        _deserializers: [],
        _infoTransformers: [],
        _framework: [Object],
        _userProperty: 'user',
        _sm: [Object],
        Authenticator: [Function: Authenticator],
        Passport: [Function: Authenticator],
        Strategy: [Object],
        strategies: [Object],
        KoaPassport: [Function: KoaPassport] } },
  user: 
   [ { identity: 'admin',
       banned: false,
       _id: 5c99ea249fde2808f6d674c7,
       username: 'huixiongyu',
       email: 'huixiongyu@gmail.com',
       password: 'xxxxxxxIDFne1s7M4l9gmvmLkKh3KmJbkp9PEqEYrvu',  //这里我处理了下
       avatar: '//www.gravatar.com/avatar/2406675c2344e025854ea9ec69e2ded41d?s=200&r=pg&d=mm',
       date: 2019-03-26T09:00:20.313Z,
       __v: 0 } ],
  authInfo: {} }
```

因此我进入了profile设置添加和更新个人信息的时候，赋值profile.email用的是ctx.state.user[0].email 。在使用findOndAndUpdate的时候，先判断，但是在对特定条目修改的时候记得第一个参数对象必须是正确的，否则状态码变为204，意思是接受处理了，但是没有返回数据。因为await的时候在等待数据，然而mongodb没有找到那一条数据，当然是没有数据返回的。

* ref使用有两种情况
  * 如果在普通DOM元素上使用，引用指向的是DOM 元素
  * 如果在子组件上使用，引用指向组件实例
* active-class用来设置路由激活的样式比如设置active-class="rainbow" 就可以通过.rainbox来设置路由激活后的样式
* 用户全局守卫befoeEach之后，命令行没有报错，但是首页却是白屏。**忘了next()**!!!  内层判断后用了next()，外层的却忘记了
* 页面刷新的时候，保存在vuex的数据消失，登录状态不能维持。原因是vuex保存的数据是在内存中的，它存在的目的是组件中传值。为了保持数据状态可以把它们放在localStorage中，但是localStorage（或者sessionStorage）是不能代替vuex的，因为相同字段容易导致数据冲突，放在vuex能够及时更新。登录状态可以在App.vue用created钩子初始化vuex中的数据

```
// 基本用法
localStorage.setItem(“key”, value); //存储在localStorage的变量名，value是值
localStorage.getItem("key"); //取回字段
localStorage.removeItem("key")  //清除字段，比如退出登录，删除用户信息


//存储JSON对象
let user = {
    name: 'xiaoming',
    age: '20'
}

user = JSON.stringify(user);
localStorage.setItem("user", user);

//从localStorage中取回JSON对象
let user = localStorage.getItem("user");
user = JSON.parse(user); //字符串转成JSON

```

* iview表单提交
  *  每个FormItem都要写prop属性指定数据字段
  * 写个函数handleSubmit，Button要绑定这个函数
  * this.formData作为axios post的参数
* 格式化日期： moment
* 再次前端拦截！！为每个请求添加token

```
axios.interceptors.request.use(
    config => {
      if (localStorage.blogToken) { //判断token是否存在
        config.headers.Authorization = localStorage.blogToken;  //将token设置成请求头
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
);
```

* 输入框回车进行登录获注册,  @keyup.enter.native  最近发现并不好用，这句好像好一些`@keydown.native.enter.prevent ="handleEnter"`

```
<Input type="password" 
	v-model="loginInfo.password" 		@keyup.enter.native="handleLogin('formValidate')" />
</FormItem>
<FormItem>
<Button class="login-button"
type="success"
style="fontSize:14px;fontWeight:600"
@click=" handleLogin('formValidate')"
>
Sign in
</Button>
</FormItem>
```

* 设置禁止缩放页面

```
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

* 生成个性化(随机)avatar: [Image Requests](https://en.gravatar.com/site/implement/images/) 
  * 404
  * mp 灰白人头像
  * identicon 随机的花纹
  * monsterid 怪物
  * wavatar 人脸特征
  * retro 人脸像素块
  * rebohash 机器人哈希
  * black 空白 
* iview下拉菜单点击事件

```
<Dropdown @on-click="handleClick">
    <a href="javascript:void(0)">
    hover 触发
    <Icon type="ios-arrow-down"></Icon>
    </a>
  <DropdownMenu slot="list">
    <DropdownItem name="edit">编辑</DropdownItem>
    <DropdownItem name="delete">删除</DropdownItem>
  </DropdownMenu>
</Dropdown>


//script
handleClick(name) {
  console.log(name);
}
```

* vuex数据更新的时候头像的登录状态还没有变化，使用了beforeRouteEnter调用location.reload()进行页面刷新，provide/inject可能是更好的解决方法：[vue项目如何刷新当前页面](https://blog.csdn.net/qq_16772725/article/details/80467492) 

* beforeEach要注意判断条件，避免进入 无限循环，全局路由守卫可以借助meta来设置，下面是有一个管理员，其他用户可登录的权限设置

  *  1.settings，需要登录，并且是管理员
  * 2.useradmin, 需要登录，不是管理员，普通用户的管理页面，管理员不能访问！(也就是同时满足不是管理员，不是管理员管理后台)
  * 3.不满足以上的跳到首页，也就是管理员不能访问普通用户，普通用户不能访问后台
  * 4.没有登录，不能访问需要登录的页面！
  * 5.随便看，我不管

  ```
  //上面要设置路由的meta信息，比如
  {
      path: '/useradmin',
      name: 'useradmin',
      component: UserAdmin,
      meta:  {
          requiresAuth: true ,
          requiresAdmin: false
  	}
  },
      {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta:  {
          requiresAuth: true ,
          requiresAdmin: true
        }
  }
  
  
  function isAdmin(){
    if(localStorage.blogToken){
      const token = localStorage.getItem('blogToken')
      const decode = jwt_decode(token);
      if(decode.identity === "admin"){
        return true;
      }
    }
    return false;
  }
  
  function isLogin(){
    if(localStorage.blogToken){
      return true;
    }
    return false;
  }
  
  
  router.beforeEach((to, from, next) => {
    // 需要登录的跳转判断
    //需要权限，并且已经登录了
    // 权限有5种：
    // 1.settings，需要登录，需要管理员
    // 2.useradmin, 需要登录，不需要管理员，管理员不能访问！(也就是同时满足不是管理员，不是管理员管理后台)
    // 3.不满足以上的跳到首页，也就是管理员不能访问普通用户，普通用户不能访问后台
    // 4.没有登录，不能访问需要登录的页面！
    // 5.随便看，我不管
    if (to.matched.some(record => record.meta.requiresAuth) && isLogin()) {
        console.log('我已经登录了');
        if(to.matched.some(record => record.meta.requiresAdmin) && isAdmin()){
          console.log('进入了高级管理员模式，我要管理博客发布');
          next();
        }else if(!to.matched.some(record => record.meta.requiresAdmin) && !isAdmin()){
          console.log('进入了普通用户模式, 我要设置个人信息');
          next();
        }
        else{
          console.log('因为不符合权限，所以跳到首页了');
          next({
            path: '/'
          });
        }
    // 需要权限，并且没有登录！！
    } else if(to.matched.some(record => record.meta.requiresAuth) && !isLogin()){
      console.log('需要权限验证，但是我没有登录，所以跳到首页了');
      next({
        path: '/'
      });
    }else{
      // 不需要登录直接跳转
      console.log('我的行为不需要任何权限');
      next()
    }
  });
  
  ```

* **this.$set(this.data,”key”,value)**   对于 给数组某位置内容变更，触发视图更新，和改变数组长度的需要用this.$set,其他的使用数组的push()、pop()、shift()、unshift()、splice()、sort()和reverse()[文档-列表渲染](https://cn.vuejs.org/v2/guide/list.html) 

* axios POST必须是对象形式提交数据的

* 无法代理，很多次出现这种情况，然后重启项目就行了。原因是我后端设置了Token一个小时过期，没有提醒过期登录

```
[1] Proxy error: Could not proxy request /classify from localhost:8080 to http://localhost:3000/api/.
[1] See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNREFUSED).
```

* 报错. 这是由于key值绑定重复了，这个问题出现在数组被推入了重复的数据，解决方法是先清空再重新装数据。

```
Duplicate keys detected: 'Unix'. This may cause an update error
```



## 问题目录

* 注册页面，根据不同的状态码返回提示信息。产生的错误没有报回来
* setting页面，当前激活的路由前边有一道小红线。并且为点击导航的时候,对应路由没有高亮
* 面板：点击显示，移入维持，移出消失。Menu会遮住自定义的面板
* 用户登录状态管理
* 首页数据初始化（其实是leftside）,需要管理好部署的配置，以便最小化配置实现部署
* 没有初始化用户的话可能导致followers页出现问题
* 权限验证的问题，管理员接口的POST和普通用户的应该不同，因为要判断identity。暂时没修改（普通用户页具备修改的权限）。解决：在管理员的POST接口里检查用户是不是管理员---**超权问题**  可以利用ctx.state（中间件保存的信息）来比对。
* mongodb多层嵌套模型创建和查询
* 导航条大概有20px的margin-bottom, 使用非完全的flex布局留下的，给文章书写页的背景颜色留下了障碍。
* 文章书写页的分类选择应该加入块内滚动条

![yinghua](http://qiniu.hackslog.cn/FmnHNuACuNohCUx55_lEmIfyinjw.jpg)