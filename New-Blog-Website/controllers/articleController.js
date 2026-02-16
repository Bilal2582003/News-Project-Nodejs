const newsModel = require('../models/News.js');

const allArticles = (req, res) => {
    res.render("admin/articles");
};
const addArticlePage = (req, res) => {
    res.render("admin/articles/create");
};
const addArticle = (req, res) => {};
const updateArticlePage = (req, res) => {
    res.render("admin/articles/update");
};
const updateArticle = (req, res) => {};
const deleteArticle = (req, res) => {};
module.exports = {
    allArticles,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle
};