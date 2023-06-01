import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
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

    // Check if the value is undefined or null
    if (value === undefined || value === null) {
      // If the value is undefined or null, remove the corresponding key from updatedProduct
      const updatedProductCopy = { ...updatedProduct };
      delete updatedProductCopy[id];
      setUpdatedProduct(updatedProductCopy);
    } else {
      // If the value is not undefined or null, update the updatedProduct state with the new value
      setUpdatedProduct({ ...updatedProduct, [id]: value });
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setIsUpdating(true); // Set isUpdating to true

    setTimeout(() => {
      // Simulate a 2-second delay before redirecting
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
          setProduct(data);
          setUpdatedProduct({});
          setIsUpdating(false); // Set isUpdating back to false after the update is completed
          navigate(`/productlist`);
        })
        .catch((err) => {
          console.log(err);
          setIsUpdating(false); // Set isUpdating back to false in case of an error
        });
    }, 800);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card">
      <h1 className="details-heading">Edit Product</h1>
        <div className="img">
          <img
            src={updatedProduct.imgURL || product.imgURL}
            alt={product.name}
          />
        </div>
        <div className="product-details-right">
          <div className="details">
            {/* <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <p>{product.imgURL}</p> */}
          </div>
          <form className="update-form" onSubmit={handleUpdateProduct}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={
                updatedProduct.name !== undefined
                  ? updatedProduct.name
                  : product.name
              }
              onChange={handleInputChange}
            />
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={
                updatedProduct.category !== undefined
                  ? updatedProduct.category
                  : product.category
              }
              onChange={handleInputChange}
            />
            <label htmlFor="imgURL">Img:</label>
            <input
              type="text"
              id="imgURL"
              value={
                updatedProduct.imgURL !== undefined
                  ? updatedProduct.imgURL
                  : product.imgURL
              }
              onChange={handleInputChange}
            />
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={
                updatedProduct.price !== undefined
                  ? updatedProduct.price
                  : product.price
              }
              onChange={handleInputChange}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={
                updatedProduct.description !== undefined
                  ? updatedProduct.description
                  : product.description
              }
              onChange={handleInputChange}
            />
            <div className="update-btn">
              <button
                type="submit"
                // disabled={isUpdating} // Disable the button when isUpdating is true
                style={{
                  backgroundColor: isUpdating ? "green" : "red", // Changes the background color to green when submitting
                }}
              >
                {isUpdating ? "Updating Product..." : "Update Product"}  {/* {Change the button text to "Updating Product..." when submitting} */}
              
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
