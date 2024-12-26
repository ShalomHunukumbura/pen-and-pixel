import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import UserAuthForm from "./components/UserAuthForm";
 import AuthProvider from "./components/AuthContext";
import Editor from "./components/Editor";
import Home from "./components/Home";
import BlogDetail from "./components/BlogDetail";



const App = () => {
    return (
       
        <AuthProvider>
                <div>
                {/* Navbar should always appear at the top */}
                <Navbar />

                
                <div style={{ marginTop: "20px" }}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home/>}
                        />
                        <Route
                            path="/signin"
                            element={<UserAuthForm type="signin" />}
                        />
                        <Route
                            path="/signup"
                            element={<UserAuthForm type="signup" />}
                        />
                        <Route
                            path="/write"
                            element={<Editor/>}
                        />
                        <Route
                            path="/blog/:id"
                            element={<BlogDetail/>}
                        />
                    </Routes>
                </div>
            </div>    
        </AuthProvider>
      
    );
};

export default App;



  