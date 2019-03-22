# gitblog
Github like blog, hexo theme from https://github.com/sabrinaluo

本项目从2018年3月18日开始写

## 实现过程

* Header
* mock.js和跨域
* Footer
* 侧边栏、信息栏
* 正文字段：Overview、Post、Categories、Tags、Followers
* Github项目、
* 后台管理Profile Setting，包括地理定位
* 上传图片
* 后台：管理分类
* 后台：管理标签
* 主页： Followers
* 主页：标签
* 主页：分类 

## 数据库字段
* User
    * username 用户名
    * email 邮箱
    * _password 加密处理的用户密码
    * usertype 用户类型，Number，０是博主，１是游客（默认），２预留
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
* User
  * POST ""
  * POST ""



## 功能特性

* 自定义指令v-rainbow，添加彩色标题
* 自定义过滤器snipate，博客列表展示额定词数裁剪
* 自定义博客地址，或者让它自己生成
* 博客分类可以通过判断该分类是否有子类输出次级标题，v-for遍历li出圆点，子类修改li的属性出空心点
* redis存储session字段








## 功能畅想(都是等待实现的功能)

* 鼠标滚动到一定位置，Menu吸附到顶端，左侧会自动补充头像形成完整的导航栏
* 支持响应式布局，在手机端有比较好的浏览体验
* 时间轴（打卡时间轴）
* 分类支持二级，点进分类可以进入该类别发布的时间轴
* 支持Github授权登录
* 支持文章目录
* 支持友链
* 支持发说说（发图片＋文字），在首页导航栏
* 图片的弹出层
* 相册功能（maybe）
* 支持留言微信通知
* 支持音乐播放（云解析）
* 关于我
* 支持打赏（微信和支付宝）
* 支持博客挂件





