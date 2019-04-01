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
        type: String
    },
    classify: {
        type: Schema.Types.ObjectId,
        refs: 'classify'
    },
    tags: [
        {
            tag:{
                type: Schema.Types.ObjectId,
                refs: 'tags'
            }
        }
    ],
    stars: [
        {
            user: {
                type: Schema.Types.ObjectId,
                refs: 'users'
            }
        }
    ],
    comments: [
        {
            from: {
                type: Schema.Types.ObjectId,
                refs: 'users'
            },
            to: {
                type: Schema.Types.ObjectId,
                refs: 'users'
            },
            comment: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    secret: {
        type: Boolean,
        default: true
    }
});

module.exports = Article = mongoose.model('articles', ArticleSchema);