import { useParams } from "react-router-dom"
import "../App.css"
import UserSettingComp from "./userSetting"
import { useEffect, useState } from "react"
import axios from "axios"
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"

function EditUserComp() {

  const [user, setUser] = useState({})
  const {id} = useParams()
  const usersAPI = "http://localhost:3000/users"

  useEffect(() => {
    async function getData(){
      const {data} = await axios.get(`${usersAPI}/${id}`, getHeaders())
      setUser(data)
    }
    getData()
  }, [id])

  return (
    <>
      <h2>Edit User - {user.firstName + " " + user.lastName}</h2><br/>
      <UserSettingComp isNew={false} oldUser={user}/>
      
    </>
  )
}

export default EditUserComp
