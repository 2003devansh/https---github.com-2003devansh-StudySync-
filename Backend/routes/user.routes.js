const express = require('express');
const router = express.Router() ;


const {getProfile,updateProfile} = require('../controllers/user.controller');
const {verifyToken} = require('../middleware/authMiddleware') ;

router.get('/me',verifyToken,getProfile) ;
router.put('/me',verifyToken,updateProfile) ;

module.exports = router ;