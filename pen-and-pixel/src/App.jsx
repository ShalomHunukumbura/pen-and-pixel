import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import UserAuthForm from "./components/UserAuthForm";
import {ToastContainer} from 'react-toastify'
const App = () => {
    return (
       <>   
       
            <Navbar />
            <div> {/* Push content below the navbar */}
                <Routes>
                    
                    <Route path="/signin" element={<UserAuthForm type="signin" />} />
                    <Route path="/signup" element={<UserAuthForm type="signup" />} />
                </Routes>
            </div>
        </>
    );
};


export default App;