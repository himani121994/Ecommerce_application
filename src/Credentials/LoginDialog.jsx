// import React, { useState } from 'react';
// import "../Credentials/LoginDialog.css";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";


// function LoginDialog({ onClose,onOpenSignUp }) {
//     const DeshNav = useNavigate();
//  const [uname,setName] = useState("");
//  const [pass,setPass] = useState("");

//     const handleLogin = (e) => {
//         e.preventDefault()
//         const url = uname && pass ? 'http://localhost:8000/api/admin/login' : 'http://localhost:8000/api/user/login';
//         const userType = uname && pass ? 'user' : 'admin';
//         axios.post(url, { uname, pass })
//     .then((res) => {
//         console.log("Response Data:", res.data); // Log response data for debugging
//         if (res.data.success) {
//             DeshNav("/admin/dashboard");
//             onClose();
//         } else {
//             console.log("Login failed. Response:", res.data); // Log response for debugging
//             alert("Login failed. Please check your credentials.");
//         }
//     })
//     // .catch((error) => {
//     //     console.error("Axios Error:", error); // Log Axios error for debugging
//     //     alert("An error occurred while logging in. Please try again later.");
//     // });

//         onClose(); 
//     };

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <span className="close" onClick={onClose}>&times;</span>
//                 <h2>Login</h2>
//                 <form onSubmit={handleLogin}>
//                     <label>
//                         Username or Email Addreass <br/>
//                         <input className="form-input-login" type="text" name='uname' onChange={(e)=>{setName(e.target.value)}} />
//                     </label>
//                     <br/>
//                     <label>
//                         Password:<br/>
//                         <input className="form-input-login" type="password" name='pass' onChange={(e)=>{setPass(e.target.value)}}/>
//                     </label>
//                     <br/>
//                     <input  type='checkbox' className='checkbox'/>Remember me
//                     <br/>
//                     <button type="submit">Login</button>
//                     <a href='#' className='LostPassword'>Lost Your Password</a>
//                     <hr color='gray' size="1"/>
//                      <span>Don't have an account yet<a onClick={onOpenSignUp}>Sing Up</a></span>
//                     {/* <button onClick={(e) => handleLogin(e, 'admin')}>Admin Login</button>
//                     <button onClick={(e) => handleLogin(e, 'user')}>User Login</button> */}
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default LoginDialog;


import React, { useState } from 'react';
import "../Credentials/LoginDialog.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import { setCart, setWishlist } from '../Component/ProductSlice';

function LoginDialog({ onClose, onOpenSignUp }) {
    const navigate = useNavigate(); // Using useNavigate 

    const [uname, setName] = useState("");
    const [pass, setPass] = useState("");
    const [userType, setUserType] = useState("user");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/${userType}/login`, { uname, pass });
            const { success, token, role, email } = response.data;

            if (success) {
                if (role === 'admin') {
                    navigate("/admin"); // Redirect to admin dashboard
                    onClose();
                } else {
                    localStorage.setItem('jwtToken', token);
                    localStorage.setItem('email', email);
                    navigate("/home");
                    // localStorage.setItem('cart', JSON.stringify(cartData));
                    // localStorage.setItem('wishlist', JSON.stringify(wishlistData));
                    // dispatch(setCart(cartData));
                    // dispatch(setWishlist(wishlistData));
                    // window.location.reload(); // Redirect to user home page
                    onClose();
                    window.location.reload(); 
                }

            } else {
                console.log("Login failed. Response:", response.data); // Log response for debugging
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Axios Error:", error); // Log Axios error for debugging
            alert("An error occurred while logging in. Please try again later.");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Username or Email Address <br />
                        <input className="form-input-login" type="text" name='uname' onChange={(e) => { setName(e.target.value) }} />
                    </label>
                    <br />
                    <label>
                        Password:<br />
                        <input className="form-input-login" type="password" name='pass' onChange={(e) => { setPass(e.target.value) }} />
                    </label>
                    <br />

                    <br />
                    <input type='checkbox' className='checkbox' />Remember me
                    <br />
                    <div className="dropdown">
                        <button className="dropbtn">Login as {userType}</button>
                        <div className="dropdown-content">
                            <a onClick={() => setUserType("user")}>User</a>
                            <a onClick={() => setUserType("admin")}>Admin</a>
                        </div>
                    </div>
                    <a href='#' className='LostPassword'>Lost Your Password</a>
                    <hr color='gray' size="1" />
                    <span>Don't have an account yet<a onClick={onOpenSignUp}>Sign Up</a></span>
                </form>
            </div>
        </div>
    );
}

export default LoginDialog;



