const express = require('express');
const router = express.Router();
const  articleController = require("../controllers/articleController.js");
const  categoryController = require("../controllers/categoryController.js");
const  commentsController = require("../controllers/commentsController.js");
const  userController = require("../controllers/userController.js");
const isLoggedIn = require("../middleware/isLoggedIn.js");
const isAdmin = require("../middleware/isAdmin.js");

// Admin dashboard route
router.get('/', userController.login);
router.post("/index", userController.adminLogin);
router.get("/logout", userController.logout);
router.get("/dashboard", isLoggedIn, userController.dashboard);
router.get("/settings", isLoggedIn, isAdmin, userController.settings);

// User Management
router.get('/users', isLoggedIn, isAdmin, userController.allUser);
router.get('/add-user', isLoggedIn, isAdmin, userController.addUserPage);
router.post('/add-user', isLoggedIn, isAdmin, userController.addUser);
router.get('/update-user/:id', isLoggedIn, isAdmin, userController.updateUserPage);
router.post('/update-user/:id', isLoggedIn, isAdmin, userController.updateUser);
router.delete('/delete-user/:id', isLoggedIn, isAdmin, userController.deleteUser);
// Categroy Management
router.get('/category', isLoggedIn, isAdmin, categoryController.allCategory);
router.get('/add-category', isLoggedIn, isAdmin, categoryController.addCategoryPage);
router.post('/add-category', isLoggedIn, isAdmin, categoryController.addCategory);
router.get('/update-category/:id', isLoggedIn, isAdmin, categoryController.updateCategoryPage);
router.post('/update-category/:id', isLoggedIn, isAdmin, categoryController.updateCategory);
router.delete('/delete-category/:id', isLoggedIn, isAdmin, categoryController.deleteCategory);
// Article Management
router.get('/articles', isLoggedIn, articleController.allArticles);
router.get('/add-article', isLoggedIn, articleController.addArticlePage);
router.post('/add-article', isLoggedIn, articleController.addArticle);
router.get('/update-article/:id', isLoggedIn, articleController.updateArticlePage);
router.post('/update-article/:id', isLoggedIn, articleController.updateArticle);
router.delete('/delete-article/:id', isLoggedIn, articleController.deleteArticle);
// Comment Management
router.get('/comments', isLoggedIn, commentsController.allComments);
router.get('/add-comment', isLoggedIn, commentsController.addCommentPage);
router.post('/add-comment', isLoggedIn, commentsController.addComment);
router.get('/update-comment/:id', isLoggedIn, commentsController.updateCommentPage);
router.post('/update-comment/:id', isLoggedIn, commentsController.updateComment);
router.delete('/delete-comment/:id', isLoggedIn, commentsController.deleteComment);

// comment Routes 
router.get('/comments', isLoggedIn, commentsController.allComments)
module.exports = router;
