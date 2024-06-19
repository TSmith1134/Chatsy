export function RegisterForm({loginError, setUsername, setPassword, setConfirmPassword}){
    return(
    <form>
      <h2>Register</h2>
      <p id="loginError" htmlFor="inputUsername">{loginError}</p>
      <label htmlFor="inputUsername">username:</label>
      <input typeof="text" name="inputUsername" id="inputUsername" placeholder="Username:" onChange={(e) => { setUsername(e.target.value);} }></input>
      <label htmlFor="inputPassword">Password:</label>
      <input name="inputPassword" id="inputPassword" type="PASSWORD" placeholder="Password:" onChange={e => { setPassword(e.target.value); } }></input>
      <label htmlFor="inputConfirmPassword">Confirm Password:</label>
      <input name="inputConfirmPassword" id="inputConfirmPassword" type="PASSWORD" placeholder="Password:"></input>
      <a id="linkForgotPassword" href="...">Forgot Password</a>
    </form>
    )
}