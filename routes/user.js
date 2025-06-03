const { Router } = require('express');
const path = require("path")
const multer = require('multer');
const { handleSignup, handleSignin } = require('../controllers/user')
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/images"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }

})

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