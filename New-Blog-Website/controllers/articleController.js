const newsModel = require("../models/News");
const categoryModel = require("../models/Category.js");
const fs = require("fs");
const path = require("path");
const createError = require("../utils/error-message.js");
const { validationResult } = require("express-validator");

const allArticles = async (req, res, next) => {
  try {
    var articales = await newsModel
      .find()
      .populate("category", "name")
      .populate("author", "fullname");
    if (req.role != "admin") {
      articales = await newsModel
        .find({ author: req.id })
        .populate("category", "name")
        .populate("author", "fullname");
    }
    // console.log(articales)
    res.render("admin/articles", { role: req.role, articales });
  } catch (error) {
    next(error);
  }
};
const addArticlePage = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    res.render("admin/articles/create", {
      role: req.role,
      categories,
      errors: 0,
    });
  } catch (err) {
    next(err);
  }
};
const addArticle = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.render("admin/articles/create", {
        categories,
        role: req.role,
        errors: error.array(),
      });
    }

    console.log(req.body, req.id);
    const { title, content, category } = req.body;
    const article = await newsModel.create({
      title,
      content,
      category,
      author: req.id,
      image: req.file.filename,
    });
    res.redirect("/admin/articles");
  } catch (error) {
    next(error);
  }
};
const updateArticlePage = async (req, res, next) => {
  if (!req.params.id) return next(createError("id not found!", 404));
  const categories = await categoryModel.find();
  const article = await newsModel
    .findById(req.params.id)
    .populate("category", "name")
    .populate("author", "fullname");
  if (req.role == "author") {
    if (req.id != article.author._id) {
      return next(createError("Unauthorized!", 401));
    }
  }
  if (!article) {
    return next(createError("News not found!", 404));
  }
  //   console.log(categories)
  //   console.log(article)
  res.render("admin/articles/update", {
    role: req.role,
    article,
    categories,
    errors: 0,
  });
};
const updateArticle = async (req, res, next) => {
  try {
    const id = req.params.id;
    const categories = await categoryModel.find();
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.render("admin/articles/update", {
        categories,
        role: req.role,
        article: req.body,
        errors: error.array(),
      });
    }

    const { title, content, category } = req.body;
    const news = await newsModel.findById(id);
    if (!news) {
      return next(createError("News not found!", 404));
    }

    if (req.role == "author") {
      if (req.id != news.author) {
        return next(createError("Unauthorized!", 401));
      }
    }

    news.title = title || news.title;
    news.content = content || news.content;
    news.category = category || news.category;

    if (req.file) {
      const imagePath = path.join(
        __dirname,
        "../",
        "public",
        "uploads",
        news.image,
      );
      fs.unlinkSync(imagePath);
      news.image = req.file.filename;
    }
    await news.save();
    res.redirect("/admin/articles");
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const deleteArticle = async (req, res, next) => {
  const id = req.params.id;
  try {
    const news = await newsModel.findById(id);
    if (req.role == "author") {
      if (req.id != news.author) {
        return next(createError("Unauthorized!", 401));
      }
    }
    const imagePath = path.join(
      __dirname,
      "../",
      "public",
      "uploads",
      news.image,
    );
    fs.unlinkSync(imagePath);

    const article = await newsModel.findByIdAndDelete(id);
    if (!article) {
      return next(createError("News not found!", 404));
    }
    res.json({ success: true, message: "News deleted successfully" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = {
  allArticles,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle,
};
