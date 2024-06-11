import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../assets/css/wishlist.css';
import { addtoCart, clearMessage } from './ProductSlice';

const Wishlist = () => {
    const wishlist = useSelector(state => state.cartProduct.wishlist);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        console.log("Adding product to cart:", product);
        dispatch(addtoCart(product));
        setTimeout(() => {
            dispatch(clearMessage());
        }, 1000);
    };

    return (
        <div className="wishlist-container">
            <h1>Wishlist</h1>
            {wishlist.length === 0 ? (
                <p className="empty-message">Your wishlist is empty</p>
            ) : (
                <ul className="wishlist-list">
                    {wishlist.map((item) => (
                        <li key={item._id} className="wishlist-item">
                            <img src={item.defaultImage} alt={item.name} className="wishlist-item-image" />
                            <div className="wishlist-item-details">
                                <p className="wishlist-item-name">{item.name}</p>
                                <p className="wishlist-item-price">Price: ${item.price}</p>
                                <p>{item.description}</p>
                                <button onClick={() => handleAddToCart({
                                    id: item._id,
                                    name: item.name,
                                    brand: item.brand,
                                    desc: item.description,
                                    price: item.price,
                                    image: item.defaultImage,
                                    qnty: 1
                                })}>
                                    Add to Cart
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Wishlist;
