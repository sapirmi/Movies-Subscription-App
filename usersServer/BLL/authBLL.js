const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const userBLL = require("./userBLL")

async function login(username, password){
    const user = await userModel.findOne({username: username})
    if(user){
        if(await bcrypt.compare(password, user.password) )
        {
            const userData = await userBLL.getById(user._id.toString())
            return userData
        }else{
            return {message: "Password Incorrect"}
        }
    }else{
        return {message: "User Doesnt Exists"}
    }
}

async function updatePass(username, obj){
    const user = await userModel.findOneAndUpdate({username: username}, obj)
    if(user){
        await user.save()
        return true
    }
}



module.exports = {login, updatePass}