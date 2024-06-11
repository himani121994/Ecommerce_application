import axios from "axios";
import { useState,useEffect } from "react";
import "./DashAssets/css/tranding.css";
import { useNavigate } from "react-router-dom";

const BlogDisplay = ()=>{
    const [blog, setBlog] = useState([]);
    const mylink = useNavigate();
    const onloadBlog = ()=>{
        let url = "http://localhost:8000/dashboard/blogdisplay";
        axios.get(url).then((res)=>{
              setBlog(res.data)
        });
    }

useEffect(()=>{
   onloadBlog();
},[])

const handleDelete = (id)=>{
    axios.post ("http://localhost:8000/dashboard/blogdelete",{id:id}).then((res)=>{
        onloadBlog();
    }).catch((error)=>{
           console.error("there was an error deleting the blog! ",error)
    })
}

const handleEdit = (id)=>{
     mylink("/admin/editblog/"+id)
}
  
    return(

        <div className="Tranding-main-div">
            <h1>Trending Laptops</h1>
            <div className="product-list">
                {blog.map((key) => (
                    <div key={key._id} className="product-card" style={{ display: "flex" }}>
                        <div>
                            <div className="image-row">
                                {key.images.map((image, index) => (
                                    <img key={index} src={image} alt={key.name} className="product-image" />
                                ))}
                            </div>
                            <h2>{key.blogTitle}</h2>
                            <p>Brand: {key.blogDescription}</p>
                        </div>
                        <div>
                            <div className="button-row" >
                                <button onClick={() => handleEdit(key._id)}>Edit</button>
                                <button onClick={() => handleDelete(key._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default BlogDisplay;