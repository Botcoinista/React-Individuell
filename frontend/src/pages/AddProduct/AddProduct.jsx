import React, { useState } from "react";
import "./AddProduct.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
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

 // ADD PRODUCT
  const handleAddProduct = (e) => {
    e.preventDefault();
    setIsAdding(true);
    
  setTimeout(() => {
      // Simulate a 2-second delay before redirecting
    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product), // Converts the JavaScript object into a JSON string, with axios no need to do this
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
      setIsAdding(false); // When the request is finished, change isAdding back to false
      // alert("Product added successfully");
      navigate("/productlist");   
   } , 1000);
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

        <button type="submit"
        // disabled={isAdding} // Disable the button when isAdding is true
        style={{fontSize: "large", backgroundColor: isAdding ? "green" : "black", }}// Changes the background color to green when submitting}}
        >
          {isAdding ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
