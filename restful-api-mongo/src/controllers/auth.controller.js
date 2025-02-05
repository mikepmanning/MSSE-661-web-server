const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const jwtconfig = require('../jwt-config');


exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' }); // 400 Bad Request
        }

      const user = await User.findOne({ username: username });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username' }); 
      }
  
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      const token = jwt.sign(
        { userId: user._id },
        jwtconfig.secret, 
        { expiresIn: '4h' }
      );
  
      res.setHeader('auth-token', token);
      res.status(200);
      res.json({ success: true, message: 'Login Successful'});
      return res;
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
  };
