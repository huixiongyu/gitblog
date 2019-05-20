const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const passport = require('koa-passport');
const app = new Koa();
const router = new Router();
var cors = require('koa2-cors');

// mongoDB连接地址
const db = require('./config/keys').mongoURI;
// 引入路由
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const tags = require('./routes/api/tags');
const classify = require('./routes/api/classify');
const article = require('./routes/api/article');
// error handler
onerror(app);
app.use(cors());
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 连接mongodb
// 连接数据库
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => {
      console.log('Mongodb Connectd...')
    })
    .catch(err => {
      console.log(err)
    });

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// 配置路由接口
router.use('/api/users', users);
router.use('/api/profile', profile);
router.use('/api/tags', tags);
router.use('/api/classify', classify);
router.use('/api/article', article);


app.use(router.routes()).use(router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
