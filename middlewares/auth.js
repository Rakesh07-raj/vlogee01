const { getUser } = require('../services/auth');

function checkAuthentication(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        req.user = null;
        return next(); // allow access
    }

    const user = getUser(token);
    if (!user) {
        req.user = null;
        return next();
    }

    req.user = user;
    next();
}

function requireLogin(req, res, next) {
    if (!req.user) {
        return res.redirect('/user/signin'); // or res.status(401).send("Login required")
    }
    next();
}

function checkAutorization(roles = []) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).send("Forbidden");
        }
        next();
    };
}

module.exports = { checkAuthentication, requireLogin, checkAutorization };
