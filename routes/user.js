const { Router } = require('express');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const { handleSignup, handleSignin } = require('../controllers/user')


const router = Router();
const upload = multer({ storage })

router.get("/signup", (req, res) => {
    return res.render("signUp", { error: req.query.error })
})

router.get("/signin", (req, res) => {
    return res.render("signIn", { error: req.query.error })
})

router.get('/logout', (req, res) => {
    return res.clearCookie('token').redirect("/")
})


router.post("/signup", upload.single('profileImg'), handleSignup);


router.post("/signin", handleSignin);




module.exports = router;