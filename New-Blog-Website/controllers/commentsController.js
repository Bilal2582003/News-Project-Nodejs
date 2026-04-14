const commentModel = require("../models/Comments.js");
const newsModel = require("../models/News.js");
const { validationResult } = require("express-validator");

const allComments = async (req, res, next) => {
  try {
    let comments;
    if (req.role == "admin") {
      comments = await commentModel
        .find()
        .populate("article")
        .sort({ createdAt: -1 });
    } else {
      const news = await newsModel.find({ author: req.id });
      const newsIds = news.map((n) => n._id);
      comments = await commentModel
        .find({ article: { $in: newsIds } })
        .populate("article")
        .sort({ createdAt: -1 });
    }
    res.render("admin/comments", { role: req.role, comments });
  } catch (err) {
    next(err);
  }
};
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentModel.findByIdAndDelete(id);
    if (!comment) {
      return res.status(400).json({ message: "Comment not found" });
    }
    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the comment" });
  }
};
const updateCommentStatus = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array()[0].msg });
    }

    const { id } = req.params;
    const { status } = req.body;
    const comment = await commentModel.findById(id);
    if (!comment) {
      return res.status(400).json({ message: "Comment not found" });
    }
    comment.status = status;
    await comment.save();
    return res.json({ message: "Comment status updated successfully" });
  } catch (error) {
    console.error("Error updating comment status:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the comment status" });
  }
};

module.exports = {
  allComments,

  updateCommentStatus,

  deleteComment,
};
