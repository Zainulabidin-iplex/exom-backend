const express = require("express");
require("./db/config");
const User = require("./db/users");
const cors = require("cors")
//
const app = express();
app.use(express.json());
app.use(cors());

//singUp API
app.post("/register", async (req,res)=>{
    try {
        const {name,email,password} = req.body    
        if(name && email && password){
        const d = await User.findOne({email:email})
        if(d){
        res.status(404).json({message:"Email is already exist."})
        }
        const user=new User({name,email,password})
        await user.save()
        res.status(200).json({message:"SignUp Successd.", email:req.email})
        }     
    } 
    catch (error) {
        res.status(500).json({message:"Error While signUp."})    
    }  
})


app.listen(8000);