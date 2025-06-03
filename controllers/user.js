const User = require('../models/user');


const handleSignup = async (req, res) => {
    const { username, email, password } = req.body;

    let userData = { username, email, password };

    if (req.file) {
        userData.profileImg = `/images/${req.file.filename}`;
        console.log(req.file)
    }

    const user = await User.create(userData);

    if (user) return res.redirect("/user/signin");
}

const handleSignin = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.redirect("/user/signIn?error=User Not Found");
        }

        const token = User.matchLoggedInUser(user, password);
        if (!token) {
            return res.redirect("/user/signIn?error=Invalid Password");
        }


        return res.cookie("token", token, { maxAge: 10 * 24 * 60 * 60 * 1000 }).redirect("/");
    } catch (error) {
        console.error(error);
        return res.render("signIn", { error: "Something went wrong!" });
    }
}


module.exports = {
    handleSignup,
    handleSignin
}