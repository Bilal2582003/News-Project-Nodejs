const userModel = require('../models/User.js');

const login = (req, res) => {
    res.render("admin/login", { layout: false });
};
const dashboard = (req, res) => {
    res.render("admin/dashboard");
}
const settings = (req, res) => {
    res.render("admin/settings");
}
const index = (req, res) => {};
const logout = (req, res) => {};
const allUser = (req, res) => {
    res.render("admin/users");
};
const addUserPage = (req, res) => {
    res.render("admin/users/create");
};
const addUser = (req, res) => {};
const updateUserPage = (req, res) => {
    res.render("admin/users/update");
};
const updateUser = (req, res) => {};
const deleteUser = (req, res) => {};

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
    settings
};