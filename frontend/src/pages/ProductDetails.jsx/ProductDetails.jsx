import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch the specific product using the productId from the URL
    fetch(`http://localhost:8080/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [productId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [id]: value });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    // Perform update operation using updatedProduct data
    // You can make a request to the server to update the product data
    // For example:
    fetch(`http://localhost:8080/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response and update the product state
        // Set the updated product data
        setProduct(data);
        // Clear the updatedProduct state
        setUpdatedProduct({});
      })
      .catch((err) => console.log(err));
  };
  

  if (!product) {
    return <p>Loading...</p>;
  }

  // Render the product details and update form
  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <div className="img">
          <img src={updatedProduct.imgURL} alt={product.name} />
        </div>
        <div className="product-details-right">
          <div className="details">
            {/* <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <p>{product.description}</p> */}
          </div>
          <form className="update-form" onSubmit={handleUpdateProduct}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={updatedProduct.name || product.name}
              onChange={handleInputChange}
            />
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={updatedProduct.category || product.category}
              onChange={handleInputChange}
            />
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={updatedProduct.price || product.price}
              onChange={handleInputChange}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={updatedProduct.description || product.description}
              onChange={handleInputChange}
            />
            <div className="update-btn">
              <button onClick={() => navigate(`/productlist`)} type="submit">Update Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
