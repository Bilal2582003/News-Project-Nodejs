const categoryModel = require('../models/Category.js');

const allCategory = (req, res) => {
    res.render("admin/categories");
};
const addCategoryPage = (req, res) => {
    res.render("admin/categories/create");
};
const addCategory = (req, res) => {};
const updateCategoryPage = (req, res) => {
    res.render("admin/categories/update");
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