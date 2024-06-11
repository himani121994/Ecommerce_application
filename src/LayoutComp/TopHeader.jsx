import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../LayoutComp/topheader.css";
import Logo from "../assets/img/logo1.jpg";
import { FaRegUser } from "react-icons/fa";
import LoginDialog from "../Credentials/LoginDialog";
import SignupDialog from "../Credentials/SignupDialog";
import profilelogo from "../assets/img/profileimg.png";
import { IoMdLogOut } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

const TopHeader = () => {
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [showSignupDialog, setShowSignupDialog] = useState(false);
    const [userInfo, setUserInfo] = useState({ email: '' });
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setUserInfo({ email });
        }
    }, []);

    const toggleLoginDialog = () => {
        console.log('Login icon clicked');
        setShowLoginDialog(!showLoginDialog);
    };

    const toggleSignupDialog = () => {
        setShowSignupDialog(!showSignupDialog);
    };

    const handleLogout = () => {
        const cartData = JSON.stringify(localStorage.getItem('cart'));
        const wishlistData = JSON.stringify(localStorage.getItem('wishlist'));
        localStorage.clear();
        localStorage.setItem('cart', cartData);
        localStorage.setItem('wishlist', wishlistData);
        setUserInfo({ email: '' });
        navigate('/');
    };

    const profileimg = (id) => {
        navigate('/profileimg/' + id);
        console.log(id);
    };

    // Handle the search functionality
    const handleSearch = () => {
        navigate(`/search?query=${searchQuery}`);
    };

    // Handle search on Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <nav className="topnav">
            <div className="main-div-topheader">
                <div className="logo-div">
                    <a href="#"><img src={Logo} alt="logo" /></a>
                    <span>Best Electronic store</span>
                    <h2>Electro.</h2>
                </div>
                <div className="search-div">
                    <input
                        className="search-topnav-input"
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress} 
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div>
                    {userInfo.email ? (
                        <div className="user-info">
                            <div>
                                <img src={profilelogo} style={{ width: "50px", height: "50px", marginLeft: "105px" }} onClick={profileimg} alt="Profile" />
                                <div style={{marginTop:"-20px",marginLeft:"135px"}}><MdModeEdit/><br /></div>
                                <span style={{ marginLeft: "86px" }}>Welcome<br />({userInfo.email})</span>
                            </div>
                            <div className='logout'>
                                <button onClick={handleLogout} className='logout'><IoMdLogOut /></button>
                            </div>
                        </div>
                    ) : (
                        <FaRegUser className="user" onClick={toggleLoginDialog} />
                    )}
                </div>
            </div>
            {showLoginDialog && <LoginDialog onClose={toggleLoginDialog} onOpenSignUp={toggleSignupDialog} />}
            {showSignupDialog && <SignupDialog onClose={toggleSignupDialog} />}
        </nav>
    );
};

export default TopHeader;
