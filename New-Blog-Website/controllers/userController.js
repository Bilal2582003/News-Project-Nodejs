const userModel = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const login = (req, res) => {
  res.render("admin/login", { layout: false });
};
const dashboard = (req, res) => {
  res.render("admin/dashboard", { fullname: req.fullname ,role: req.role});
};
const settings = (req, res) => {
  res.render("admin/settings", {role: req.role});
};
const adminLogin = async (req, res) => {
  const {username, password}= req.body
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid username or password");
    }
    
    const jwtData = { id: user._id, role: user.role, fullname: user.fullname }
    const token = jwt.sign(
      jwtData,
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );
    
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/");
};
const allUser = async (req, res) => {
  const users = await userModel.find();
  res.render("admin/users", { users, role: req.role });
};
const addUserPage = (req, res) => {
  res.render("admin/users/create");
};
const addUser = async (req, res) => {
  console.log(req.body);
  await userModel.create(req.body);
  res.redirect("/admin/users");
};
const updateUserPage = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("admin/users/update", { user, role: req.role });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
  // res.render("admin/users/update");
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const {fullname, password, role} = req.body;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).send("User not found");
    }
    user.fullname = fullname || user.fullname;
    if(password){
      user.password = password;
    }
    user.role = role || user.role;
    await user.save();
    res.redirect("/admin/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await userModel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send("User not found");
        }
        res.json({success: true, message: "User deleted successfully"});
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
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
};
