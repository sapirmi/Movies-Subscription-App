import { useEffect, useState } from "react"
import "../App.css"
import axios from "axios"
import UserComp from "./userComp"
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"


function AllUsersComp() {

  const [users, setUsers] = useState([])
  const usersAPI = "http://localhost:3000/users"

  useEffect(() => {
    async function getUsers(){
      const {data} = await axios.get(usersAPI, getHeaders())
      setUsers(data)
    }
    getUsers()
  }, [])

  return (
    <>
    {users && users.map(user => (
      <div className="framing" key={user._id}>
        <UserComp user={user}/><br/>
      </div>
    ))}
    </>
  )
}

export default AllUsersComp
