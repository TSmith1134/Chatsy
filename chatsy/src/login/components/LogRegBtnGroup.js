export function LogRegBtnGroup({login, register}){
    return (<div id="LogRegBtnGroup">
      <button onClick={login} name="login" id="btnLogin">Login</button>
      <button onClick={register} id="btnSignUp">Sign Up</button>
    </div>)
}