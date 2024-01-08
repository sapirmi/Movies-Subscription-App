import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"


function MovieSettingComp({oldMovie, movieId}) {

    const [newMov, setNewMov] = useState({})
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const movURL = "http://localhost:3000/movs"

    useEffect(() => {
        if(oldMovie){
            setNewMov(oldMovie)
        }
      }, [oldMovie])

    async function addMovie(){
        try{
            const {data} = await axios.post(movURL, newMov, getHeaders())
            setError(data.message)
          }catch(err){
            setError(errorHandle(err));
    }}

    async function updateMovie(){
        try{
            const {data} = await axios.put(`${movURL}/${movieId}`, newMov, getHeaders())
            setError(data.message)
          }catch(err){
            setError(errorHandle(err));
    }}

  return (
    <>
        Name: <input type="text" defaultValue={newMov?.name} onChange={(e) => setNewMov({...newMov, name: e.target.value})}/><br/>
        Genres: <input type="text" defaultValue={newMov?.genres} onChange={(e) => setNewMov({...newMov, genres: e.target.value.split(",").map(genre => genre.trim())})}/><br/>
        Image Url: <input type="text" defaultValue={newMov?.image} onChange={(e) => setNewMov({...newMov, image: e.target.value})}/><br/>
        Premired: <input type="date" defaultValue={newMov.premiered && newMov.premiered.split("T")[0]} onChange={(e) => setNewMov({...newMov, premiered: e.target.value})}/><br/>

        <span className="error">{error}</span><br/>
        {oldMovie === false ? 
        <button className="button" onClick={addMovie}>Save</button> 
        :
        <button className="button" onClick={updateMovie}>Update</button>}  
        
        <button className="button" onClick={() => navigate(`../show-movies`)}>Cancel</button>
    </>
  );
}

export default MovieSettingComp;
