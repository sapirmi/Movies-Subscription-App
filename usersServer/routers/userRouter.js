const express = require("express")
const userBLL = require("../BLL/userBLL")
const {handleError} = require("../middlewears/handleModelError")
const {handleRouterErrors} = require("../middlewears/handleRouterErrors")

// API - http://localhost:8000/users

const userRouter = express.Router()

userRouter.get("/", async(req, res) => {
    const data = await userBLL.getUsers()
    res.send(data)
})

userRouter.get("/:id", async(req, res) => {
    const {id} = req.params
    const data = await userBLL.getById(id)
    res.send(data)
})

userRouter.post("/", async(req, res) => {
    const obj = req.body
    try{
        await userBLL.addUser(obj)
        res.status(200).json({"message": "User Created!"})
    }catch(err){
        res.status(401).json({"message": handleError(err)})
    }
})

userRouter.put("/", async(req, res) => {
    const obj = req.body
    const result = await userBLL.updateUser(obj)
    if(result){
        res.status(200).json(result)
    }else{
        res.status(200).json({"message": "User Updated!"})
    }})

userRouter.delete("/:id", async(req, res) => {
    const {id} = req.params
    await userBLL.deleteUser(id)
    res.status(200).json({"message": "User Deleted!"})
})
    

module.exports = userRouter