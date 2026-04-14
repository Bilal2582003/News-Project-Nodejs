const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    website_title: {
        type: String,
        required: true,
        trim: true
    },
    website_logo: {
        type: String,
        required: true,
        trim: true
    },
    footer_description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Setting', settingSchema);