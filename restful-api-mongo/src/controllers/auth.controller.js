import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'; 
import * as jwtconfig from '../utils/jwt-config.js'; 

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id },
      jwtconfig.secret,
      { expiresIn: jwtconfig.expiresIn || '4h' }
    );

    res.setHeader('auth-token', token); 
    res.header('Access-Control-Expose-Headers', 'auth-token');
    res.status(200).json({ success: true, message: 'Login Successful'}); 

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};