const express = require("express")
const authBLL = require("../BLL/authBLL")

// API - http://localhost:8000/login

const authRouter = express.Router()

authRouter.post("/", async(req, res) => {
    const {username, password} = req.body
    const user = await authBLL.login(username, password)
    res.send(user)
})

authRouter.put("/:username", async(req, res) => {
    const {username} = req.params
    const obj = {password: req.body.password}
    const user = await authBLL.updatePass(username, obj)
    if(user){
        res.status(200).json({message: "Password Changed!"})
    }else{
        res.status(401).json({message: "Username Doesnt Exists"})
    }
})

module.exports = authRouter