const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the structure of the database collection
const blogSchema = new Schema({

    title:   { type: String, required: true },
    snippet: { type: String, required: true },
    body:    { type: String, required: true }

}, { timestamps: true });

// create a model based on the structure
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;