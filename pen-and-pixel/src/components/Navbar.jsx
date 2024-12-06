import React, { useContext, useState,useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../imgs/logo.png';
import { AuthContext } from "./AuthContext";


const Navbar = () => {
    const {isLoggedIn, logout} = useContext(AuthContext)
    const navigate = useNavigate();
    const [showDropDown, setShowDropDown] = useState(false);
    const dropdownRef = useRef(null)

    //hide dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropDown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        
    },[])

   
  

    // Handle signout
    const handleSignOut = () => {
        localStorage.removeItem("token");
        logout()
        navigate("/signin");
    };
    //handle signin
    const handleSignin = (token) => {
        localStorage.setItem("token",token)
        setIsLoggedIn(true)
        navigate("/")
    }
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
            {/* Logo and App Title */}
            <div className="flex items-center">
                <Link to="/" className="flex-none w-10">
                    <img src={logo} alt="Logo" className="w-full" />
                </Link>
                <p className="ml-4 text-xl font-bold">PenNPixel</p>
            </div>
            {/* Navigation Links */}
            <div className="flex space-x-4">
                {isLoggedIn ? (
                    <>
                        <button
                            onClick={() => navigate("/write")}
                            className="bg-black text-white rounded-full p-3.5 px-5 text-sm hover:bg-opacity-80"
                        >
                            Write
                        </button>

                        {/*dashboard dropdown*/}
                        <div
                            className="relative"
                            ref={dropdownRef}
                            >
                            <button className="bg-black text-white rounded-full p-3.5 px-5 text-sm hover:bg-opacity-80"
                            onClick={() => setShowDropDown((prev) => !prev)}>
                                Dashboard
                            </button>
                            {showDropDown && (
                                <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 z-10">
                                    <ul className="text-gray-700">
                                        <li
                                            onClick={() => {
                                                setShowDropDown(false);
                                                navigate("/profile");
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Profile
                                        </li>
                                        <li
                                            onClick={() => {
                                                setShowDropDown(false);
                                                logout();
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Sign Out
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link
                            to="/signin"
                            className="bg-black text-white rounded-full p-3.5 px-5 text-sm hover:bg-opacity-80"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-black text-white rounded-full p-3.5 px-5 text-sm hover:bg-opacity-80"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
