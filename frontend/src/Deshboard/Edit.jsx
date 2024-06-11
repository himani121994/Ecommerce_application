import axios from "axios";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const Edit = () => {
  const [input, setInput] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    category: '',
    Ptags: '',
  });
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const OnloadEditPage = () => {
    let url = `http://localhost:8000/dashboard/edit/${id}`;
    axios.get(url).then((res) => {
      setInput(res.data);
      console.log(res.data)
    });
  }

  useEffect(() => {
    OnloadEditPage();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
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

    let posturl = `http://localhost:8000/dashboard/updateproduct/${id}`;
    axios.post(posturl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res.data);
      navigate("/admin/upload")
    }).catch((error) => {
      console.error("There was an error updating the product!", error);
    });
  };

  return (
    <div className="Upload-main-div">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Pname">Product Name</label>
        <input id="Pname" type="text" name="name" value={input.name} onChange={handleInput} />
        <label htmlFor="Pbrand">Product Brand</label>
        <input id="Pbrand" type="text" name="brand" value={input.brand} onChange={handleInput} />
        <label htmlFor="Pprice">Product Price</label>
        <input id="Pprice" type="number" name="price" value={input.price} onChange={handleInput} />
        <label htmlFor="Pdescription">Product Description</label>
        <input id="Pdescription" type="text" name="description" value={input.description} onChange={handleInput} />
        <label htmlFor="Pcategory">Category</label>
        <select id="Pcategory" name="category" value={input.category} onChange={handleInput}>
          <option value="laptop">Laptop</option>
          <option value="computer">Computer</option>
          <option value="phones">Phone</option>
          <option value="headphone">Headphone</option>
          <option value="wirelesscontroller">Wireless Controller</option>
          <option value="securitycamera">Security Camera</option>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Edit;
