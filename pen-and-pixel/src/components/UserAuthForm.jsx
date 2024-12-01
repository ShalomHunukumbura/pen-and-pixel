import React,{useState} from "react";
 import { useNavigate } from "react-router-dom";
import AnimationWrapper from "./AnimationWrapper";
import { signup,signin } from "../../services/api";
import {Toaster, toast} from 'react-hot-toast' 
 

const UserAuthForm = ({type}) => {
    const isSignIn = type === "signin"

    //state for form fields
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const navigate = useNavigate()// to use the navigate hook

    //handle input changes
    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]: e.target.value})
    }

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form submitted", formData);

        try{
            if(!isSignIn){
                //validate confirm password for signup
                if(formData.password !== formData.confirmPassword){
                    console.log("Passwords do not match");
                    return toast.error("Passwords do not match")
                }
                const repsonse = await signup({
                    username:formData.username,
                    email:formData.email,
                    password:formData.password
                })
               
                
                toast.success("User created successfully")
            }else {
                const response = await signin({
                    email:formData.email,
                    password:formData.password
                })
                toast.success("User logged in successfully")
                //save token
                localStorage.setItem("token",response.token)
            }

            //reset form after successful operation
            setFormData({
                username:"",
                email:"",
                password:"",
                confirmPassword:""
            })

        }catch(error){
            console.error("Error during submit", error);
            toast.error(error.response?.data?.message || "An unexpected error occurred")
        }
    }

    return(
        <AnimationWrapper>
            <div className="flex justify-center items-center min-h-screen">
                <Toaster/>
                {/*card container */}
                <div className="bg-white items-center shadow-md rounded-lg p-6 w-96">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {isSignIn ? "Welcome Back" : "Register"}
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/*Username Input */}
                        {!isSignIn && (
                            <div>
                                
                        <label htmlFor="username"
                        className="flex  text-md font-medium text-gray-700">Username</label>
                        <input type="text"
                        id="username"
                        placeholder="Enter Username"
                        value={formData.username}
                        onChange={handleChange}
                        className=" flex w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                         />
                            </div>
                        )}

                        {/*Email Input */}
                        <div>
                        <label 
                        htmlFor="email"
                        className="flex  text-md font-medium text-gray-700">Email</label>
                        <input 
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                        className=" flex w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>

                        {/*password input */}
                        <div>
                        <label htmlFor="password"
                        className="flex  text-md font-medium text-gray-700">Password</label>
                        <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your Password"
                        className="flex w-full mt-1 p-2 rounded-md focus:ring-2 focu:ring-blue-500 focus:outline-none"/>

                        </div>
                        {/* confirm password for signup */}
                        {!isSignIn && (
                            <div>
                                <label htmlFor="confirmPassword"
                                className="flex text-md text-grey-700">Confirm Password</label>
                                <input type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
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