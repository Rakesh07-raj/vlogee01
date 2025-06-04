require('dotenv').config(); // Load .env
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const cookieParser = require('cookie-parser')


const { checkAutorization, checkAuthentication } = require("./middlewares/auth");
const Blog = require('./models/blog');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Error : ", err))

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(checkAuthentication)
app.use(express.static('public'))

app.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("createdBy")
    res.render('home', { user: req.user, blogs })
})

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => console.log("Server Started At : 8000"));