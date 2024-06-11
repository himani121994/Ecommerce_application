const User = require('../Models/UserInfo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login = async (req, res, next) => {
    const { uname, pass } = req.body;
    try {
        const user = await User.findOne({ username: uname });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(pass, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.KEY_SECRET_jwt, { expiresIn: '1h' });

        res.status(200).json({ success: true, token, role: user.role,email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const Registration = async (req, res, next) => {
    const { firstname, lastname, uname, mobile, pass, email } = req.body;
    try {
        const saltRounds = 10; // 10 rounds is the default
        const salt = await bcrypt.genSalt(saltRounds);
        const password = pass;
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ firstname, lastname, username: uname, mobile, email, password: hashedPassword });
        // If user creation is successful, send a success response
        res.status(201).json({ success: true, message: 'User created successfully', user });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating user' });
    }
};


module.exports = {Login,Registration};


