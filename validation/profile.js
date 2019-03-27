const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.nick = !isEmpty(data.nick) ? data.nick : '';
    data.github = !isEmpty(data.github) ? data.github : '';

    if (Validator.isEmpty(data.nick)) {
        errors.nick = '昵称不能为空';
    }

    if (Validator.isEmpty(data.github)) {
        errors.github = 'github地址不能为空';
    }


    if (!Validator.isLength(data.nick, { min: 2, max: 40 })) {
        errors.nick = '昵称的长度不能小于2位且不能超过30位';
    }

    if (!Validator.isEmpty(data.github)) {
        if (!Validator.isURL(data.github)) {
            errors.github = 'githbu地址不合法';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
