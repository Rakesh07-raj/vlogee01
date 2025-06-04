const { Router } = require('express');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const { requireLogin } = require('../middlewares/auth');
const { handleViewBlog, handleAddBlog, handleGetEditBlog, handlePostEditBlog, handleDeleteBlog, handleBlogComment } = require('../controllers/blog');
const router = Router();

// Multer config
const upload = multer({ storage });


// Show add blog form (protected)
router.get('/add-blog', requireLogin, (req, res) => {
    res.render("addblog", { user: req.user });
});

// Handle blog creation (protected)
router.post("/add-blog", requireLogin, upload.single('coverImg'), handleAddBlog);

// Show edit form (protected)
router.get("/edit-blog/:id", requireLogin, handleGetEditBlog);

// Handle blog update (protected)
router.post("/edit-blog/:id", requireLogin, upload.single('coverImg'), handlePostEditBlog);

// Delete blog (protected)
router.get("/delete-blog/:id", requireLogin, handleDeleteBlog);

// Post a comment (protected)
router.post("/:blogId", requireLogin, handleBlogComment);

// View blog post
router.get("/:id", handleViewBlog);


module.exports = router;
