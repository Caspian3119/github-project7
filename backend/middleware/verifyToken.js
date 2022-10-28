const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.body.activeToken
    if (token) {
        jwt.verify(token, "ACCOUNT_TOKEN", (error, payload) => {
            if (error) {
                res.send({ success: false, message: "Invalid Token"})
            } else {
                console.log(req.body.accountId)
                console.log(payload.accountId)
                req.accountId = payload.accountId;
                next();
            }
        })
    } else {
        res.send({ success: false, message: "Not Authenticated"})
    }
}
module.exports = verifyToken;