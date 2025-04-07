const http = require("http") ;
const app = require("./app") ;
const connectToDB = require("./database/database") ;
const dotenv = require("dotenv") ;
const { error } = require("console");
dotenv.config() ;

const PORT = process.env.PORT || 5000 ;

const server = http.createServer(app) ;

connectToDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    })
})
.catch((error)=>{
    console.error('❌ Failed to connect to DB:', error);
})