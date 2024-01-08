import { useEffect, useState } from "react"
import "../App.css"
import axios from "axios"
import getHeaders from "../middlewears/getHeaders"
import errorHandle from "../middlewears/errorHandle"

function UserSettingComp({isNew, oldUser}) {

  const [user, setUser] = useState({})
  const [newUser, setNewUser] = useState()
  const [updatedUser, setUpdatedUser] = useState()
  const [error, setError] = useState("")

  const [subView, setSubView] = useState({status: false, text: "View Subscriptions", disabled: false})
  const [subCreate, setSubCreate] =  useState({status: false, text: "Create Subscriptions"})
  const [subDelete, setSubDelete] =  useState({status: false, text: "Delete Subscriptions"})
  const [subUpdate, setSubUpdate] =  useState({status: false, text: "Update Subscriptions"})

  const [movieView, setMovieView] = useState({status: false, text: "View Movies", disabled: false})
  const [movieCreate, setMovieCreate] = useState({status: false, text: "Create Movies"})
  const [movieDelete, setMovieDelete] = useState({status: false, text: "Delete Movies"})
  const [movieUpdate, setMovieUpdate] = useState({status: false, text: "Update Movies"})

  const perms = [subView, subCreate, subDelete, subUpdate, movieView, movieDelete, movieCreate, movieUpdate]
  const usersAPI = "http://localhost:3000/users"

  useEffect(() => {
    if(oldUser){
      setUser(oldUser)
    }
  }, [oldUser])

  //mark checkboxes for exist user 
  useEffect(() => {
    if(oldUser && oldUser.permissions){
      oldUser.permissions.forEach(per => {
        switch(per){
          case "View Subscriptions":
            setSubView({...subView, status: true})
            break
          case "Create Subscriptions":
            setSubCreate({...subCreate, status: true})
            break
          case "Delete Subscriptions":
            setSubDelete({...subDelete, status: true})
            break
          case "Update Subscriptions":
            setSubUpdate({...subUpdate, status: true})
            break
          case "View Movies":
            setMovieView({...movieView, status: true})
            break
          case "Create Movies":
            setMovieCreate({...movieCreate, status: true})
            break
          case "Delete Movies":
            setMovieDelete({...movieDelete, status: true})
            break
          case "Update Movies":
            setMovieUpdate({...movieUpdate, status: true})
            break}})}
    }, [oldUser.permissions])


  //mark view checkbox if others are marked - subscription options
  useEffect(() => {
    if(subCreate.status || subDelete.status || subUpdate.status){
      setSubView({...subView, status: true, disabled: true})
    }else{
      setSubView({...subView, disabled: false})
    }
  }, [subCreate, subDelete, subUpdate])

  //mark view checkbox if others are marked - movie options
  useEffect(() => {
    if(movieCreate.status || movieDelete.status || movieUpdate.status){
      setMovieView({...movieView, status: true, disabled: true})
    }else{
      setMovieView({...movieView, disabled: false})
    }
  }, [movieDelete, movieCreate, movieUpdate])

  //post request in useEffect - sending newUser 
  function getNewUser(targetState){
    const obj = {...user, "permissions": perms.filter((per) => per.status === true).map((per) => per.text)}
    targetState(obj)}

  useEffect(() => {
      async function addUser(){
        try{
          const {data} = await axios.post(usersAPI, newUser, getHeaders())
          setError(data.message)
        }catch(err){
          setError(errorHandle(err));
        }
      }
      if(newUser){
        addUser()
      }
    }, [newUser])

  useEffect(() => {
    async function updateUser(){
        try{
          const {data} = await axios.put(usersAPI, updatedUser, getHeaders())
          setError(data.message)
        }catch(err){
          setError(errorHandle(err))
        }}
    if(updatedUser){
      updateUser()
    }
  }, [updatedUser])


  return (
    <>
      First Name: <input type="text" defaultValue={user?.firstName} onChange={(e) => setUser({...user, "firstName": e.target.value})}/><br/>
      Last Name: <input type="text" defaultValue={user?.lastName} onChange={(e) => setUser({...user, "lastName": e.target.value})}/><br/>
      Username: {isNew === false ? 
      <input type="text" value={user?.username}/>
      : <input type="text" onChange={(e) => setUser({...user, "username": e.target.value})}/>}<br/>
      Session time out (minutes): <input type="number" defaultValue={user?.sessionTimeOut} onChange={(e) => setUser({...user, "sessionTimeOut": e.target.value})}/><br/>
      {isNew === false ? 
      <span>
        <span>Created Data: {user?.createdDate}</span><br/>
      </span>
       : null}      
      Permissions: <br/>
      <input type="checkbox" checked={subView.status} disabled={subView.disabled} onChange={(e) => setSubView({...subView, status: e.target.checked})}/>View Subscriptions<br/>
      <input type="checkbox" checked={subCreate.status} onChange={(e) => setSubCreate({...subCreate, status: e.target.checked})}/>Create Subscriptions<br/>
      <input type="checkbox" checked={subDelete.status} onChange={(e) => setSubDelete({...subDelete, status: e.target.checked})}/>Delete Subscriptions<br/>
      <input type="checkbox" checked={subUpdate.status} onChange={(e) => setSubUpdate({...subUpdate, status: e.target.checked})}/>Update Subscriptions<br/>
      <input type="checkbox" checked={movieView.status} disabled={movieView.disabled} onChange={(e) => setMovieView({...movieView, status: e.target.checked})}/>View Movies<br/>
      <input type="checkbox" checked={movieCreate.status} onChange={(e) => setMovieCreate({...movieCreate, status: e.target.checked})}/>Create Movies<br/>
      <input type="checkbox" checked={movieDelete.status} onChange={(e) => setMovieDelete({...movieDelete, status: e.target.checked})}/>Delete Movies<br/>
      <input type="checkbox" checked={movieUpdate.status} onChange={(e) => setMovieUpdate({...movieUpdate, status: e.target.checked})}/>Update Movies<br/><br/>

      {error && <span className="error">{error}
        <br/><br/>
      </span>}
      <button className="button" onClick={() => getNewUser(setUpdatedUser)}>Update</button>
      {isNew === false ? <button className="button">Delete</button> : 
      <button className="button" onClick={() => getNewUser(setNewUser)}>Create</button> }
    </>
  )
}

export default UserSettingComp
