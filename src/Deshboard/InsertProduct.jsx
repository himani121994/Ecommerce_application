import { useState } from "react";
import axios from "axios";
import "../Deshboard/DashAssets/css/upload.css";

const InsertProduct = () => {
    const [input, setInput] = useState({
        Pname: "",
        Pbrand: "",
        Pprice: "",
        Pdescription: "",
        Pcategory: "laptop",
        Ptags: "other",
    });
    const [images, setImages] = useState([]);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput(values => ({ ...values, [name]: value }));
    }

    const handleFileChange = (e) => {
        setImages(e.target.files);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in input) {
            formData.append(key, input[key]);
        }
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        let url = "http://localhost:8000/dashboard/productsave";
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.error("There was an error saving the product!", error);
        });
    }

    return (
        <div className="Upload-main-div">
            <h1>Upload A Product</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Pname">Product Name</label>
                <input id="Pname" type="text" name="Pname" value={input.Pname} onChange={handleInput} />
                <label htmlFor="Pbrand">Product Brand</label>
                <input id="Pbrand" type="text" name="Pbrand" value={input.Pbrand} onChange={handleInput} />
                <label htmlFor="Pprice">Product Price</label>
                <input id="Pprice" type="number" name="Pprice" value={input.Pprice} onChange={handleInput} />
                <label htmlFor="Pdescription">Product Description</label>
                <input id="Pdescription" type="text" name="Pdescription" value={input.Pdescription} onChange={handleInput} />
                <label htmlFor="Pcategory">Category</label>
                <select id="Pcategory" name="Pcategory" value={input.Pcategory} onChange={handleInput}>
                    <option value="laptop">Laptop</option>
                    <option value="computer">Computer</option>
                    <option value="phones">Phone</option>
                    <option value="headphone">Headphone</option>
                    <option value="wirelesscontroller">Wireless Controller</option>
                    <option value="securitycamera">Security Camerar</option>
                    <option value="powercable">Power Cable</option>
                    <option value="watch">Watch</option>
                </select>
                <label htmlFor="Ptags">Select Tags</label>
                <select id="Ptags" name="Ptags" value={input.Ptags} onChange={handleInput}>
                    <option value="other">Other Products</option>
                    <option value="featured">Feature Products</option>
                    <option value="topselling">Top Selling Products</option>
                    <option value="trending">Trending Products</option>
                </select>
                <label htmlFor="images">Upload Images</label>
                <input id="images" type="file" multiple onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default InsertProduct;
