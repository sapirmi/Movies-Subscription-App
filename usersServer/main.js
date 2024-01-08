const express = require("express")
const cors = require("cors")
const connectDB = require("./config/dbConnection")
const userRouter = require("./routers/userRouter")
const authRouter = require("./routers/authRouter")

const app = express()
const port = 8000

connectDB()

app.use(cors())
app.use(express.json())

app.use("/users", userRouter)
app.use("/login", authRouter)

app.listen(port, () => {console.log(`app is listening at http://localhost:${port}`)})