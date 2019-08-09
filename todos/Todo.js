const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = Schema({
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['todo', 'done'],
        required: true
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);
