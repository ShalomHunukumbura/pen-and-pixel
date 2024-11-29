import React from "react";
import { Link } from "react-router-dom";
import AnimationWrapper from "./AnimationWrapper";

const UserAuthForm = ({type}) => {
    const isSignIn = type === "signin"
    return(
        <AnimationWrapper>
            <div className="flex justify-center items-center min-h-screen">
                {/*card container */}
                <div className="bg-white items-center shadow-md rounded-lg p-6 w-96">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {isSignIn ? "Welcome Back" : "Register"}
                    </h2>
                    <form className="space-y-4">
                        {/*Email Input */}
                        <label 
                        htmlFor="email"
                        className="flex  text-md font-medium text-gray-700">Email</label>
                        <input 
                        type="email"
                        id="email"
                        placeholder="Enter your Email"
                        className=" flex w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />

                        {/*password input */}
                        <label htmlFor="password"
                        className="flex  text-md font-medium text-gray-700">Password</label>
                        <input
                        type="password"
                        id="password"
                        placeholder="Enter your Password"
                        className="flex w-full mt-1 p-2 rounded-md focus:ring-2 focu:ring-blue-500 focus:outline-none"/>

                        {/* confirm password for signup */}
                        {!isSignIn && (
                            <div>
                                <label htmlFor="confirmPassword"
                                className="flex text-md text-grey-700">Confirm Password</label>
                                <input type="password"
                                id="confirmPassword"
                                placeholder="Confirm your Password"
                                className="flex w-full mt-1 p-2 rounded-md focus:ring-2 focu:ring-blue-500 focus:outline-none"/>
                            </div>
                        )}

                        {/*Sign in / sign ip button */}
                        <button
                        type="submit"
                        className="w-full  text-white py-2 px-4 rounded-md bg-black hover:bg-opacity-80 transition">
                            
                            {isSignIn ? "Login" : " Register"}

                        </button>
                    </form>
                </div>
            </div>
        </AnimationWrapper>
    )
}

export default UserAuthForm;