const express = require("express")
const cors = require("cors")
const connectDB = require("./config/dbConnection")
const getDataToDB = require("./config/dbFirstRun")
const subRouter = require("./routers/subsRouter")
const movRouter = require('./routers/movRouter')
const memberRouter = require("./routers/memberRouter")
const authRouter = require("./routers/authRouter")
const userRouter = require("./routers/userRouter")

const app = express()
const port = 3000

connectDB()
// getDataToDB()

app.use(cors())
app.use(express.json())

app.use("/subs", subRouter)
app.use("/movs", movRouter)
app.use("/members", memberRouter)
app.use("/auth", authRouter)
app.use("/users", userRouter)

app.listen(port, () => {console.log(`app is listening at http://localhost:${port}`)})