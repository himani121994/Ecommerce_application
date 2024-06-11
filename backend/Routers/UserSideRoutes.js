const express = require("express");
const router =  express.Router();
const UserSideController = require("../Controller/userSide.Controllter");

router.get("/trandingdata",UserSideController.getProductsByTag)
router.get("/productsview/:id",UserSideController.Productview)
router.get("/shopproduct",UserSideController.ShopProduct)
router.get("/productpage",UserSideController.Productpage)
router.get("/blogs",UserSideController.DisplayBlog)
router.get("/blogs/:id",UserSideController.DisplayBlogbyId)
router.get("/search",UserSideController.SearchResult)
module.exports = router;