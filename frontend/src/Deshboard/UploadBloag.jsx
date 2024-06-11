import { useState } from "react";
import axios  from "axios";
import "./DashAssets/css/uploadblog.css";

const UploadBloag = ()=>{
    const [blogimages, setBlogImages] = useState([]);
    const [bloginput, setBloginput] = useState({})

    const handlebloginput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setBloginput(values => ({ ...values, [name]: value }));
    }
    const handleFileChange = (e) => {
        setBlogImages(e.target.files);
    }

    const HandleBloagInput =(e)=>{
        e.preventDefault();
        const formdata = new FormData();
        for(let key in bloginput){
            formdata.append(key,bloginput[key])
        }
        for(let i = 0; i<blogimages.length;i++){
            formdata.append('Blogimages', blogimages[i]);
        }
        let url = "http://localhost:8000/dashboard/uploadblogs";
        axios.post(url,formdata,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>{
            console.log(res.data);
        }).catch((error)=>{
            console.error("There was an error saving the product!", error);
        })
    }

    return(
        <div className="upload-bloag-div">
         <form action="" onSubmit={HandleBloagInput}>
         <label htmlFor="images">Upload Images</label>
        <input id="images" type="file" name="blogimages" multiple onChange={handleFileChange} /> <br />
        <label htmlFor="titel">Bloag-tital</label>
        <input type="text"  id="titel" name="blogtitel" className="blogtitel" onChange={handlebloginput}/> <br />
        <label htmlFor="despription">Bloag-Description</label>
        <input type="text"  id="despription" className="blogdiscription" name="blogdiscription" onChange={handlebloginput}/> <br />
        <button className="blogupload-btn">upload</button>
         </form>
        </div>
    )
}
export default UploadBloag;