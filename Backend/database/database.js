const mongoose = require('mongoose') ;
const dotenv = require("dotenv") ;
dotenv.config() ;


const connectToDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI) ;
        console.log('✅ MongoDB connected');
        
    } catch (error) {
        console.log("❌ MongoDB connection error:",error.message) ;
        throw error ; 
        
    }
}

module.exports = connectToDB; 