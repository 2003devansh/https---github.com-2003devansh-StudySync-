const User = require("../models/user.model") ;
const bcrypt = require("bcrypt") ;

exports.signup  = async (req,res)=>{
    try {
        const {firstname,lastname,email,password} = req.body ; 
        const existingUser =  await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"}); 
        }
        const newUser = new User({
            fullname: {firstname,lastname} ,
            email,password,
        }) ;
        await newUser.save() ;
        const token =  newUser.generateAuthToken() ;
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id ,
                fullname: newUser.fullname ,
                email: newUser.email, 

            }
        })
    } catch (error) {
        next(error) ;
    }
}


exports.login  = async (req,res)=>{
   try {
    const {email,password} = req.body ; 
    const user = await User.findOne({email}).select("+password") ;
    if(!user){
        return res.status(400).json({message: "Invalid credentials"}) ;
    }
    const isMatch =  await bcrypt.compare(user,password) ;
    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"}) ;
    }
    const token = user.generateAuthToken() ;
    res.status(200).json({
        message: "Login successful",
        token, 
        user:{
            _id: user._id,
            fullname: user.fullname,
            email: user.email ,

        }
    })
   } catch (error) {
      next(error) ;
   }
}