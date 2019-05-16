const koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');

const app = new koa();
const router = new Router();


const dbURI = require('./config/keys').mongoURI;
const User = require('./models/User');

mongoose.connect(dbURI,  { useNewUrlParser: true })
        .then(() => {
            console.log('Mongodb Connnected....');
        })
        .catch(err => {
            console.log(err);
        });

const admin = new User({
    name: 'huixiongss',
    email: 'huixiong@gmail.com',
    password: '1234567'
});

admin.save(error => {
    if(error){
        console.error(error);
        return ;
    }
    console.log('saved');
});








