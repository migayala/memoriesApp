const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Memory title is required'],
        minlength: [2, 'Memory title must be at least 2 characters long']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minlength: [2, 'Location must be at least 2 characters long']
    },
    description: String,
    completeFlag: Boolean,
    date: String,
    image: String,
    creatorUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    background: String
}, { timestamps: true })

module.exports = mongoose.model('Memory', MemorySchema);