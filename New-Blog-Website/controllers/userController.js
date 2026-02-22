const userModel = require("../models/User");

const login = (req, res) => {
  res.render("admin/login", { layout: false });
};
const dashboard = (req, res) => {
  res.render("admin/dashboard");
};
const settings = (req, res) => {
  res.render("admin/settings");
};
const index = (req, res) => {};
const logout = (req, res) => {};
const allUser = async (req, res) => {
  const users = await userModel.find();
  res.render("admin/users", { users });
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
    res.render("admin/users/update", { user });
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
  index,
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
