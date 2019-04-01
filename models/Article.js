const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    visited: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    path: {
      type: String,
      required: true
    },
    classify: {
        type: String
        // refs: 'classify'
    },
    tags: [
        {
            name:{
                type: String
                // refs: 'tags'
            }
        }
    ],
    stars: [
        {
            user: {
                type: String,
                refs: 'users'
            }
        }
    ],
    comments: [
        {
            from: {
                type: String,
                refs: 'users'
            },
            to: {
                type: String,
                refs: 'users'
            },
            comment: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            read: {
                type: Boolean,
                default: false
            }
        }
    ],
    secret: {
        type: Boolean,
        default: true
    }
});

module.exports = Article = mongoose.model('articles', ArticleSchema);