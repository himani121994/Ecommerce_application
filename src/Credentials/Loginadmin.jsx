
const LoginAdmin = ()=>{
    return(
        <div style={{marginLeft: "550px",marginTop: "100px",color:"black"}}>
           Hellow Admin <br /> Please Login to see
           <form >
                    <label>
                        Username or Email Address <br />
                        <input className="form-input-login" type="text" name='uname'  />
                    </label>
                    <br />
                    <label>
                        Password:<br />
                        <input className="form-input-login" type="password" name='pass' />
                    </label>
                    <br />

                    <br />
                    {/* <input type='checkbox' className='checkbox' />Remember me
                    <br /> */}
                    {/* <div className="dropdown">
                        <button className="dropbtn">Login as {userType}</button>
                        <div className="dropdown-content">
                            <a onClick={() => setUserType("user")}>User</a>
                            <a onClick={() => setUserType("admin")}>Admin</a>
                        </div>
                    </div> */}
                    <a href='#' className='LostPassword'>Lost Your Password</a>
                    {/* <hr color='gray' size="1" />
                    <span>Don't have an account yet<a onClick={onOpenSignUp}>Sign Up</a></span> */}
                    <button>Login</button>
                </form> 
        </div>
    )
}
export default LoginAdmin;