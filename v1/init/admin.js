const mongoose = require('mongoose');
const gravatar = require('gravatar')

//自定义的工具
const dbURI = require('../config/keys').mongoURI;
const User = require('../models/User');
const tools = require('../config/tools')

// 你的数据字段
const myName = 'huixiongyu'
const myEmail = 'huixiongyu@gmail.com'
const myPassword = 'mimashiyiersansiwu'




//连接数据库
mongoose.connect(dbURI,  { useNewUrlParser: true })
    .then(() => {
        console.log('Mongodb Connnected....');
    })
    .catch(err => {
        console.log(err);
    });
//生成全球公认头像
const avatar = gravatar.url(myEmail, {
    s: '200',
    r: 'pg',
    d: 'mm'
});
const newUser = new User({
    username: myName,
    email: myEmail,
    password: tools.enbcrypt(myPassword),
    identity: "admin",
    avatar
});

// 存储到数据库
newUser
    .save()
    .then(user => {
      console.log("Success!")
      console.log(user)
    })
    .catch(err => {
        console.log(err)
    });
