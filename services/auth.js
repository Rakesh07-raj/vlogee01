const jwt = require("jsonwebtoken");

const secretId = "rakeshraj@1234"

function setUser(user) {
    if (!user) return false;
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        profileImg: user.profileImg
    };

    return jwt.sign(payload, secretId);
}

function getUser(token) {
    if (!token) return;
    return jwt.verify(token, secretId);
}

module.exports = {
    setUser,
    getUser
}