const express = require("express")
const router = express.Router()

const db = require("../config/db.js")

router.get("/", (req, res) => {
    const sql = "SELECT * FROM Todos"
    db.query(sql, (err, todos) => {
        if (err) {
            console.log(err)
            res.json(err).status(500)
        } else {
            console.log(todos)
            res.json(todos).status(200)
        }
    })
})

router.post("/add", (req, res) => {
    let {content} = req.body
    
    const sql = "INSERT INTO Todos(content) VALUES (?)"
    db.query(sql, [content], (err, db_res) => {
        if (err) {
            console.log(err)
            res.json(err).status(500)
        } else {
            res.json("Todo added sucessfully").status(200)
        }
    })
})

router.put("/modify", (req, res) => {
    let {id, content, checked} = req.body

    const sql = "UPDATE Todos SET content = ?, checked = ? WHERE id = ?"
    db.query(sql, [content,checked, id], (err, db_res) => {
        if (err) {
            console.log(err)
            res.json(err).status(500)
        } else {
            res.json("Todo modified sucessfully").status(200)
        }
    })
})

router.delete("/delete", (req, res) => {
    let {id} = req.body

    const sql = "DELETE FROM Todos WHERE id = ?"
    db.query(sql, [id], (err, db_res) => {
        if (err) {
            console.log(err)
            res.json(err).status(500)
        } else {
            res.json("Todo deleted sucessfully").status(200)
        }
    })
})



module.exports = router