const categoryModel = require('../models/Category');
const newsModel = require('../models/News.js');
const createError = require('../utils/error-message.js');
const {validationResult} = require("express-validator") ;

const allCategory = async (req, res, err) => {
    try{

        const categories = await categoryModel.find();
        res.render("admin/categories", {role: req.role, categories});
    }catch(err){
        next(err)
    }
};
const addCategoryPage = (req, res) => {
    res.render("admin/categories/create", {role: req.role, errors: 0});
};
const addCategory = async (req, res, next) => {
    try{
const error = validationResult(req);
             if (!error.isEmpty()) {
             return res.render("admin/categories/create", {role: req.role, errors: error.array()});
            }
        
        const category = await categoryModel.create(req.body);
        
        res.redirect("/admin/category")
    }catch(err){
        next(err)
    }
    
};
const updateCategoryPage = async (req, res, next) => {
    if(!req.params.id) return next(createError("id not found!", 404))
    const category = await categoryModel.findById(req.params.id);
    if(!category){
        return  next(createError("Category not found!", 404))
    }
    res.render("admin/categories/update", {role: req.role, category, errors: 0 });
};
const updateCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        const category = await categoryModel.findById(id);

        const error = validationResult(req);
             if (!error.isEmpty()) {
             return res.render("admin/categories/update", {role: req.role, category: req.body, errors: error.array()});
            }

        const {name, description} = req.body;
        if(!category){
             return  next(createError("Category not found!", 404))
        }
        category.name = name || category.name;
        if(name){
          category.name = name;
        }
        category.description = description || category.description;
        await category.save();
        res.redirect("/admin/category");
      } catch (err) {
        console.error(err);
        next(err)
      }
};
const deleteCategory = async (req, res, next) => {
    const id = req.params.id;
        try{
            const category = await categoryModel.findById(id);
            if(!category){
                return next(createError("Category not found!", 404))
            }
            const alreadyUsed = await newsModel.findOne({category: id});
            if(alreadyUsed){
                return res.status(400).json({success: false, message: "Category is already used in news, you can't delete it!"});
            }
            await categoryModel.deleteOne({_id: id});
            res.json({success: true, message: "Category deleted successfully"});
        }catch(err){
            console.error(err);
            next(err)
        }
};

module.exports = {
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
};