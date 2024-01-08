const userModel = require("../models/userModel")
const jf = require("jsonfile")

const usersJson = "./Data/users.json"
const permsJson = "./Data/permissions.json"


async function getUsers(){
    const dbUser = await userModel.find()
    const users = await jf.readFile(usersJson)
    const permissions = await jf.readFile(permsJson)

    const result = dbUser.map(user => {
        return {"id": user._id, "username": user.username,
    ...users.find(item => item._id === user._id.toString()),
    ...permissions.find(item => item._id === user._id.toString())}})
    return result
}

async function getById(id){
    const dbUser = await userModel.findById(id)
    const users = await jf.readFile(usersJson)
    const permissions = await jf.readFile(permsJson)

    const data = {username: dbUser.username, role: dbUser.role, ...users.find(user => user._id === id),
        ...permissions.find(user => user._id === id)}
    return data
}

async function addUser(obj){
    const user = new userModel({username: obj.username})
    const result = await user.save()
    if(result){
        const permissions = await jf.readFile(permsJson)
        jf.writeFile(permsJson, [...permissions, {"_id": user._id.toString(), "permissions": obj.permissions}])}

        delete obj.permissions
        const users = await jf.readFile(usersJson)
        jf.writeFile(usersJson, [...users, {"_id": user._id.toString(), 
                                "createdDate": new Date(), ...obj}])
    }

function updateJsonFile(jsonData, userId, obj, perms){
    const itemIndex = jsonData.findIndex(x => x._id === userId)
    if(itemIndex !== -1){
        if(perms){
            jsonData[itemIndex] = {"_id": userId, "permissions": obj.permissions}
        }else{
            delete obj.permissions
            jsonData[itemIndex] = {...jsonData[itemIndex], ...obj}
        }
}}

async function updateUser(obj){
    const updateResult = await userModel.findOne({username: obj.username})
    if(updateResult){
        const userId = updateResult._id.toString()
        const permissions = await jf.readFile(permsJson)
        updateJsonFile(permissions, userId, obj, true)
        jf.writeFile(permsJson, permissions)
        const users = await jf.readFile(usersJson)
        updateJsonFile(users, userId, obj, false)
        jf.writeFile(usersJson, users)
    }else{
        return {message: "Username doesnt exists"}
    }}

async function deleteUser(id){
    await userModel.findByIdAndDelete(id)
    const users = await jf.readFile(usersJson)
    jf.writeFile(usersJson, users.filter(x => x._id !== id))
    const permissions = await jf.readFile(permsJson)
    jf.writeFile(permsJson, permissions.filter(x => x._id !== id))
}

module.exports = {getUsers, addUser, getById, updateUser, deleteUser}