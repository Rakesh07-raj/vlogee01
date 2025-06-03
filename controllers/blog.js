const Blog = require("../models/blog");
const Comment = require("../models/comments");


const handleViewBlog = async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findOne({ _id: id }).populate("createdBy");
    const comments = await Comment.find({ blogId: id }).populate('createdBy');
    console.log(blog)
    const user = req.user;
    res.render("blog", { blog, user, comments });
};

const handleAddBlog = async (req, res) => {
    const { title, content } = req.body;
    const blog = await Blog.create({
        title,
        content,
        createdBy: req.user._id,
        coverImg: `/uploads/${req.file.filename}`
    });
    res.redirect(`/blog/${blog._id}`);
}


const handleGetEditBlog = async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.render('addblog', { blog, user: req.user });
}

const handlePostEditBlog = async (req, res) => {
    const { title, content } = req.body;
    const coverImg = req.file ? `/uploads/${req.file.filename}` : req.body.oldCoverImg;
    const blog = await Blog.findOneAndUpdate(
        { _id: req.params.id },
        { title, content, coverImg }
    );
    res.redirect(`/blog/${blog._id}`);
}

const handleDeleteBlog = async (req, res) => {
    await Blog.deleteOne({ _id: req.params.id });
    res.redirect("/");
};

const handleBlogComment = async (req, res) => {
    await Comment.create({
        content: req.body.commentContent,
        createdBy: req.user._id,
        blogId: req.params.blogId
    });
    res.redirect(`/blog/${req.params.blogId}`);
};

module.exports = {
    handleViewBlog,
    handleAddBlog,
    handleGetEditBlog,
    handlePostEditBlog,
    handleDeleteBlog,
    handleBlogComment
};