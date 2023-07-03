import React, {useState} from "react";
import Axios from 'axios';
import { RegisterForm } from "./components/RegisterForm";
import { LogRegBtnGroup } from "../login/components/LogRegBtnGroup";

function LoginBox(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const register = () => {
    setLoginError("")
    if(username === ""){
      setLoginError("Please enter username")
      return
    }
    if(password === ""){
      setLoginError("Please enter password")
      return
    }
    if(confirmPassword === ""){
      setLoginError("Please confirm password")
      return
    }
    if(password !== confirmPassword){
      setLoginError("Password does not match")
      return
    }

    Axios.post("http://localhost:3000/register", {
      username: username.toUpperCase(),
      password: password
    },
    { withCredentials: true })
    .then(function (response) {
      console.log(response);
      if(response.data === 'successful'){
        document.location.href = "http://localhost:3001/";
      }
      else{
        setLoginError(response.data)
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    });
  }

  const login = () => {
    document.location.href = "http://localhost:3001/";
  }

  return(
    
    <div className="loginForm">
      <RegisterForm loginError={loginError} setUsername={setUsername} setPassword={setPassword} setConfirmPassword={setConfirmPassword}></RegisterForm>
      <LogRegBtnGroup register={register} login={login}></LogRegBtnGroup>
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