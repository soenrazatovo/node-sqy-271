const express = require("express")
const router = express.Router()

const db = require("../config/db.js")
const util = require('util');
const queryAsync = util.promisify(db.query).bind(db);

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken")
const checkJWT = require("../middleware/jwt.js")
require("dotenv").config()


router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body
        const users = await queryAsync("SELECT * FROM Users WHERE email = ?", [email])

        if (users.length == 1) {
            if (await bcrypt.compare(password, users[0].password)) {

                let token = jwt.sign({ id: users[0].id, admin: true }, process.env.JWT_SECRET_KEY)
                res.cookie("token", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'Strict'})

                res.json("Connexion Valide").status(200)

            } else {
                res.json("Mot de passe Invalide").status(401)
            }
        } else {
            res.json("Email Invalide").status(401)
        }
    } catch (err) {
        res.send(err).status(500)
    }
})

router.post("/signup", async (req, res) => {
    try {
        let { email, pseudo, password } = req.body

        const users = await queryAsync("SELECT * FROM Users WHERE email = ?", [email])
        if (users.length == 0) {
            const hash = await bcrypt.hash(password, 10)
            const db_res = await queryAsync("INSERT INTO Users(name,email,password) VALUES (?,?,?)", [pseudo, email, hash])
            res.status(200).json(db_res)
        } else {
            res.json("Compte possède déjà cette email").status(401)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/logout", checkJWT, (req, res) => {
    res.clearCookie("token", {httpOnly: true, secure: true, sameSite: 'Strict'})
    .send().status(200)
}) 

router.get("/protected", checkJWT, (req, res) => {
    console.log(req.userInfo)
    res.json({message : "JWT valide", content: req.userInfo}).status(200)
})

module.exports = router