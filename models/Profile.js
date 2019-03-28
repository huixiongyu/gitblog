const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    email: {
        // 关联数据表
        type: String,
        ref: 'users',
        required: true
    },
    username: {
        type: String,
        ref: 'users',
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    company: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    github: {
        type: String,
        required: true,
        default: ''
    },
    zhihu: {
        type: String,
        default: ''
    },
    yuncun: {
        type: String,
        default: ''
    },
    weibo: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);