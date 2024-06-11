import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import "../assets/css/searchresult.css";
import { addtoCart, clearMessage } from './ProductSlice';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const dispatch = useDispatch();
    const fetchProducts = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8000/products/search`, { params: { query } });
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
        if (query) {
            fetchProducts(query);
        }
    }, [location.search]);

    if (loading) {
        return <div>Loading...</div>;
    }
    const handleAddToCart = (product) => {
        console.log("Adding product to cart:", product);
        dispatch(addtoCart(product));
        setTimeout(() => {
            dispatch(clearMessage());
        }, 1000);
    };
    return (
        <div className="" style={{margin:"20px 30px"}}>
            <h1>Search Results</h1>
            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <div className="" style={{display:"flex"}}>
                    {products.map((product) => (
                        <div key={product._id} className="product-card-search">
                            <img src={product.defaultImage} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>Price: ${product.price}</p>
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
