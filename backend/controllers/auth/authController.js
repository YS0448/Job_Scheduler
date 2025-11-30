const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { executeQuery } = require("../../utils/db/dbUtils");
const { getUTCDateTime } = require("../../utils/date/dateUtils");
const generateToken = require("../../utils/auth/generateToken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');


// Get current user details
const getCurrentUser = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;

    const user = await executeQuery(
      'SELECT user_id, email, full_name, role, status, last_login FROM users WHERE user_id = ?',
      [user_id]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user[0]);
  } catch (error) {
    console.error('Error in /me:', error);
    next(error)
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUserQuery =
      "SELECT user_id, email, full_name, password, role, status FROM users WHERE email = ?";
    const user = await executeQuery(findUserQuery, [email]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if(user[0].status === 'deactivated') {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const currentDateTime = getUTCDateTime();
    const is_active = 1;
    const updateLoginTimeQuery =
      "UPDATE users SET last_login = ?, is_active = ? WHERE user_id = ?";
    await executeQuery(updateLoginTimeQuery, [
      currentDateTime,
      is_active,
      user[0].user_id,
    ]);

    const token = generateToken(user[0]);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: user[0].user_id,
        full_name: user[0].full_name,
        email: user[0].email,
        role: user[0].role,
        status: user[0].status
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(error)
  }
};

const logout = (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const is_active = 0;
    const logoutQuery =
      "UPDATE users SET is_active = ? WHERE user_id = ?";
    executeQuery(logoutQuery, [is_active, user_id]);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    next(error)
  }
};

const sendEmail = async (to, subject, text) => {
  try {
   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', 
      port: 465,                  
      secure: true,               
      auth: {
        user: process.env.EMAIL_ID, 
        pass: process.env.EMAIL_PASSWORD,
      },
    });


    await transporter.sendMail({
      from: "doc.bucket12@gmail.com",
      to,
      subject,
      text,
    });

  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const checkOtpQuery = "SELECT * FROM manage_otp WHERE created_by = ?";
    const checkOtp = await executeQuery(checkOtpQuery, [email]);

    if (!checkOtp.length || checkOtp[0].otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Delete OTP after successful verification
    const deleteOtpQuery = "DELETE FROM manage_otp WHERE created_by = ? AND otp = ?";
    await executeQuery(deleteOtpQuery, [email, otp]);

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    next(error)
  }
};

const createUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const existingUser = await executeQuery(checkUserQuery, [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
      INSERT INTO users (full_name, email, password, role, status)  
      VALUES (?, ?, ?, ?, ?)`;
    const result = await executeQuery(insertUserQuery, [
      fullName,
      email,
      hashedPassword,
      "customer",
      "active",
    ]);

    res.status(201).json({
      message: "User created successfully",
      user_id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
};

const passwordReset = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
    await executeQuery(updateQuery, [hashedPassword, email]);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    next(error);
  }
};


const generateOtp = () => {
    const min = 100000;
    const max = 1000000; 
    const otp = crypto.randomInt(min, max);
    return otp;
};

const sendOtp= async(req,res, next)=>{
  try{
    const {email} = req.body;
    const otp = generateOtp()
    const subject= "Your OTP";
    const text= `Your OTP ${otp}`
    // Send mail
    await sendEmail(email, subject, text);
    const query= `INSERT INTO manage_otp (created_by, otp, created_at, updated_at) values (?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())`
    const value= [email, otp]
    const result = await executeQuery(query, value)

    res.status(200).json({message:"OTP send Successfully"});
  }catch(error){
    console.error("Error sending OTP:", error);
    next(error)
  }
}

module.exports = {
  verifyOtp,
  login,
  getCurrentUser,
  sendOtp,
  createUser,
  passwordReset,
  logout
};
