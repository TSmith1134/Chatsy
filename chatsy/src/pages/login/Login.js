import React, {useState, useRef, useEffect} from "react";
import axios from '../../api/axios';
import { LoginForm } from "./components/LoginForm";
import { LogRegBtnGroup } from "./components/LogRegBtnGroup";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/styles/Login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const {setAuth} = useAuth()
  const userRef = useRef()
  const errRef = useRef()
  const navigate  = useNavigate()
  const location =  useLocation()
  const from = location.state?.from?.pathname

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setLoginError('')
  }, [username, password])

  const register = () => {
    document.location.href = 'http://localhost:3001/register'
  }

  const handelLogin = async (e) => {
    try {
      const response = await axios.post('/auth',
        JSON.stringify({username : username.toUpperCase() , password}),
        {
          headers: {"Content-Type" : "application/json"},
          withCredentials: true
        }
      )
      
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({username, roles, accessToken})

      setPassword('')
      setUsername('')

      if(response.status === 200){
        navigate(from, {replace : true})
      }
      else{
        setLoginError(JSON.stringify(response?.data))
      }
    } catch(err){
      if(!err?.response) setLoginError('No server response')
      else if(err.response.status === 400) setLoginError('Missing username or password')
      else if(err.response.status === 401) setLoginError('Username or password is incorrect')
      else setLoginError('Login failed')
      errRef.current.focus()
    }
  }
  
  return(
    <div className="login">
      <section className="loginFormContainer">
        <div className="loginForm">
          <LoginForm username={username} password={password} userRef={userRef} errRef={errRef} loginError={loginError} setUsername={setUsername} setPassword={setPassword}></LoginForm>
          <LogRegBtnGroup register={register} handelLogin={handelLogin}></LogRegBtnGroup>
        </div>
      </section> 
    </div>
    
  )
}

export default Login