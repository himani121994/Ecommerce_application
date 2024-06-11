import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Blog = ({ limit }) => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/products/blogs");
                setBlogs(response.data);
            } catch (error) {
                console.error("There was an error fetching the blogs!", error);
            }
        };

        fetchBlogs();
    }, []);

    const handleBlogClick = (id) => {
        navigate(`/BlogInfo/${id}`);
        window.scrollTo(0, 0); // Ensure the page scrolls to the top
    };

    return (
        <div className="product-list-home" style={{ margin: "30px" }}>
            {blogs.slice(0, limit).map((product) => (
                <div key={product._id} className="product-card-home">
                    <img
                        src={product.defaultImage}
                        alt={product.blogTitle}
                        className="product-image-home"
                        onClick={() => handleBlogClick(product._id)}
                    />
                    <h2>{product.blogTitle}</h2>
                    <p style={{ fontSize: "12px" }}>Description: {product.blogDescription}</p>
                    <button onClick={() => handleBlogClick(product._id)}>
                        Read More
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Blog;
