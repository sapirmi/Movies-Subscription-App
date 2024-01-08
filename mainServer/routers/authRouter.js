const express = require("express")
const authBLL = require("../BLL/authBLL")

const authRouter = express.Router()

// API - http://localhost:3000/auth

authRouter.post("/", async(req, res) =>{
    const obj = req.body
    const user = await authBLL.getUser(obj)
    res.status(user.status).send(user)
})

authRouter.get("/check/:token", (req, res) => {
    const {token} = req.params
    const result = authBLL.checkToken(token)
    res.send(result)
})

module.exports = authRouter