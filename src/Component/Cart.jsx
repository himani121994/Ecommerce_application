import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { increaseQuantity, decreaseQuantity, removeItem } from "./ProductSlice";
import '../assets/css/card.css';
import  {useNavigate} from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const mynav = useNavigate();
    const { cart } = useSelector(state => state.cartProduct);  
    // ================================================
    const totalPrice = cart.reduce((total, product) => total + product.price * product.qnty, 0);

    const qtyIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    const qtyDecrease = (id) => {    
        dispatch(decreaseQuantity(id));
    };

    const itemRemove = (id) => {
        dispatch(removeItem(id));
    };
    const paypage=()=>{
        const token = localStorage.getItem('jwtToken');
        if (token) {
            mynav("/paypage/");
        } else {
            alert("Please log in first.");
            mynav("/login"); 
        }
    }

    return (
        <div className='main-card-div'>
            <div className="cart-container">
                <h1>Shopping Cart</h1>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul className="cart-list">
                        {cart.map((product, index) => (
                            <li key={index} className="cart-item">
                                <img src={product.image} alt={product.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h2>{product.name}</h2>
                                    <p className='product-detail-cart'>Brand: {product.brand}</p>
                                    <p className='product-detail-cart'>Price: ${product.price}</p>
                                    <span>Discription:</span><p className='discription-cart'>{product.desc}</p>
                                    <div style={{display:"flex"}}>
                                    <p style={{marginTop:"0px",marginLeft:"100px",fontSize:"20px"}}>
                                    Qty = {product.qnty} 
                                </p>
                                <a style={{marginTop:"0px",marginLeft:"30px"}} href='#' onClick={() => qtyDecrease(product.id)}>
                                    <FaMinusCircle />
                                </a>      
                                <a style={{marginTop:"0px",marginLeft:"30px"}} href='#' onClick={() => qtyIncrease(product.id)}>
                                    <FaPlusCircle />
                                </a>
    
                                </div>
                                </div>
     
                                <button onClick={() => itemRemove(product.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='Proccedd-div'>
            <p style={{marginTop:"-27px"}}>Your total Amount will display here</p>
                <div>
                    <h2>Proceed to Pay</h2>
                    <p>Total Amount: ${totalPrice.toFixed(2)}</p>
                    <button onClick={paypage}>Pay</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
