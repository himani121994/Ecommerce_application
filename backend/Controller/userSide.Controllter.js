const ProductModel = require("../Models/Product");
const BlogModel = require("../Models/Blogs");

const getProductsByTag = async (req, res) => {
    const tag = req.query.tag;
    try {
        const products = await ProductModel.find({ tags: tag }).sort({_id:-1}).limit(4);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send("Error fetching products: " + error.message);
    }
};

const Productview = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId); 
        // console.log(product);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
}

const ShopProduct =(req,res)=>{
    ProductModel.find().then((data)=>{res.send(data)})
}

const Productpage = async(req,res)=>{
    const { category } = req.query;
    try {
        const products = await ProductModel.find({ category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}

const DisplayBlog = async(req,res)=>{
    try {
        const Blog = await BlogModel.find();
        res.status(200).json(Blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}
const DisplayBlogbyId =async(req,res)=>{
    const  blogId = req.params.id;
    try {
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).send("Error fetching blog: " + error.message);
    }
}

const SearchResult = async(req,res)=>{
    try {
        const { query } = req.query;
        const products = await ProductModel.find({$or: [
            { name: { $regex: query, $options: 'i' } },
            { brand: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ] }); // $regex to match similar names, $options: 'i' for case insensitive
        res.json(products);
    } catch (error) {
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getProductsByTag,Productview,ShopProduct,Productpage,DisplayBlog,DisplayBlogbyId,SearchResult
};
