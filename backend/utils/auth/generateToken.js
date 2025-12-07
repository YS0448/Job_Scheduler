const jwt = require('jsonwebtoken');

const generateAuthToken  = (user) => {
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

const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' });
};

module.exports = {generateAuthToken , generateResetToken};
