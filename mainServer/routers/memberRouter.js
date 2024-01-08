const express = require("express")
const memberBLL = require("../BLL/memberBLL")
const {checkAccess} = require("../middlewears/checkAccess")

// API - http://localhost:3000/members

const memberRouter = express.Router()
memberRouter.use(checkAccess)

memberRouter.get("/:id/:subs", async(req, res) =>{
    if(req.user.permissions.includes("View Subscriptions")){
        const {id, subs} = req.params
        const member = await memberBLL.getMemberById(id, subs)
        res.send(member)
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

memberRouter.get("/", async(req, res) =>{
    if(req.user.permissions.includes("View Subscriptions")){
        const members = await memberBLL.getTotalMembers()
        res.send(members)
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

memberRouter.post("/", async(req, res) => {
    if(req.user.permissions.includes("Create Subscriptions")){
        try{
            const obj = req.body
            await memberBLL.addMember(obj)
            res.status(200).json({"message": "Member Created!"})
        }catch(err){
            res.status(401).send(err)
        }
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

memberRouter.delete("/:id", async(req, res) => {
    if(req.user.permissions.includes("Delete Subscriptions")){
        try{
            const {id} = req.params
            await memberBLL.deleteMember(id)
            res.status(200).json({"message": "Member Deleted!"})
        }catch(err){
            res.status(401).send(err)
        }
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

memberRouter.put("/:id", async(req, res) => {
    if(req.user.permissions.includes("Update Subscriptions")){
        try{
            const obj = req.body
            const {id} = req.params
            await memberBLL.updateMember(id, obj)
            res.status(200).json({"message": "Member Updated!"})
        }catch(err){
            res.status(401).send(err)
        }
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})


module.exports = memberRouter