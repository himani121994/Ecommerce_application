import React from 'react';
import "../assets/css/bloginfo.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Blog from './Blog';
// import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

const BlogInfo = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/products/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("There was an error fetching the blog details!", error);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    const { blogTitle, blogDescription, images } = blog;

    const handleBlogClick = (id) => {
        navigate(`/BlogInfo/${id}`);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100); // Adding a slight delay
    };

    return (
        <div style={{ justifyContent: "center" }}>
            <h1 className='blogheading'>{blogTitle}</h1>
            <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="col-md-6">
                    <p className='description'>{blogDescription}</p>
                    <p className='description'>What You Need to Know about the Facebook Product Design Interview and What to do about it. Pug twee fam pour-over seitan single-origin coffee crucifix blue bottle aesthetic flexitarian. Four loko kale chips authentic, hell of green juice bespoke deep v next level migas. Woke bushwick prism live-edge austin tote bag.
                    Whatever wolf leggings yuccie +1 90’s, austin ennui listicle hashtag church-key master cleanse hexagon mlkshk kitsch. Dreamcatcher ugh jianbing palo santo blog hashtag brunch. Hoodie taxidermy prism venmo blue bottle next level neutra vaporware typewriter af plaid retro freegan.</p>
                    
                </div>
                <div className="blog-images col-md-6">
                    {images.length > 0 && (
                        <div className="top-image">
                            <img src={images[0]} alt="Top Blog" className="top-blog-image" />
                        </div>
                    )}
                </div>
            </div>
            <h4 className='blogheading'>Aut beatae iure maiores enim maiores molestiae. Accusamus molestiae voluptas veniam dolores</h4>
            <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="blog-images col-md-6">
                    {images.length > 1 && (
                        <div className="mid-image">
                            <img src={images[1]} alt="Mid Blog" className="mid-blog-image" />
                        </div>
                    )}
                </div>
                <div className="col-md-6 description">
                    <h2>More Details</h2>
                    <p>Here is some more information about the blog...</p>
                    <p className='description'>{blogDescription}</p>
                    <p className='description'>Writing copy that persuades consumers to give your offering a try is no easy task. Companies in saturated markets battle with competitors to earn the trust of prospects through email marketing campaigns, blog posts, social media and more. Bombarded with so many different marketing communications every day, many consumers start to tune out brand messaging altogether, making it that much more difficult for novice copywriters to get their attention, much less tempt them to make a purchase.</p>
                   
                </div>
            </div>
            <div style={{ margin: "10px" }}>
                <h1 style={{ textAlign: "center" }}>Read more Blogs</h1>
                    <Blog limit={4} handleBlogClick={handleBlogClick} />
            </div>
        </div>
    );
};

export default BlogInfo;
