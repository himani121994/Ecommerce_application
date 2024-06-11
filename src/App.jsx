import { Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Layout";
import Home from './Component/Home';
import DeshHome from "./Deshboard/DeshHome";
import SignupDialog from "./Credentials/SignupDialog";
import LoginDialog from "./Credentials/LoginDialog";
import InsertProduct from "./Deshboard/InsertProduct";
import TrandingProduct from "./Deshboard/trandingProduct";
import Cart from "./Component/Cart";
import Paypage from "./Component/PayPage";
import OrderDetails from "./Deshboard/OrderDetails";
import Wishlist from "./Component/Wishlist";
import ProductView from "./Component/Productview";
import FeaturedProduct from "./Deshboard/Featurd";
import TopProduct from "./Deshboard/Topselling";
import UploadBloag from "./Deshboard/UploadBloag";
import LoginAdmin from "./Credentials/Loginadmin";
import Profileimg from "./LayoutComp/Profileimg";
import Shop from "./Component/Shop";
import ProductPage from "./Component/Product";
import Blog from "./Component/Blog";
import BlogInfo from "./Component/BlogInfo";
import TopDeal from "./Component/TopDeal";
import SearchResults from "./Component/SearchResults";
import Edit from "./Deshboard/Edit";
import BlogDisplay from "./Deshboard/BlogDisplay";
import EditBlog from "./Deshboard/EditBlog";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<LoginDialog />} />
        <Route path="/cart" element={<Cart/>} /> 
        <Route path="/paypage" element={<Paypage/>} />
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/profileimg/:id" element={<Profileimg/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/bloginfo/:id" element={<BlogInfo/>}/>
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/blogs" element={<Blog/>}/>
        <Route path="/topdeal" element={<TopDeal/>}/>
        <Route path="/search" element={<SearchResults />} />
      </Route>
      
      <Route path="admin" element={<DeshHome />}>
      <Route path="featurproduct" element={<FeaturedProduct />} />
      <Route path="topselling" element={<TopProduct/>}/>
        <Route path="Tranding" element={<TrandingProduct />} />
        <Route path="upload" element={<InsertProduct />} />
        <Route path="edit/:id" element={<Edit/>}/>
        <Route path="orderdetail" element={<OrderDetails/>}/>
        <Route path="blogs" element={<UploadBloag/>}/>
        <Route path="editblog/:id" element={<EditBlog/>}/>
        <Route path="adminlogin" element={<LoginAdmin/>}/>
       <Route path="blogdisplay" element={<BlogDisplay/>}/>
      </Route>
    </Routes>
  );
}

export default App;
