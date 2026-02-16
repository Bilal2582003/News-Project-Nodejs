const mongoose = require('mongoose');
const userModel = require('../models/User.js');
const newsModel = require('../models/News.js');
const commentModel = require('../models/Comments.js');
const categoryModel = require('../models/Category.js');

const index = (req, res)=>{
    res.render("index");
};
const articlesByCategories = (req, res)=>{
    res.render("category");
};
const singleArticle = (req, res)=>{
    res.render("single");
};
const search = (req, res)=>{
    res.render("search");
};
const author = (req, res)=>{
    res.render("author");
};
const addComment = (req, res)=>{
    res.render("index");
};

module.exports = {
    index,
    articlesByCategories,
    singleArticle,
    search,
    author,
    addComment
};