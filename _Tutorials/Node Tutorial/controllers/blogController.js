const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find()
    .then(result => {
        res.render('blogs/index', { title: 'Home', blogs: result });
    })
    .catch(err => {
        console.error(err);
    });
} 

const blog_details = (req, res) => {
    const id = req.params.id;
    
    Blog.findById(id)
    .then(result => {
        res.render('blogs/details', { blog: result });
    })
    .catch(err => {
        console.log(err);
        res.status(404).render('404');
    });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create');
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then(result => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/' });    
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}