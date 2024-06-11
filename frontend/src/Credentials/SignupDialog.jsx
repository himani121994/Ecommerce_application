// SignupDialog.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
// import './SignupDialog.css'; // Import the CSS file

function SignupDialog({ onClose }) {
    const DeshNav = useNavigate();
    const [Input, setInput] = useState("")
    const [errorMessage, setErrorMessage] = useState('');

    
    const inputHanddle = (e) => {
       let name = e.target.name;
       let value = e.target.value;
       setInput((values) => ({...values, [name]: value}));
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (Input.pass !== Input.repaass) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        try {
            let url = "http://localhost:8000/api/user/signup";
            const res = await axios.post(url, Input);
            if (res.data.success) {
                alert("Registration successful");
                DeshNav("/login");
                onClose();
            } else {
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred while signing up. Please try again later.");
        }
    };
    
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="name-container">
                        <label className="name-label" htmlFor="firstname">Enter Name</label>
                        <div className="input-wrapper">
                            <input id="firstname" className="form-input" type="text" name="firstname" onChange={inputHanddle} required placeholder="First Name" style={{ marginRight:"10px"}} />
                            <input id="lastname" className="form-input" type="text" name="lastname" onChange={inputHanddle} placeholder="Last Name" />
                        </div>
                    </div>
                    <div>
                        <div style={{display:"flex"}}><label className="form-label" htmlFor="uname">Enter Username:</label>
                        <label className="form-label" htmlFor="mobile">Enter Number:</label></div>
                
                        <div className="input-wrapper">
                            <input id="uname" className="form-input" type="text" name="uname" onChange={inputHanddle} style={{ marginRight:"10px"}}/>
                            <input id="mobile" className="form-input" type="text" name="mobile" onChange={inputHanddle} required />
                        </div>
                    </div>
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input id="email" className="form-input" type="email" name="email" onChange={inputHanddle} required />
                    
                    <div>
                        <div style={{display:"flex"}}>
                        <label className="form-label" htmlFor="pass">Password:</label> 
                        <label className="form-label" htmlFor="repaass">Confirm Password:</label>
                        </div>
                        <div style={{ marginBottom:"30px"}}>
                        <input id="pass" className="form-input" type="password" name="pass" onChange={inputHanddle} required style={{ marginRight:"10px"}} />
                   
                   <input id="repaass" className="form-input" type="password" name="repaass" onChange={inputHanddle} required />
                   {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                    </div>
                    
                    
                    <button type="submit" className="submit-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignupDialog;
