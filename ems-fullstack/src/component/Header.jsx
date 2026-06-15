import React from 'react'
import '../style/header.css'
import { useNavigate } from "react-router-dom";




function Header() {
    const navigate = useNavigate();
    const showLogout =
        location.pathname !== "/login" &&
        location.pathname !== "/register";

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };
    return (
        <>
            <nav className='navbar bg-body-primary col'>
                <div className="container">
                    <a className="navbar-brand navi" target='_blank' href=''>Employee Management System</a>
                </div>
                {showLogout && (
                    <button
                        className="btn btn-outline-light me-4 p-1"
                        onClick={logout}
                    >
                        Logout
                    </button>
                )}
            </nav>
        </>
    )
}

export default Header