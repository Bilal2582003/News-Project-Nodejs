const newsModel = require('../models/News.js');

const allArticles = (req, res) => {
    res.render("admin/articles", {role: req.role});
};
const addArticlePage = (req, res) => {
    res.render("admin/articles/create", {role: req.role});
};
const addArticle = (req, res) => {};
const updateArticlePage = (req, res) => {
    res.render("admin/articles/update", {role: req.role});
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