const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    _password: {
        type: String,
        required: true
    },
    usertype: {
        type: Number,
        min: 0,
        max: 2,
        default: 1  // ０表示管理员，１表示游客，　２是备用位
    },
    banned: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);