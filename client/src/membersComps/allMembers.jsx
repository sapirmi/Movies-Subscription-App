import { useEffect, useState } from "react"
import "../App.css"
import axios from "axios"
import MemberComp from "./memberComp"
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"

function AllMembersComp() {

  const [members, setMembers] = useState([])
  const [err, serErr] = useState("")
  const memberAPI = "http://localhost:3000/members"

  useEffect(() => {
    async function getData(){
      try{
        const {data} = await axios.get(memberAPI, getHeaders())
        setMembers(data)
      }catch(err){
        serErr(errorHandle(err))
      }
    }
    getData()
  }, [])

  return (
    <>
    {err && <span className="error">{err}</span>}
    {members && members.map(member => (
      <div className="framing" key={member._id}>
        <MemberComp ifApi={false} memberData={member}/>
        <br/>
      </div>
    ))} 
    </>
  )
}

export default AllMembersComp
