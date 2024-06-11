import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/productpage.css"; 
import { useDispatch } from "react-redux";
import { addtoCart, clearMessage } from './ProductSlice';

const ProductPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("laptop");
    const [products, setProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();

    const categories = [
        { label: "Laptop", value: "laptop" },
        { label: "Computer", value: "computer" },
        { label: "Phones", value: "phones" },
        { label: "Headphone", value: "headphone" },
        { label: "Wireless Controller", value: "wirelesscontroller" },
        { label: "Security Camera", value: "securitycamera" },
        { label: "Power Cable", value: "powercable" },
        { label: "Watch", value: "watch" }
    ];

    const fetchProducts = async (category) => {
        try {
            const response = await axios.get(`http://localhost:8000/products/productpage?category=${category}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts(selectedCategory);
    }, [selectedCategory]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleAddToCart = (product) => {
        console.log("Adding product to cart:", product);
        dispatch(addtoCart(product));
        setTimeout(() => {
            dispatch(clearMessage());
        }, 1000);
    };

    return (
        <div className="product-page">
            <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                {categories.map((cat) => (
                    <h1 key={cat.value} onClick={() => setSelectedCategory(cat.value)}>
                        {cat.label}
                    </h1>
                ))}
            </aside>
            <div className="product-display">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card-productpage">
                            <img src={product.defaultImage} alt={product.name} className="product-image-productpage" />
                            <h2>{product.name}</h2>
                            <p>Brand: {product.brand}</p>
                            <p>Price: ${product.price}</p>
                            <p>{product.description}</p>
                            <button onClick={() => handleAddToCart({
                                    id: product._id,
                                    name: product.name,
                                    brand: product.brand,
                                    desc: product.description,
                                    price: product.price,
                                    image: product.defaultImage,
                                    qnty: 1
                                })}>
                                    Add to Cart
                                </button>
                        </div>
                    ))
                ) : (
                    <p>No products available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
