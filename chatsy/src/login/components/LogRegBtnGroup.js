export function LogRegBtnGroup({login}){
    return (<div id="LogRegBtnGroup">
      <button onClick={login} name="login" id="btnLogin">Login</button>
      <button id="btnSignUp">Sign Up</button>
    </div>)
}