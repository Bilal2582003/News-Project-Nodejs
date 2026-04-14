const mongoose = require("mongoose");
const userModel = require("../models/User.js");
const newsModel = require("../models/News.js");
const commentModel = require("../models/Comments.js");
const categoryModel = require("../models/Category.js");
const settingModel = require("../models/Setting.js");
const paginate = require("../utils/paginate.js");

const helperSettingFunction = async () => {
  const setting = await settingModel.findOne(); // settings
  return setting;
};
const helperRecentNews = async () => {
  const recentNews = await newsModel
    .find()
    .populate("category")
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(5);
  return recentNews;
};

const index = async (req, res) => {
  //   const news = await newsModel
  //     .find()
  //     .populate("author")
  //     .populate("category")
  //     .sort({ createdAt: -1 });
  const news = await paginate(newsModel, {}, req.query, {
    populate: [
      { path: "author", select: "fullname" },
      { path: "category", select: "name slug" },
    ],
    sort: { createdAt: -1 },
  });
  const newCat = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: newCat } });
  const setting = await helperSettingFunction();
  const recentNews = await helperRecentNews();
  // res.json(news);
  res.render("index", {
    news,
    categories,
    setting,
    recentNews,
    query: req.quer,
  });
};
const articlesByCategories = async (req, res) => {
  const category = await categoryModel.findOne({ slug: req.params.name });
  if (!category) {
    return res.status(404).send("Category not found");
  }

  // const news = await newsModel
  //   .find({ category: category._id })
  //   .populate("author")
  //   .populate("category")
  //   .sort({ createdAt: -1 });

  const news = await paginate(
    newsModel,
    { category: category._id },
    req.query,
    {
      populate: [
        { path: "author", select: "fullname" },
        { path: "category", select: "name slug" },
      ],
      sort: { createdAt: -1 },
    },
  );
  // res.json(news)

  const newCat = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: newCat } });
  const setting = await helperSettingFunction();
  const recentNews = await helperRecentNews();
  res.render("category", {
    news,
    categories,
    setting,
    recentNews,
    query: req.quer,
  });
};
const singleArticle = async (req, res) => {
  // const news = await newsModel
  //   .findById(req.params.id)
  //   .populate("author")
  //   .populate("category");

  const news = await paginate(newsModel, { _id: req.params.id }, req.query, {
    populate: [
      { path: "author", select: "fullname" },
      { path: "category", select: "name slug" },
    ],
    sort: { createdAt: -1 },
  });

  if (!news) {
    return res.status(404).send("Article not found");
  }
  const comments = await commentModel.find({ article: req.params.id, status: "approved" }).sort({ createdAt: -1 });
  news.comments = comments; 
  // res.json(news);
  const newCat = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: newCat } });
  const setting = await helperSettingFunction();
  const recentNews = await helperRecentNews();
  res.render("single", {
    news,
    categories,
    setting,
    recentNews,
    query: req.query,
  });
};
const search = async (req, res) => {
  const searchQuery = req.query.search;

  // const news = await newsModel
  //   .find({
  //     $or: [
  //       { title: { $regex: searchQuery, $options: "i" } },
  //       { content: { $regex: searchQuery, $options: "i" } },
  //     ],
  //   })
  //   .populate("author")
  //   .populate("category")
  //   .sort({ createdAt: -1 });
  const news = await paginate(
    newsModel,
    {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ],
    },
    req.query,
    {
      populate: [
        { path: "author", select: "fullname" },
        { path: "category", select: "name slug" },
      ],
      sort: { createdAt: -1 },
    },
  );

  const newCat = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: newCat } });
  const setting = await helperSettingFunction();
  const recentNews = await helperRecentNews();
  res.render("search", {
    news,
    categories,
    search: searchQuery,
    setting,
    recentNews,
    query: req.query,
  });
};
const author = async (req, res) => {
  // const news = await newsModel
  //   .find({ author: req.params.name })
  //   .populate("author")
  //   .populate("category")
  //   .sort({ createdAt: -1 });

  const news = await paginate(
    newsModel,
    { author: req.params.name },
    req.query,
    {
      populate: [
        { path: "author", select: "fullname" },
        { path: "category", select: "name slug" },
      ],
      sort: { createdAt: -1 },
    },
  );

  if (news.length === 0) {
    return res.status(404).send("Author not found");
  }
  const newCat = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: newCat } });
  const setting = await helperSettingFunction();
  const recentNews = await helperRecentNews();
  res.render("author", {
    news,
    categories,
    setting,
    recentNews,
    query: req.quer,
  });
};

const addComment = async (req, res) => {
  try {
    const newsId = req.params.id;
    if(!newsId){
      return res.status(400).send("Invalid news ID");
    }
    const news = await newsModel.findById(newsId);
    if (!news) {
      return res.status(404).send("News article not found");
    }
    const { name, email, content } = req.body;

    const comment = new commentModel({
      name,
      email,
      content,
      article: newsId,
     
    });

    await comment.save();
    return res.redirect(`/single/${newsId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  index,
  articlesByCategories,
  singleArticle,
  search,
  author,
  addComment,
};
