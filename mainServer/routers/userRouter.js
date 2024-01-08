const express = require("express")
const userBLL = require("../BLL/userBLL")
const {checkAccess} = require("../middlewears/checkAccess")

// API - http://localhost:3000/users

const userRouter = express.Router()
userRouter.use(checkAccess)

userRouter.get("/", async(req, res) =>{
    if(req.user.role === "ADMIN"){
        const users = await userBLL.getUsers()
        res.send(users)
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }

})

userRouter.get("/:id", async(req, res) =>{
    if(req.user.role === "ADMIN"){
        const {id} = req.params
        const user = await userBLL.getById(id)
        res.send(user)
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

userRouter.post("/", async(req, res) =>{
    if(req.user.role === "ADMIN"){
        const obj = req.body
        const result = await userBLL.addUser(obj)
        res.status(result.status).json(result.message)  
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

userRouter.put("/", async(req, res) => {
    if(req.user.role === "ADMIN"){
        const obj = req.body
        const result = await userBLL.updateUser(obj)
        res.status(result.status).json(result.message)    
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

userRouter.delete("/:id", async(req, res) => {
    if(req.user.role === "ADMIN"){
        try{
            const {id} = req.params
            const user = await userBLL.deleteUser(id)
            res.status(200).json({"message": "User Deleted!"})
        }catch(err){
            res.status(401).send(err)
        }
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

module.exports = userRouter