# gitblog
Github like blog, hexo theme from https://github.com/sabrinaluo

本项目从2019年3月18日开始写
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
   * [findOneAndUpdate doesn't return updated document](https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document)  findOneAnUpdate是更新(覆盖)，updated可以插入到数组
* [validator](https://www.npmjs.com/package/validator) 表单字段验证前端需要，后端更加需要！
	 koa-session								
* [cross-env](https://www.npmjs.com/package/cross-env)   package.json运行不同的配置项NODE_ENV
	 [concurrently](https://www.npmjs.com/package/concurrently)  开发的时候用来前后端连载，注意写上客户端的--prefix																																																																		

## 参考链接
* [用Koa2搭建服务器](https://mobilesite.github.io/2017/04/29/develop-backend-service-with-koa2/) 
* [如何设计邮箱重设密码功能](https://segmentfault.com/q/1010000000705053/a-1020000000705125) 
* [使用nodejs发送电子邮件](https://juejin.im/entry/5968d5376fb9a06bc06a6f65) 
* [HTTP常用状态码](https://xdwangiflytek.iteye.com/blog/1343395) \
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
  * 500-服务器内部错误
  * 503-服务不可用

## 正在开发的功能
* 前后端联调，配置跨域
* 后台管理Profile Setting，包括地理定位
* 上传图片
* 后台：管理分类
* 后台：管理标签
* 主页： Followers
* 主页：标签
* 主页：分类 
* 分情况获取全球公认头像(gravatar)地址和自己的头像图片
* 

## 数据库字段
* User
    * username 用户名
    * email 邮箱
    * password 加密处理的用户密码
    * identity 用户类型，Number，０是博主，１是游客（默认），２预留
    * banned 禁止登录，默认是false
    * date 注册时间
* UserInfo
    * nick  中文名，昵称
    * gavatar 头像
    * location 定位信息：省和市
    * say_something  个性签名
    * website  个人网站
    * github 　开源仓库
    * zhihu　知乎
    * wangyiyun　网易云
    * weibo  微博
* Post
    * title  文章标题
    * path 文章地址
    * content 正文
    * date 发布时间
    * categories    分类
    * Tags  标签
    * star 喜欢的数量
    * coment 评论列表
## API设计




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

## 收获
* 一个神奇的bug!在postman一直测试提交数据，数据库就是没接收到，后来含泪发现请求地址忘记了api前缀！！！
* 多页路由，刚开始把主页写在app.js上面了，等我想登录和注册页面独立显示的时候一时不知道如何显示。后来醒悟到：app.js是入口文件啊，所有要显示的页面都要挂载到那个文件下，所以修改后app.js只剩下\<view-router></view-router>
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
* 关于设计用户组，刚开始我觉得这个东西能够在npm找到，但是谷歌和npm都没有给到我满意的答案。后来问了慕课网讲课的双越老师，得到的答复，再后来发现自己没有理解Token的结构，因为前端用jwt-decode能够
获得加密的字段信息。于是在设计用户的时候添加了字段identity