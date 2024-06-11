import axios from "axios";
import "./DashAssets/css/tranding.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const FeaturedProduct = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const loadProduct = () => {
        let url = "http://localhost:8000/dashboard/featuredproduct";
        axios.get(url).then((res) => {
            console.log(res.data)
            setData(res.data);
        }).catch((error) => {
            console.error("There was an error fetching the products!", error);
        });
    }

    const handleEdit = (id) => {
        navigate("/admin/edit/"+id);
      }

    const handleDelete = (id) => {
        let url = "http://localhost:8000/dashboard/delete";
        axios.post(url, { id:id })
        .then((res) => {
            loadProduct();
        }).catch((error) => {
            console.error("There was an error deleting the product!", error);
        });
    }

    useEffect(() => {
        loadProduct();
    }, []);

    return (
        <div className="Tranding-main-div">
            <h1>Featured Laptops</h1>
            <div className="product-list">
                {data.map((product) => (
                    <div key={product._id} className="product-card" style={{ display: "flex" }}>
                        <div>
                            <div className="image-row">
                                {product.images.map((image, index) => (
                                    <img key={index} src={image} alt={product.name} className="product-image" />
                                ))}
                            </div>
                            <h2>{product.name}</h2>
                            <p>Brand: {product.brand}</p>
                            <p>Price: ${product.price}</p>
                            <p>{product.description}</p>
                        </div>
                        <div>
                            <div className="button-row" >
                                <button onClick={() => handleEdit(product._id)}>Edit</button>
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedProduct;
