const jwt = require('jsonwebtoken');

// Authenticate & authorize
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    // Assign status 403 if token invalid
    if (error.name === 'JsonWebTokenError') {
      error.status = 403;
      error.message = 'Invalid token';
    }
    next(error); 
  }
};


// Middleware to check roles
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
