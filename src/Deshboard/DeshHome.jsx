import "./dashboard.css";
import logo from "./DashAssets/img/logo.jpg";
import { Link, Outlet } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
const DeshHome = () => {
  return (
    <>
      <aside id="aside">
        <div id="aside-heading">
          <img 
            src={logo} 
            alt="Logo" 
          />
          <h2>Admin</h2><br/><span>Ecommerce</span> <hr style={{marginTop:"-20px"}}/>
          <Link className="desh-link" to="featurproduct">Featured</Link>
          <Link className="desh-link" to="topselling">Topselling</Link>
          <Link className="desh-link" to="Tranding">Trending</Link>
          <Link className="desh-link" to="upload">Upload</Link>
          <Link className="desh-link" to="orderdetail">Order Details</Link>
          <Link className="desh-link" to="blogs">Upload Blogs</Link>
          <Link className="desh-link" to="blogdisplay">Active Blogs</Link>
        </div>
      </aside>
      <nav id="nav">Hello
        <div style={{position:"absolute",right:"50px"}}>
          <Link className="desh-link" to="adminlogin"><FaRegUser/></Link>
        </div>
          
      </nav>
      <Outlet />
    </>
  );
}

export default DeshHome;
