import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    wishlist: [], 
    message: ''
};

const productSlice = createSlice({
    name: 'cartProduct',
    initialState,
    reducers: {
        
        addtoCart: (state, action) => {
            const existingProduct = state.cart.find(item => item.id === action.payload.id);
            if (existingProduct) {
                state.message = "Product already added!";
            } else {
                alert("Product added to the card.")
                state.cart.push({ ...action.payload, qnty: 1 });
                state.message = '';
            }
            console.log("Current Cart:", state.cart);
        },
        addToWishlist: (state, action) => {
            const existingProduct = state.wishlist.find(item => item._id === action.payload._id);
            if (!existingProduct) {
                state.wishlist.push(action.payload);
            }
        },
        increaseQuantity: (state, action) => {
            const product = state.cart.find(item => item.id === action.payload);
            if (product) {
                product.qnty += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const product = state.cart.find(item => item.id === action.payload);
            if (product) {
                if (product.qnty > 1) {
                    product.qnty -= 1;
                } else {
                    state.message = "You cannot decrease product quantity less than 1";
                }
            }
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        clearMessage: (state) => {
            state.message = '';
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
        }
    }
});

export const { addtoCart, increaseQuantity, decreaseQuantity, removeItem, clearMessage, addToWishlist,setCart,setWishlist } = productSlice.actions;
export default productSlice.reducer;
