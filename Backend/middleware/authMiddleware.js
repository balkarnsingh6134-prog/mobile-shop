import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // 1. Look for token in 'token' header FIRST, then Authorization header
  // 2. Added req.body and req.query as fallbacks for cross-port stability
  const token = 
    req.header('token') || 
    (authHeader && authHeader.split(' ')[1]) || 
    req.body.token || 
    req.query.token;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access Denied: No token provided!' 
    });
  }

  // HARDCODED SECRET: Ensure this matches userController
  jwt.verify(token, 'jwt_secret_123', (err, decodedUser) => {
    if (err) {
      // Logic for expired or manipulated tokens
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid or expired token. Please Logout and Login again.' 
      });
    }

    // Attach decoded user info (id, role, etc.) to the request object
    req.user = decodedUser; 
    next();
  });
};

export default authenticateToken;