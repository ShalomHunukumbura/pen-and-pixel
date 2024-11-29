import React from 'react' 
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png'

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
                    {/* Logo and App Title */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-none w-10">
                            <img src={logo} alt="Logo" className="w-full" />
                        </Link>
                        <p className="ml-4 text-xl font-bold">PenNPixel</p>
                    </div>
                    {/*sign in and sign up links*/}
                    <div className="flex space-x-4">
                        <Link
                            to='/signin'
                            className="bg-black text-white rounded-full p-3.5 px-5  text-sm  hover:bg-opacity-80">
                                Sign In
                            </Link>
                        <Link
                        to='/signup'
                        className=" bg-black text-white rounded-full p-3.5 px-5 text-sm  hover:bg-opacity-80">
                            Sign Up
                        </Link>

                    </div>
                </nav>
    );
};

export default Navbar;
