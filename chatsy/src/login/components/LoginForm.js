export function LoginForm({usernameError, setUsername, setPassword, setConfirmPassword}){
    return(
    <form>
      <h2>Login</h2>
      <label htmlFor="inputUsername">username:</label>
      <input typeof="text" name="inputUsername" id="inputUsername" placeholder="Username:" onChange={(e) => { setUsername(e.target.value);} }></input>
      <abbr id="usernameError" htmlFor="inputUsername">{usernameError}</abbr>
      <label htmlFor="inputPassword">Password:</label>
      <input name="inputPassword" id="inputPassword" type="PASSWORD" placeholder="Password:" onChange={e => { setPassword(e.target.value); } }></input>
      <label htmlFor="inputConfirmPassword">Confirm Password:</label>
      <input name="inputConfirmPassword" id="inputConfirmPassword" type="PASSWORD" placeholder="Password:" onChange={e => { setConfirmPassword(e.target.value); } }></input>
      <a id="linkForgotPassword" href="...">Forgot Password</a>
    </form>
    )
}