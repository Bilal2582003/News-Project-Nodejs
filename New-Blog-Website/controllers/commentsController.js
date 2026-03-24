const commentModel = require('../models/Comments.js');

const allComments = (req, res)=>{
    res.render("admin/comments", {role: req.role});
};
const addCommentPage = (req, res)=>{};
const addComment = (req, res)=>{};
const updateCommentPage = (req, res)=>{};
const updateComment = (req, res)=>{};
const deleteComment = (req, res)=>{};

module.exports = {
    allComments,
    addCommentPage,
    addComment,
    addCommentPage,
    updateCommentPage,
    updateComment,
    deleteComment
};