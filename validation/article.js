const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.content = !isEmpty(data.content) ? data.content : '';
    data.classify = !isEmpty(data.classify) ? data.classify : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = '标题不能为空';
    }
    if (!Validator.isLength(data.content, { min: 1})) {
        errors.title = '标题的长度不能小于1位';
    }
    if (Validator.isEmpty(data.content)) {
        errors.content = '文章内容不能为空';
    }
    if (!Validator.isLength(data.content, { min: 1})) {
        errors.content = '文章的长度不能小于1';
    }
    if (Validator.isEmpty(data.classify)) {
        errors.classify = '文章的分类不能为空';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
