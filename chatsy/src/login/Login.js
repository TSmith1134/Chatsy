import React, {useState} from "react";
import Axios from 'axios';
import { LoginForm } from "./components/LoginForm";
import { LogRegBtnGroup } from "./components/LogRegBtnGroup";

function LoginBox(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const register = () => {
    document.location.href = 'http://localhost:3001/register'
  }

  const login = () => {
    setLoginError("")
    if(username === ""){
      setLoginError("Please enter username")
      return
    }
    if(password === ""){
      setLoginError("Please enter password")
      return
    }

    Axios.post("http://localhost:3000/login", {
      username: username,
      password: password,
    },
    { withCredentials: true })
    .then(function (response) {
      console.log(response);
      if(response.data === 'successful'){
        document.location.href = "http://localhost:3001/home";
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

  return(
    
    <div className="loginForm">
      <LoginForm loginError={loginError} setUsername={setUsername} setPassword={setPassword}></LoginForm>
      <LogRegBtnGroup register={register} login={login}></LogRegBtnGroup>
    </div>
    
      
  )
}

export default function Login(){
  return(
    <div className="loginFormContainer">
      <LoginBox></LoginBox>
    </div>
    
  )
}