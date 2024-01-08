import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import MemberSettingComp from "./memberSetting";
import getHeaders from "../middlewears/getHeaders"

function EditMemberComp() {

    const [member, setMember] = useState({})
    const {id} = useParams()
    const memberAPI = "http://localhost:3000/members"

    useEffect(() => {
        async function getData(){
          const {data} = await axios.get(`${memberAPI}/${id}/false`, getHeaders())
          setMember(data)
        }
        getData()
      }, [id])

  return (
    <>
    <h2>Edit Member - {member.name}</h2><br/>
    <MemberSettingComp oldMember={true} member={member}/>

    </>
  );
}

export default EditMemberComp;
