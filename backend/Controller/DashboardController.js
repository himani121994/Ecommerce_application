const ProductModel = require("../Models/Product");
const BlogModel =  require("../Models/Blogs");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product_images', // folder name Cloudinary account
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});

const upload = multer({ storage: storage }).array('images', 10); //image size
const UploadProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send("Error uploading files: " + err.message);
        }

        try {
            const { Pname, Pbrand, Pprice, Pdescription, Pcategory, Ptags } = req.body;
            const imageUrls = req.files.map(file => file.path);

            const newProduct = new ProductModel({
                name: Pname,
                brand: Pbrand,
                price: Pprice,
                description: Pdescription,
                category: Pcategory,
                tags: Ptags,
                images: imageUrls,
                defaultImage: imageUrls[0] 
            });

            await newProduct.save();
            res.status(200).send("Data saved successfully!");
        } catch (error) {
            res.status(500).send("Error saving data: " + error.message);
        }
    });
}
//===============================================================
const getProductId = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
///======================================================================
const UpdateProduct = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send("Error uploading files: " + err.message);
      }
  
      try {
        const { name, brand, price, description, category, tags } = req.body;
        const imageUrls = req.files.map(file => file.path);
  
        const updateData = {
          name,
          brand,
          price,
          description,
          category,
          tags,
          images: imageUrls,
          defaultImage: imageUrls[0],
        };
  
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
        res.status(200).send("Product updated successfully!");
      } catch (error) {
        res.status(500).send("Error updating product: " + error.message);
      }
    });
  };
// ==============================Tranding Data====================
const TrandingProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({ tags:"trending" });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send("Error fetching products: " + error.message);
    }
}
const Topselling = async (req, res) => {
    try {
        const products = await ProductModel.find({ tags:"topselling" });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send("Error fetching products: " + error.message);
    }
}
const FeaturdProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({ tags:"featured" });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send("Error fetching products: " + error.message);
    }
}

const DeleteProduct =(req,res)=>{
    let id = req.body.id;
    console.log(id);
    ProductModel.findByIdAndDelete(id).then((data)=>{
      res.json("delete succesfully")
    })
}
// ============================Blog Image======================
const Blogstorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog_product_images', // folder name Cloudinary account
        format: async (req, file) => 'jpg',
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});
const blog_upload = multer({ storage: Blogstorage }).array('Blogimages', 10);

const UploadBlogs = (req,res)=>{
     blog_upload(req,res,async(err)=>{
        if (err) {
            return res.status(500).send("Error uploading files: " + err.message);
        }
        try{
            const { blogtitel,blogdiscription } = req.body;
            const imageUrls = req.files.map(file => file.path);
            const BlogUpload = new BlogModel({
                blogTitle:blogtitel,blogDescription:blogdiscription,images:imageUrls,defaultImage:imageUrls[0]
            })
            await BlogUpload.save();
            res.status(200).send("blog saved successfully!");
        }catch (error) {
            res.status(500).send("Error saving data: " + error.message);
        }
     })
}
const BlogDisplay = async(req,res)=>{
    try{
        const Blog = await BlogModel.find();
        res.status(200).json(Blog);
    }catch (error){
        res.status(500).send("Error fetching products: " + error.message);
    }
   
}
const BlogDelete = (req,res)=>{
    let id = req.body.id;
    const blog = BlogModel.findByIdAndDelete(id).then((data)=>{
        res.json("delete succesfully")
      })
}  
const Editblog = async (req, res) => {
        const id = req.params.id;
        const blog = await BlogModel.findById(id);
        res.status(200).json(blog);
  
};
const updateBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const { blogTitle, blogDescription } = req.body;

        const updatedBlog = await BlogModel.findByIdAndUpdate(
            id,
            { blogTitle, blogDescription },
            { new: true } // Return the updated document
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error: error.message });
    }
};
module.exports = {
    UploadProduct,TrandingProduct,DeleteProduct,
    FeaturdProduct,Topselling,UploadBlogs,getProductId,
    UpdateProduct,BlogDisplay,BlogDelete,Editblog,updateBlog
}