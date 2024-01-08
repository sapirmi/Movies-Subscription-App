import MovieSettingComp from "./movieSetting";
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"

function EditMovieComp() {

    const [mov, setMov] = useState({})
    const [err, serErr] = useState("")
    const {id} = useParams()
    const movsAPI = "http://localhost:3000/movs"

    useEffect(() => {
      async function getData(){
        try{
          const {data} = await axios.get(`${movsAPI}/${id}`, getHeaders())
          setMov(data)
        }catch(err){
          serErr(errorHandle(err))
        }}
      getData()
    }, [id])

  return (
    <>
    {err && <span className="error">{err}</span>}
    <h2>Edit Movie - {mov.name}</h2><br/>
    <MovieSettingComp oldMovie={mov} movieId={id}/>

    </>
  );
}

export default EditMovieComp;
