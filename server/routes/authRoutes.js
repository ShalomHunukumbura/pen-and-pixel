import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"




const router = express.Router()
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;//regex for email validation
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password validation

//user registration
router.post("/signup", async(req,res) => {
    const {username,email,password} = req.body

    if(username.length < 3){
        return res.status(403).json({error : "Username must have atleast 3 characters"})
    }
    if (!email.length){
        return res.status(403).json({error:"you must provide an email address"})
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({error:"invalid email address"})
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({error:"password must be at least 6 to 20 characters with a numeric, 1 lowercase, and 1 uppercase" });
    }
    try{
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //create the user
        const newUser = await User.create({username, email, password:hashedPassword})

        res.status(201).json({message: "User registered succefully", user:newUser})
    }catch(error){
        res.status(500).json({message: "Error registering user", error})
    }


})

//user signin
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // Generate a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("signin error",error);
        
      res.status(500).json({ message: "Error logging in", error });
    }
  });

export default router