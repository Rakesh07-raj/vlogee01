const mongoose = require('mongoose');
const { randomBytes, createHmac } = require('crypto');
const { setUser } = require('../services/auth');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: "/images/userProfileImg.png"
    },
    roles: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified('password')) return next();


    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest('hex')

    user.password = hashedPassword;
    user.salt = salt;
    next();
})

UserSchema.static("matchLoggedInUser", function (user, password) {

    const salt = user.salt;
    const hashedPassword = createHmac('sha256', salt)
        .update(password)
        .digest('hex');


    if (hashedPassword !== user.password) return false;
    const token = setUser(user);
    return token;
}
)
const User = mongoose.model('user', UserSchema);


module.exports = User; 
