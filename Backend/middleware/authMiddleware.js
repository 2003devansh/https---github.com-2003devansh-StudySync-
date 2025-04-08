const jwt = require('jsonwebtoken');
const User = require('../models/user.model') ;

exports.verifyToken = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
  
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded._id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }
  
      req.user = user; // attach user to request
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };