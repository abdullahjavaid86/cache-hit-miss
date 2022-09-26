const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["JUMP-AUTH-TOKEN"] || req.headers["jump-auth-token"];

    if (!token) {
        return res.status(403).send(errorResponse("Unauthorized, JUMP-AUTH-TOKEN is required", 403));
    }
    try {
        req.user = jwt.verify(token, process.env.AUTH_TOKEN_KEY);
    } catch (err) {
        return res.status(401).send(errorResponse("Unauthorized", 401));
    }
    return next();
};

module.exports = verifyToken;