import { Link,Outlet } from 'react-router-dom';

import TopHeader from './LayoutComp/TopHeader';
import Header from './LayoutComp/Header';
import Footer from "./LayoutComp/Footer";
const Layout = ()=>{
    return(
        <>
       <TopHeader/>
       <Header/>
       <Outlet />
       <Footer />
        </>
    )
}
export default Layout;