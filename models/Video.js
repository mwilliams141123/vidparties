const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    filename: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    kids: {
        type: Boolean,
        default: false
    },
    likes: {
        type: [String]
    },
    dislikes: {
        type: [String]
    },
    upload_date: {
        type: Date,
        default: Date.now()
    },  
    featured: {
        type: Boolean,
        default: false
    }
});


const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;