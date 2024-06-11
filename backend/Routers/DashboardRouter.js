const express = require("express");
const router =  express.Router();
const DashboardController = require("../Controller/DashboardController");

router.post("/productsave",DashboardController.UploadProduct);
router.get("/trandingdata",DashboardController.TrandingProduct);
router.post("/delete",DashboardController.DeleteProduct)
router.get("/featuredproduct",DashboardController.FeaturdProduct)
router.get("/topselling",DashboardController.Topselling)
router.post("/uploadblogs",DashboardController.UploadBlogs)
router.get("/blogdisplay",DashboardController.BlogDisplay)
router.get("/edit/:id",DashboardController.getProductId)
router.post("/updateproduct/:id",DashboardController.UpdateProduct)
router.post("/blogdelete",DashboardController.BlogDelete)
router.get("/editblog/:id",DashboardController.Editblog)
router.post('/updateblog/:id', DashboardController.updateBlog);
module.exports = router;