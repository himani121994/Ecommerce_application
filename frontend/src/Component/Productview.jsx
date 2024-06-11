import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/productview.css'; 
import { useDispatch } from 'react-redux';
import { CiHeart } from "react-icons/ci";
import { PiHeartStraightDuotone } from "react-icons/pi";
import { addtoCart, clearMessage, addToWishlist } from './ProductSlice';

const ProductView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/products/productsview/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const renderSlider = product.images.length > 1;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, 
    };

    const handleAddToCart = (product) => {
        console.log("Adding product to cart:", product);
        dispatch(addtoCart(product));
        setTimeout(() => {
            dispatch(clearMessage());
        }, 2000);
    };

    const handleLike = (productId) => {
        setData(prevData => {
            return prevData.map(item => {
                if (item._id === productId) {
                    return { ...item, liked: !item.liked };
                }
                return item;
            });
        });
        const likedProduct = data.find(product => product._id === productId);
        if (likedProduct) {
            dispatch(addToWishlist(likedProduct));
        }
    };

    return (
        <div className="product-view-container">
            {renderSlider ? (
                <div className="product-slider">
                    <Slider {...sliderSettings}>
                        {product.images.map((image, index) => (
                            <div key={index}>
                                <div className={`like-icon ${product.liked ? 'liked' : ''}`} onClick={() => handleLike(product._id)}>
                                    {product.liked ? <PiHeartStraightDuotone /> : <CiHeart />}
                                </div>
                                <img src={image} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <div className="product-image">
                    <img src={product.images[0]} alt="Product" />
                </div>
            )}
            <div className="product-info">
                <h1>{product.name}</h1>
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
        </div>
    );
};

export default ProductView;
