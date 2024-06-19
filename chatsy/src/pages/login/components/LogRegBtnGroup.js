export function LogRegBtnGroup({handelLogin, register}){
    return (<div id="LogRegBtnGroup">
      <button onClick={handelLogin} name="login" id="btnLogin">Login</button>
      <button onClick={register} id="btnSignUp">Sign Up</button>
    </div>)
}