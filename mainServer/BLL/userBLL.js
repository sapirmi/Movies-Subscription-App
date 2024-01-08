const axios = require("axios")
const {handleErrors} = require("../middlewears/handleErrors")

const userAPI = "http://localhost:8000/users"

async function getUsers(){
    const {data} = await axios.get(userAPI)
    return data
}

async function getById(id){
    const {data} = await axios.get(`${userAPI}/${id}`)
    return data
}

async function addUser(obj){
    try{
        const {data} = await axios.post(userAPI, obj)
        return {message: data, status: 200}
    }catch(err){
        return {message: handleErrors(err), status: 401}
    }
}

async function updateUser(obj){
    const {data} = await axios.put(userAPI, obj)
    if(data){
        return {message: data, status: 401}    
    }else{
        return {message: {message: "User Updated!", status: 200}}
    }
}

async function deleteUser(id){
    const {data} = await axios.delete(`${userAPI}/${id}`)
    return data
}

module.exports = {getUsers, addUser, getById, updateUser, deleteUser}