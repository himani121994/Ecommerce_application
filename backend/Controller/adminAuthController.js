const Admin = require('../Models/AdminInfo');

const adminLogin = async (req, res) => {
  try {
    let uname = req.body.uname;
    let pass = req.body.pass;
    console.log(uname,pass)
      const admin = await Admin.findOne({ uname });
      if (admin) {
          if (req.body.pass === admin.password) { 
              res.status(200).json({ success: true });
          } else {
              res.status(400).json({ error: "Password doesn't match" });
          }
      } else {
          res.status(400).json({ error: "Admin doesn't exist" });
      }
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { adminLogin };