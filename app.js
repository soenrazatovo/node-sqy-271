const express = require("express")
const app = express()
const port = 3000

const userRouter = require("./routes/user.js")
const indexRouter = require("./routes/index.js")
const todoRouter = require("./routes/todo.js")

const cors = require("cors")
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
}

const cookieParser = require("cookie-parser")

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/todo', todoRouter)

 
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})