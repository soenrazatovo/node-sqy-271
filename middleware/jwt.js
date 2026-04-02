const jwt = require("jsonwebtoken")
require("dotenv").config()

const checkJWT = (req, res, next) => {

    const token = req.cookies.token

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, token_decoded) => {
        if (err) {
            res.status(403).json("Token invalide")
            res.redirect("/login")
        } else {
            console.log(token_decoded)
            req.userInfo = token_decoded
            next()
        }
    })

}

module.exports = checkJWT