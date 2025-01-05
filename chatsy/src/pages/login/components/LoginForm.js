export function LoginForm({username, password, userRef, errRef, loginError, setUsername, setPassword, setConfirmPassword}){
    return(
    <form>
      <h2>Login</h2>
      <p ref={errRef} aria-live="assertive" id="loginError" htmlFor="inputUsername">{loginError}</p>
      <label htmlFor="inputUsername">username:</label>
      <input value={username} required ref={userRef} type="text" name="inputUsername" id="inputUsername" placeholder="Username:" onChange={(e) => { setUsername(e.target.value);} }></input>
      <label htmlFor="inputPassword">Password:</label>
      <input value={password} required name="inputPassword" id="inputPassword" type="PASSWORD" placeholder="Password:" onChange={e => { setPassword(e.target.value); } }></input>
      <a id="linkForgotPassword" href="...">Forgot Password</a>
    </form>
    )
}