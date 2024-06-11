const Admin = require('../Models/AdminInfo');

const adminAuthMiddleware = async (req, res, next) => {
    let { uname, pass } = req.body;
    try {
        const admin = await Admin.findOne({ uname });
        if (!admin || admin.password !== pass) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.admin = admin; // Attach admin object to request
        // Assuming admin.role holds the role information
        res.status(200).json({ success: true, role: admin.role }); // Send role information along with the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = adminAuthMiddleware;
