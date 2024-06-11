const User = require('../Models/UserInfo');
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
    const { uname, pass } = req.body;
    try {
        const user = await User.findOne({ username: uname });
        if (!user) {
            return res.status(401).json({ message: "User doesn't exist" });
        }

        const passwordMatch = await bcrypt.compare(pass, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Password doesn't match" });
        }

        res.status(200).json({ success: true, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const UserRegister = (req,res)=>{
    const user = req.user;
    // Redirect to user dashboard
    return res.redirect('/user/dashboard');
}
module.exports = {
    userLogin,UserRegister
}