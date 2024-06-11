import axios from "axios";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const EditBlog = ()=>{
    const [input, setInput] = useState({
        blogTitle: "",
        blogDescription: ""
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const onloadBlog = () => {
        axios.get(`http://localhost:8000/dashboard/editblog/${id}`)
            .then((res) => {
                setInput(res.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the blog!", error);
            });
    };

    useEffect(() => {
        onloadBlog();
    }, [id]);

    const handleBlogInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleBlogSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/dashboard/updateblog/${id}`, input)
            .then((res) => {
                console.log(res.data);
                navigate("/admin/blogdisplay"); // Redirect after successful update
            })
            .catch((error) => {
                console.error("There was an error updating the blog!", error);
            });
    };
    return(
        <>
        <div className="upload-bloag-div">
         <form action="" onSubmit={handleBlogSubmit}>
        <label htmlFor="titel">Bloag-tital</label>
        <input type="text"  id="titel" name="blogTitle" value={input.blogTitle} className="blogtitel" onChange={handleBlogInput}/> <br />
        <label htmlFor="despription">Bloag-Description</label>
        <input type="text"  id="despription" name="blogDescription" value={input.blogDescription} className="blogdiscription" onChange={handleBlogInput}/> <br />
        <button className="blogupload-btn">upload</button>
         </form>
        </div>
        </>
    )
}
export default EditBlog;