const categoryModel = require('../models/Category.js');

const allCategory = (req, res) => {
    res.render("admin/categories", {role: req.role});
};
const addCategoryPage = (req, res) => {
    res.render("admin/categories/create", {role: req.role});
};
const addCategory = (req, res) => {};
const updateCategoryPage = (req, res) => {
    res.render("admin/categories/update", {role: req.role});
};
const updateCategory = (req, res) => {};
const deleteCategory = (req, res) => {};

module.exports = {
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
};