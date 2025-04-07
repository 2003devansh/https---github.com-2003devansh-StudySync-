const express = require("express") ;
const cors = require("cors") ;
const morgan = require("morgan") ;

const app =  express() ;
app.use(cors()) ;
app.use(morgan("dev")) ;
app.use(express.json());
app.use(express.urlencoded({extended: true})) ;

app.use('/', (req,res)=>{
    res.send("welcome to the backend")
})

module.exports = app ; 