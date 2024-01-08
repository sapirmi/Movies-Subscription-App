import { useNavigate } from "react-router-dom"
import "../App.css"
import axios from "axios"
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"
import { useState } from "react"

function UserComp({user}) {

  const navigate = useNavigate()
  const [err, serErr] = useState("")
  const usersAPI = "http://localhost:3000/users"

  async function deleteUser(){
    try{
      const {data} = await axios.delete(`${usersAPI}/${user._id}`, getHeaders())
      if(confirm(data.message)){
        window.location.reload(); 
    }}catch(err){
      serErr(errorHandle(err))
    }}


  return (
    <>
      <strong>Name: </strong>{user.firstName + " " + user.lastName}<br/>
      <strong>Username: </strong>{user.username}<br/>
      <strong>Session time out (minutes): </strong>{user.sessionTimeOut}<br/>
      <strong>Created data: </strong>{user.createdDate}<br/>
      <strong>Premissions: </strong>{user.permissions && user.permissions.length > 1 ? user.permissions.join(", ") : user.permissions}<br/>
      <button className="button" onClick={() => navigate(`../edit-users/${user._id}`)}>Edit</button>&nbsp;&nbsp; 
      <button className="button" onClick={deleteUser}>Delete</button><br/>
      {err && <span className="error">{err}</span>}
      
    </>
  )
}

export default UserComp
