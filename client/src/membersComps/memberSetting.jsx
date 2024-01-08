import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import errorHandle from "../middlewears/errorHandle"
import { useNavigate } from "react-router-dom"
import getHeaders from "../middlewears/getHeaders"

function MemberSettingComp({oldMember, member}) {

    const [newMember, setNewMember] = useState({})
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const memberAPI = "http://localhost:3000/members"

    useEffect(() => {
        if(member){
          setNewMember(member)
        }
      }, [member])

    async function addMember(){
        try{
            const {data} = await axios.post(memberAPI, newMember, getHeaders())
            setError(data.message)
          }catch(err){
            setError(errorHandle(err));
    }}

    async function updateMovie(){
        try{
            const {data} = await axios.put(`${memberAPI}/${newMember._id}`, newMember, getHeaders())
            setError(data.message)
          }catch(err){
            setError(errorHandle(err));
    }}


  return (
    <>
        Name: <input type="text" defaultValue={newMember?.name} onChange={(e) => setNewMember({...newMember, name: e.target.value})}/><br/>
        Email: <input type="text" defaultValue={newMember?.email} onChange={(e) => setNewMember({...newMember, email: e.target.value})}/><br/>
        City: <input type="text" defaultValue={newMember?.city} onChange={(e) => setNewMember({...newMember, city: e.target.value})}/><br/>

        <span className="error">{error}</span><br/>
        {oldMember === false ? 
        <button className="button" onClick={addMember}>Save</button> 
        :
        <button className="button" onClick={updateMovie}>Update</button>}  
        
        <button className="button" onClick={() => navigate(`../show-members`)}>Cancel</button>
    </>
  );
}

export default MemberSettingComp;
