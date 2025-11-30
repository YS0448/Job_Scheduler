const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    user_id: user.user_id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    status: user.status
  };
  
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d' 
  });

  return token;
};

module.exports = generateToken;
