const mongoose = require('mongoose');
const slugify = require('slugify');

const commentSchema = new mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
commentSchema.pre('save', function(next) {
    // if (!this.isModified('name')) return next();
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Comment', commentSchema);