import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import axios from "axios";
import MovieSubsComp from "./movieSubs";
import { useEffect, useState } from "react";
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"

function MovieComp({ ifApi, movData }) {

    const navigate = useNavigate()
    const {id} = useParams()
    const [ifApiVal, setIfApi] = useState()
    const [mov, setMov] = useState({})
    const [err, serErr] = useState("")
    const movAPI = "http://localhost:3000/movs"

    useEffect(() => {
      if(ifApi){
        setIfApi(ifApi)
      }
    }, [ifApi])

    useEffect(() => {
      if(ifApiVal === true){
        async function getData(){
          const {data} = await axios.get(`${movAPI}/${id}`, getHeaders())
          setMov(data)
        }
        getData()
      }else{
        setMov(movData)
      }
    }, [ifApiVal])

    async function deleteMovie(){
      try{
        const {data} = await axios.delete(`${movAPI}/${mov._id}`, getHeaders())
        if(confirm(data.message)){
          window.location.reload()}
      }catch(err){
        errorHandle(err)
      }
    }
  
  return (
    <>
      <strong>{mov?.name}, {mov?.premiered && mov.premiered.split("-")[0]}</strong>
      <br />
      Genres: {mov?.genres && mov.genres.join(", ")}
      <br />
      <div className="movieWrapper">
        <img src={mov?.image} className="img" />
        {mov?.subs && (
          <div className="subBox">
            <MovieSubsComp subs={mov.subs} />
          </div>
        )}
      </div>
      <br />
      <button className="button" onClick={() => navigate(`../edit-movie/${mov._id}`)}>Edit</button>&nbsp;&nbsp;
      <button className="button" onClick={deleteMovie}>Delete</button><br/>
      {err && <span className="error">{err}</span>}
    </>
  );
}

export default MovieComp;
