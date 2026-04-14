const express = require('express');
const router = express.Router();
const  siteController= require("../controllers/siteController");

// Frontend route placeholders
router.get('/', siteController.index);
router.get('/category/:name', siteController.articlesByCategories);
router.get('/single/:id', siteController.singleArticle);
router.get('/search', siteController.search);
router.get('/author/:name', siteController.author);
router.post('/single/:id/comment', siteController.addComment);
module.exports = router;