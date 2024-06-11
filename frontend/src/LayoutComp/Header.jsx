import "./header.css";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
    const cart = useSelector(state => state.cartProduct.cart);

    return (
        <nav className="header">
            <div className="main-header-div">
                <div className="input-div">
                    <input className="input-div-input" type="text" placeholder="All Categories" />
                </div>
                <div className="header-link">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/product">Product</Link></li>
                        <li><Link to="/topdeal">Top Deals</Link></li>
                        <li><Link to="/blogs">Blogs</Link></li>
                    </ul>
                </div>
                <div className="card-div">
                <Link style={{margin:"0px 20px"}} to="/wishlist">Wishlist</Link>
                    <Link to="/cart">
                        <FaCartShopping />
                        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;
