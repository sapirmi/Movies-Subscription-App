import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import {useAuth} from "../auth/authProvider"


function LoginPageComp() {
  const [loginData, setLoginData] = useState()
  const [err, serErr] = useState()
  const [isLogin, setIsLogin] = useState()

  const location = useLocation()
  const { login } = useAuth();
  const loginAPI = "http://localhost:8000/login"

  useEffect(() => {
    setIsLogin(location.pathname.slice(1))
    serErr("")
  }, [location])

  async function handleSubmit(e){
    e.preventDefault()
    if(loginData?.username && loginData?.password){
      if(isLogin === "login"){
        try{
          const loginUser = await login(loginData)
        }catch(err){
          serErr(err.response.data.message)
        }
      }else{
        try{
          const {data} = await axios.put(`${loginAPI}/${loginData.username}`, loginData)
          serErr(data.message)
        }catch{
          serErr(err.response.data.message)
        }}
    }else{
      serErr("Please fill all fields")
    }}

  return (
    <>
      <h1>{isLogin === "login" ? "Login" : "Create"} Page</h1><br/>
      <form onSubmit={handleSubmit}>
        Username: <input type="text" onChange={(e) => setLoginData({...loginData, username: e.target.value})}/><br/><br/>
        Password: <input type="password" onChange={(e) => setLoginData({...loginData, password: e.target.value})}/><br/><br/>
        {err && <span className="error">{err}</span>}<br/>
        <button type="submit" className="button">{isLogin === "login" ? "Login" : "Create"}</button>
      </form><br/><br/>
      {isLogin === "login" ? "New User? " : "Return to "}
      <Link to={isLogin === "login" ? "/create" : "/login"}>
        {isLogin === "login" ? "Create Account" : "Login Page"}</Link>

    </>
  )
}

export default LoginPageComp
