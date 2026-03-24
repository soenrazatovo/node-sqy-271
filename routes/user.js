const express = require("express")
const router = express.Router()

const db = require("../config/db.js")
const bcrypt = require('bcrypt');

router.post("/login", (req, res) => {
    console.log(req.body)
    let {email, password} = req.body

    res.json({content : "Login received", email}).status(200)
})

router.post("/signup", (req, res) => {
    console.log(req.body)
    let {email, pseudo, password} = req.body

    bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
            res.json({status: 500, content: error}).status(500)
        } else {
            const sql = "INSERT INTO Users(name,email,password) VALUES (?,?,?)"
            db.query(sql, [pseudo, email, hash], (error, results) => {
                if (error) {
                    res.json({status: 500, content: error}).status(500)
                } else {
                    res.json({status: 200, content : "Signup Sucessful", email}).status(200)
                }
            })
        }
    })

})

module.exports = router