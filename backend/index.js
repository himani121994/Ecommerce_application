const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userAuthRoutes = require('./Routers/userAuthRoutes');
const adminAuthRoutes = require('./Routers/adminAuthRoutes');
const dashboardRoutes =  require('./Routers/DashboardRouter')
const UserSide = require("./Routers/UserSideRoutes");
const PaymentRouter = require("./Routers/PaymentRouters");
mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// User routes
app.use('/api/user', userAuthRoutes);
// User Side Website 
app.use('/products', UserSide )
// Admin routes
app.use('/api/admin', adminAuthRoutes);
//Deashboard data
app.use('/dashboard',dashboardRoutes)
//Payment Data
app.use("/api/payment",PaymentRouter)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
