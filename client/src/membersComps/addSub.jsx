import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"
import {useAuth} from "../auth/authProvider"

function AddSubComp({memberId}) {

    const [movs, setMovs] = useState([])
    const [newSub, setNewSub] = useState({})
    const [err, serErr] = useState("")
    const {user} = useAuth()
    const movsAPI = "http://localhost:3000/movs"
    const subAPI = "http://localhost:3000/subs"

    useEffect(() => {
        async function getData(){
          const {data} = await axios.get(`${movsAPI}/movies`, getHeaders())
          setMovs(data)
        }
        getData()
    }, [])
    
    async function addSub(){
      try{
        const {data} = await axios.put(`${subAPI}/${memberId}`, newSub, getHeaders())
        serErr(data.message);
      }catch(err){
        serErr(errorHandle(err))
      }
    }

  return (
    <>
      <h4>Add New Movie</h4>
      <select onChange={(e) => setNewSub({...newSub, movieId: e.target.value})}>
        <option></option>
      {movs && movs.map(mov => (
        <option key={mov._id} value={mov._id}>{mov.name}</option>
      ))}
      </select>&nbsp;&nbsp;&nbsp;
      <input type="date" onChange={(e) => setNewSub({...newSub, date: e.target.value})}></input><br/>
      {err && <span className="error">{err}</span>} <br/>
      <button className="button" onClick={addSub}>Subscribe</button>
    </>
  );
}

export default AddSubComp;
