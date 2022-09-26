const jwt = require("jsonwebtoken")
const {uniqueId} = require("lodash")

exports.userLogin = async (req, res) => {

    try {
        const token = jwt.sign(
            {user_id: uniqueId()},
            process.env.AUTH_TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );
        res.status(200).send(successResponse({token}))
    } catch (e) {
        logger.error(e)
    }
};
