const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/', blogController.blog_index);                      // get blog index page
router.post('/', blogController.blog_create_post);               // post a blog
router.get('/create', blogController.blog_create_get);           // get create blog page
router.get('/:id', blogController.blog_details);                 // get single blog page
router.delete('/:id', blogController.blog_delete);               // delete a blog

module.exports = router;