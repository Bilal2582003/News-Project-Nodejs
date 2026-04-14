const express = require('express');
const router = express.Router();
const  articleController = require("../controllers/articleController.js");
const  categoryController = require("../controllers/categoryController.js");
const  commentsController = require("../controllers/commentsController.js");
const  userController = require("../controllers/userController.js");
const isLoggedIn = require("../middleware/isLoggedIn.js");
const isAdmin = require("../middleware/isAdmin.js");
const upload = require("../middleware/multer.js");
const isValid = require("../middleware/validataion.js"); 

// Admin dashboard route
router.get('/', userController.login);
router.post("/index", isValid.loginValidation, userController.adminLogin);
router.get("/logout", userController.logout);
router.get("/dashboard", isLoggedIn, userController.dashboard);
router.get("/settings", isLoggedIn, isAdmin, userController.settings);
router.post("/save-settings", isLoggedIn, isAdmin, upload.single('image'), userController.saveSettings);

// User Management
router.get('/users', isLoggedIn, isAdmin, userController.allUser);
router.get('/add-user', isLoggedIn, isAdmin, userController.addUserPage);
router.post('/add-user', isValid.userValidation, isLoggedIn, isAdmin, userController.addUser);
router.get('/update-user/:id', isLoggedIn, isAdmin, userController.updateUserPage);
router.post('/update-user/:id', isValid.userUpdateValidation, isLoggedIn, isAdmin, userController.updateUser);
router.delete('/delete-user/:id', isLoggedIn, isAdmin, userController.deleteUser);
// Categroy Management
router.get('/category', isLoggedIn, isAdmin, categoryController.allCategory);
router.get('/add-category', isLoggedIn, isAdmin, categoryController.addCategoryPage);
router.post('/add-category', isValid.categoryValidataion, isLoggedIn, isAdmin, categoryController.addCategory);
router.get('/update-category/:id', isLoggedIn, isAdmin, categoryController.updateCategoryPage);
router.post('/update-category/:id', isValid.categoryValidataion, isLoggedIn, isAdmin, categoryController.updateCategory);
router.delete('/delete-category/:id', isLoggedIn, isAdmin, categoryController.deleteCategory);
// Article Management
router.get('/articles', isLoggedIn, articleController.allArticles);
router.get('/add-article', isLoggedIn, articleController.addArticlePage);
router.post('/add-article', isLoggedIn, upload.single('image'),isValid.articleValidataion, articleController.addArticle);
router.get('/update-article/:id', isLoggedIn, articleController.updateArticlePage);
router.post('/update-article/:id', isValid.articleValidataion, isLoggedIn, upload.single('image'), articleController.updateArticle);
router.delete('/delete-article/:id', isLoggedIn, articleController.deleteArticle);
// Comment Management
router.get('/comments', isLoggedIn, commentsController.allComments);
router.put('/update-comment-status/:id', isLoggedIn, isValid.updateCommentValidataion, commentsController.updateCommentStatus);
router.delete('/delete-comment/:id', isLoggedIn, commentsController.deleteComment);

// comment Routes 
router.get('/comments', isLoggedIn, commentsController.allComments)
router.use(isLoggedIn,(req,res)=> {
    res.status(404).render('admin/404',{
        message:"Page not found", role:req.role
    })
}); 
router.use(isLoggedIn,(err,req,res, next)=> {
    console.log(err.stack);
    const status = err.status || 500;
    const view = status == 404 ? 'admin/404' : 'admin/500';
    res.status(status).render(view,{
        message:err.message|| "Internal server error!", role:req.role, status
    })
}); 
module.exports = router;
