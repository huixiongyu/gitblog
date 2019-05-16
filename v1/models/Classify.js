const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const ClassifySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    amount: {
        type: Number,
        default: 0
    },
    children: [
        {
            name: {
                type: String
            },
            data: {
                type: Date,
                default: Date.now()
            },
            amount: {
                type: Number,
                default: 0
            }
        }
    ]
});

module.exports = Classify = mongoose.model('classify', ClassifySchema);