const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require('dotenv').config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser());
app.use(expressLayouts);
app.set("layout", "layout");

// view engine
app.set('view engine', 'ejs');

// Database connect
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Mongo db connect")
}).catch((err) => {
    console.error('Connection error', err);
})

app.use("/", require("./routes/frontend"));
app.use("/admin", (req, res, next) => {
    res.locals.layout = "admin/layout";
    next();
})
app.use("/admin", require("./routes/admin"));

app.get("", (req, res)=>{
    res.send("Hello")
})

const port= process.env.PORT || 3050
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})





