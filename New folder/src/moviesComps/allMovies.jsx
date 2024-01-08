import { useEffect, useState } from "react"
import "../App.css"
import axios from "axios"
import MovieComp from "./movieComp"
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"

function AllMoviesComp() {

  const [movs, setMovs] = useState([])
  const [movsDisplay, setMovsDisplay] = useState([])
  const [search, setSearch] = useState("")
  const [err, serErr] = useState("")
  const movAPI = "http://localhost:3000/movs"

  useEffect(() => {
    async function getMovs(){
      try{
        const {data} = await axios.get(movAPI, getHeaders())
        setMovs(data)
        setMovsDisplay(data)
      }catch(err){
        errorHandle(err)
      }
    }
    getMovs()
  }, [])

  function searchBar(){
    setMovsDisplay(movs.filter(mov => mov.name.toLowerCase().includes(search.toLowerCase())))
  }

  return (
    <>
    Find Movie: <input type="text" onChange={(e) => setSearch(e.target.value)}/>
    <button className="button" onClick={searchBar}>Find</button><br/>
    {err && <span className="error">{err}</span>}
    {movsDisplay && movsDisplay.map(mov => (
      <div className="framing" key={mov._id}>
        <MovieComp ifApi={false} movData={mov}/>
        <br/>
      </div>
    ))} 
    </>
  )
}

export default AllMoviesComp
