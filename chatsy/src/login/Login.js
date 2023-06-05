import React, {useState} from "react";
import Axios from 'axios';
import { LoginForm } from "./components/LoginForm";
import { LogRegBtnGroup } from "./components/LogRegBtnGroup";

function LoginBox(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [usernameError, setUsernameError] = useState("")

  const login = () => {
    if(username === ""){
      setUsernameError("Please enter username")
    }

    Axios.post("http://localhost:3000/login", {
      username: username,
      password: password,
      confirmPassword: confirmPassword
    })
    .then(function (response) {
      console.log(response);
      if(response.data === 'successful'){
        document.location.href = "http://localhost:3001/home";
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
      <LoginForm usernameError={usernameError} setUsername={setUsername} setPassword={setPassword} setConfirmPassword={setConfirmPassword}></LoginForm>
      <LogRegBtnGroup login={login}></LogRegBtnGroup>
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