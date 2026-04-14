const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {validationResult} = require("express-validator") ;
const newsModel = require("../models/News");
const categoryModel = require("../models/Category");
const settingModel = require("../models/Setting");
const createError = require("../utils/error-message.js");
// const path = require("path");
const fs = require("fs");

const login = (req, res) => {
  res.render("admin/login", { layout: false, errors: 0 });
};
const dashboard = async (req, res, next) => {
  try {
    const articleCount =
      req.role == "author"
        ? await newsModel.countDocuments({ author: req.id })
        : await newsModel.countDocuments();
    const categoryCount = await categoryModel.countDocuments();
    const userCount = await userModel.countDocuments();

    res.render("admin/dashboard", {
      fullname: req.fullname,
      role: req.role,
      articleCount,
      categoryCount,
      userCount,
    });
  } catch (error) {
    next(error);
  }
};
const settings = async (req, res, next) => {
  try {
    const setting = await settingModel.findOne();
    console.log(setting);
    res.render("admin/settings", { role: req.role, setting });
  } catch (error) {
    next(error);
  }
};
const saveSettings = async (req, res, next) => {
  const { website_title, footer_description } = req.body;

  try {
    let website_logo = null;

    if (req.file) {
      website_logo = req.file.filename;
    }

    const existingSetting = await settingModel.findOne();
    if (existingSetting && existingSetting.website_logo && website_logo) {
      fs.unlinkSync("./public/uploads/" + existingSetting.website_logo);
    }

    const setting = await settingModel.findOneAndUpdate(
      {}, // find the first document (or use a specific filter like {_id: id})
      {
        website_title,
        footer_description,
        ...(website_logo && { website_logo }), // only update logo if provided
      },
      {
        new: true, // return updated document
        upsert: true, // create if not exists
      },
    );

    return res.redirect("/admin/settings");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
const adminLogin = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    // return res.status(400).json({ errors: error.array() });
   return res.render("admin/login", { layout: false, errors: error.array() });
  }
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return next(createError("Invalid username or password", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError("Invalid username or password", 401));
    }

    const jwtData = { id: user._id, role: user.role, fullname: user.fullname };
    const token = jwt.sign(
      jwtData,
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" },
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/");
};
const allUser = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.render("admin/users", { users, role: req.role });
  } catch (err) {
    next(err);
  }
};
const addUserPage = (req, res, next) => {
  res.render("admin/users/create", {role: req.role ,errors: 0});
};
const addUser = async (req, res) => {
  try {
    const error = validationResult(req);
     if (!error.isEmpty()) {
     return res.render("admin/users/create", {role: req.role, errors: error.array()});
    }
    // console.log(req.body);
    await userModel.create(req.body);
     res.redirect("/admin/users");
  } catch (err) {
    next(err);
  }
};
const updateUserPage = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id)
    const user = await userModel.findById(id);
    if (!user) {
      return next(createError("User not found!", 404));
    }
    res.render("admin/users/update", { user, role: req.role, errors: 0 });
  } catch (err) {
    console.error(err);
    next(err);
  }
  // res.render("admin/users/update");
};
const updateUser = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if(!error.isEmpty()){
     return res.render("admin/users/update", {user: req.body, role: req.role, errors: error.array()})
    }
    const id = req.params.id;
    const { fullname, password, role } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      return next(createError("User not found!", 404));
    }
    user.fullname = fullname || user.fullname;
    if (password) {
      user.password = password;
    }
    user.role = role || user.role;
    await user.save();
    res.redirect("/admin/users");
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return next(createError("User not found!", 404));
    }
    const used = await newsModel.find({author: id});
    if(used){
      return res.status(400).json({message: "User have articles so it can not be delete!"})
    }
    await userModel.deleteOne({_id: id});
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    // res.status(500).send("Server Error");
    next(err);
  }
};

module.exports = {
  login,
  adminLogin,
  logout,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
  dashboard,
  settings,
  saveSettings,
};
