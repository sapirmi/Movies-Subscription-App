const axios = require("axios")
const jwt = require("jsonwebtoken")
const env = require("../config/env.json")

const userAPI = "http://localhost:8000/login"

async function getUser(obj){
    const {data} = await axios.post(userAPI, obj)
    if(data.message){
        return {...data, status: 401}
    }else{
        const token = jwt.sign(data, env.token, {expiresIn: `${data.sessionTimeOut}m`})
        return {...data, status: 200, token: token}
    }
}

function checkToken(token){
    try{
        const result = jwt.verify(token, env.token)
        if(result){
            return result
        }else{
            return false
        }
    }catch(err){
        return false
    }
}


module.exports = {getUser, checkToken}