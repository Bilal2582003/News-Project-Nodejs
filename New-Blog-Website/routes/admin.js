const express = require('express');
const router = express.Router();
const  articleController = require("../controllers/articleController.js");
const  categoryController = require("../controllers/categoryController.js");
const  commentsController = require("../controllers/commentsController.js");
const  userController = require("../controllers/userController.js");

// Admin dashboard route
router.get('/', userController.login);
router.get("/index", userController.index);
router.get("/logout", userController.logout);
router.get("/dashboard", userController.dashboard);
router.get("/settings", userController.settings);

// User Management
router.get('/users', userController.allUser);
router.get('/add-user', userController.addUserPage);
router.post('/add-user', userController.addUser);
router.get('/update-user/:id', userController.updateUserPage);
router.post('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);
// Categroy Management
router.get('/category', categoryController.allCategory);
router.get('/add-category', categoryController.addCategoryPage);
router.post('/add-category', categoryController.addCategory);
router.get('/update-category/:id', categoryController.updateCategoryPage);
router.post('/update-category/:id', categoryController.updateCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);
// Article Management
router.get('/articles', articleController.allArticles);
router.get('/add-article', articleController.addArticlePage);
router.post('/add-article', articleController.addArticle);
router.get('/update-article/:id', articleController.updateArticlePage);
router.post('/update-article/:id', articleController.updateArticle);
router.delete('/delete-article/:id', articleController.deleteArticle);
// Comment Management
router.get('/comments', commentsController.allComments);
router.get('/add-comment', commentsController.addCommentPage);
router.post('/add-comment', commentsController.addComment);
router.get('/update-comment/:id', commentsController.updateCommentPage);
router.post('/update-comment/:id', commentsController.updateComment);
router.delete('/delete-comment/:id', commentsController.deleteComment);
module.exports = router;
