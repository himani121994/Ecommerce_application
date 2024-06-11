import axios from "axios";
import { useEffect, useState } from "react";
import { addtoCart, clearMessage, addToWishlist } from './ProductSlice';
import { CiHeart } from "react-icons/ci";
import { PiHeartStraightDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Shop =({ tag })=>{
    const [product, setProduct] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onload = ()=>{
        let url = "http://localhost:8000/products/shopproduct";
        axios.get(url).then((res)=>{
               setProduct(res.data)
        })
    }
    useEffect(()=>{
        onload();
    },[tag])

    const handleAddToCart = (product) => {
        console.log("Adding product to cart:", product);
        dispatch(addtoCart(product));
        setTimeout(() => {
            dispatch(clearMessage());
        }, 2000);
    };
    const handleLike = (productId) => {
        setProduct(prevData => {
            return prevData.map(item => {
                if (item._id === productId) {
                    return { ...item, liked: !item.liked };
                }
                return item;
            });
        });
        const likedProduct = product.find(product => product._id === productId);
        if (likedProduct) {
            dispatch(addToWishlist(likedProduct));
        }
    };

    const handleViewProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    return(
        <>
           <div className="Tranding-mainhome-div">
             {/* <h1>{tag.charAt(0).toUpperCase() + tag.slice(1)} Products</h1>  */}
             {/* {message && <p className="message">{message}</p>}  */}
            <div className="product-list-home">
                {product.map((product) => (
                    <div key={product._id} className="product-card-home">
                        <div className={`like-icon ${product.liked ? 'liked' : ''}`} onClick={() => handleLike(product._id)}>
                            {product.liked ? <PiHeartStraightDuotone /> : <CiHeart />}
                        </div>
                        <img src={product.defaultImage} alt={product.name} className="product-image-home" onClick={() => handleViewProduct(product._id)} />
                        <h2>{product.name}</h2>
                        <p>Brand: {product.brand}</p>
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
        </div>
        </>
    )
}
export default Shop;