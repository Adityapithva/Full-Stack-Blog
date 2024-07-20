const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } ,// Assuming 'User' is your user model
    createdAt:{type:String, required: true}
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;