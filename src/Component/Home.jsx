import laptop1 from "../assets/img/laptop3.jpg";
import Headphone from "../assets/img/headphone2.png";
import "../assets/css/home.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Tranding from "./Tranding";
import { useState } from "react";
import shopimg1 from "../assets/img/shopimg1.jpg";
import shopimg2 from "../assets/img/shopimg2.jpg";
import shopimg3 from "../assets/img/shopimg3.jpg";
import shopbanner from "../assets/img/shop-banner-01.jpg";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [selectedTag, setSelectedTag] = useState("trending");

    const handleTagChange = (tag) => {
        setSelectedTag(tag);
    }
    const shoppage = ()=>{
        navigate("/shop");
    }

    return (
        <div className="home-main-div">
            <Carousel
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
                showArrows={false}
                showStatus={false}
            >
                <div className="first-home-sild-backgrond">
                    <img style={{ width: "600px", marginRight: "-500px" }} src={laptop1} alt="Laptop 1" />
                    <div className="overlay-text">
                        <h1>Get 15% On Sale</h1>
                        <h2>UNDER FAVORABLE SMART GADGETS</h2>
                        <br />
                        FROM <br /><p>&euro;799.00/<span>999.00</span></p>
                        <button className="btn-slid1">use Code : hdvwqy23</button>
                        <button className="btn-slid2">buy now</button>
                    </div>
                </div>
                <div>
                    <img src={Headphone} alt="Laptop 2" />
                    <div className="overlay-text">
                        <h1>Get 15% On Sale</h1>
                        <h2>UNDER FAVORABLE SMART GADGETS</h2>
                        <br />
                        FROM <br /><p>&euro;799.00/<span>999.00</span></p>
                        <button className="btn-slid1">use Code : hdvwqy23</button>
                        <button className="btn-slid2">buy now</button>
                    </div>
                </div>
            </Carousel>

            <section>
                <div className="row">
                    <div className="col-md-3" >
                        <img src={shopimg1} alt="" />
                        <div>
                            <p>Discover tool</p>
                            <h5>Smart Mobile</h5>
                            <button onClick={shoppage}>Shop now</button>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <img src={shopimg2} alt="" />
                        <div>
                            <p>Discover tool</p>
                            <h5>Smart Headset</h5>
                            <button onClick={shoppage}>Shop now</button>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <img src={shopimg3} alt="" />
                        <div>
                            <p>Discover tool</p>
                            <h5>Portable Bluetooth Speaker</h5>
                            <button onClick={shoppage}>Shop now</button>
                        </div>
                    </div>
                </div>
            </section>

            <br /><br />
            <div className="tage-button">
                <button className="tage-button1" onClick={() => handleTagChange("trending")}>Trending</button>
                <button className="tage-button2" onClick={() => handleTagChange("featured")}>Featured</button>
                <button className="tage-button2" onClick={() => handleTagChange("topselling")}>Best Deal</button>
            </div>
            <br />
            <hr size="8" color="#fcc902" />

            <div>
                <Tranding tag={selectedTag} />
            </div>

            <hr size="8" color="#fcc902" />

            <div className="banner-container">
                <img src={shopbanner} alt="Shop Banner" />
                <div>
                    <h3>Big saving on Topselling smartphone</h3>
                    <h2>Get 85% off on Big Billion Days 2024</h2>
                    <button onClick={shoppage}>Shop now</button>
                </div>
            </div>

            {/* ======= Blog slider ========= */}
            <hr size="8" color="#fcc902" />
        </div>
    )
}

export default Home;
