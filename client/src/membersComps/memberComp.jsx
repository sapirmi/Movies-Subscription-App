import "../App.css";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import AddSubComp from "./addSub";
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"

function MemberComp({ifApi, memberData}) {

  const {id} = useParams()
  const [member, setMember] = useState({})
  const [ifApiVal, setIfApi] = useState()
  const [subField, setSubField] = useState(false)
  const [err, serErr] = useState("")
  const navigate = useNavigate()

  const memberAPI = "http://localhost:3000/members"

  useEffect(() => {
    if(ifApi){
      setIfApi(ifApi)
    }
  }, [ifApi])

  useEffect(() => {
    if(ifApiVal === true){
        async function getData(){
            const {data} = await axios.get(`${memberAPI}/${id}/true`, getHeaders())
            setMember(data[0])
          }
      getData()
    }else{
      setMember(memberData)
    }
  }, [ifApiVal])

  async function deleteMember(){
    try{
      const {data} = await axios.delete(`${memberAPI}/${member._id}`, getHeaders())
      if(confirm(data.message)){
        window.location.reload()}
    }catch(err){
      serErr(errorHandle(err))
  }}

  return (
    <>
      <h2>{member?.name}</h2>
      Email: {member?.email} <br/>
      City: {member?.city}<br/>
      <button className="button" onClick={() => navigate(`../edit-member/${member._id}`)}>Edit</button>
      <button className="button" onClick={deleteMember}>Delete</button><br/>
      {err && <span className="error">{err}</span>}

      <h3>Movies Watched</h3>
      <button className="button" onClick={() => setSubField(true)}>Subscribe to new movie</button><br/>
      {subField && <AddSubComp memberId={member._id}/>}
      <ul>
        {member?.movies && member.movies.map(movie => (
          <li key={movie.movieId}>
            <Link to={`/movies/${movie.movieId}`}>{movie.name}, {movie?.subDate.split("T")[0]}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MemberComp;
