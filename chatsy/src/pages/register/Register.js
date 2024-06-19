import React, {useState} from "react";
import Axios from 'axios';
import { RegisterForm } from "./components/RegisterForm";
import { LogRegBtnGroup } from "../login/components/LogRegBtnGroup";
import "../../assets/styles/Login.css"

function LoginBox(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const [confirmPassword, setConfirmPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const REGISTER_URL = 'http://localhost:3000/register'

  const handelRegister = async (e) => {
    try {
      const response = await Axios.post(REGISTER_URL,
        JSON.stringify({username, password}),
        {
          headers: {"Content-Type" : "application/json"},
          withCredentials: true
        }
      )
      
      setPassword('')
      if(response.status === 200){
        setUsername('')
        document.location.href = "http://localhost:3001/home";
      }
      else{
        setLoginError(JSON.stringify(response?.data))
      }
    } catch(err){
      if(err.response.status === 400){
        setLoginError('Missing username or password')
      } else if(err.response.status === 401){
        setLoginError('Username or password is incorrect')
      }
    }
  }

  const login = () => {
    document.location.href = "http://localhost:3001/";
  }

  return(
    
    <div className="loginForm">
      <RegisterForm loginError={loginError} setUsername={setUsername} setPassword={setPassword}></RegisterForm>
      <LogRegBtnGroup register={handelRegister} login={login}></LogRegBtnGroup>
    </div>
    
      
  )
}

export default function Register(){
  return(
    <div className="loginFormContainer">
      <LoginBox></LoginBox>
    </div>
    
  )
}