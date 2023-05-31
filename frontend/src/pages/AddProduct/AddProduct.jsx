import React, { useState } from "react";
import "./AddProduct.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imgURL: "",
  });

  const handleInputChange = (e) => {
    const { value, id } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [id]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Perform logic to add the product
    // You can make a request to the server to add the product data
    // For example:
    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response, e.g., show a success message
        console.log("Product added successfully:", data);
        // Reset the form fields
        setProduct({
          name: "",
          category: "",
          price: "",
          description: "",
        });
      })
      .catch((err) => console.log(err));
      alert("Product added successfully");
      navigate("/productlist");
     

        
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form className="add-product-form" onSubmit={handleAddProduct}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={product.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={product.category}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={product.price}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="imgURL">Image</label>
        <input
          type="text"
          id="imgURL"
          value={product.img}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={product.description}
          onChange={handleInputChange}
          required
        ></textarea>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
