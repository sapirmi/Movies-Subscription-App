const express = require("express")
const subBLL = require("../BLL/subBLL")
const {checkAccess} = require("../middlewears/checkAccess")

// API - http://localhost:3000/subs

const subRouter = express.Router()
subRouter.use(checkAccess)


subRouter.put("/:id", async(req, res) =>{
    if(req.user.permissions.includes("Update Subscriptions")){
        const {id} = req.params
        const obj = req.body
        const result = await subBLL.updateSub(id, obj)
        res.send({message: "Subscription Created!"})
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

subRouter.get("/:id", async(req, res) =>{
    if(req.user.permissions.includes("Update Subscriptions")){
        const {id} = req.params
        const obj = req.body
        const sub = await subBLL.updateSub(id,obj)
        res.send({message: "Subscription Updated!"})
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

module.exports = subRouter