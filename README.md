# gitblog
Github like blog, hexo theme from https://github.com/sabrinaluo

## 数据库字段
* User
    * username 用户名
    * email 邮箱
    * _password 加密处理的用户密码
    * usertype 用户类型，Number，０是博主，１是游客（默认），２预留
    * banned 禁止登录，默认是false
    * date 注册时间
* UserInfo
    * gavatar 头像
    * location 定位信息：省和市
* Post
    * title  文章标题
    * content 正文
    * date 发布时间
    * categories    分类
    * Tags  标签
    * star 喜欢的数量
    * coment 评论列表


## API设计







## 功能畅想(都是等待实现的功能)

* 支持响应式布局，在手机端有比较好的浏览体验
* 支持Github授权登录
* 支持文章目录
* 支持友链
* 支持发说说（发图片＋文字）
* 支持留言微信通知
* 支持音乐播放（云解析）
* 关于我
* 支持打赏
* 支持博客挂件





