import React, { useEffect } from "react";
import { useState } from "react";
import "./ProductList.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]); 
  const navigate = useNavigate();

  const handleDeleteProduct = (productId) => {
    const token = localStorage.getItem("token"); // Retrieves the token from localStorage

    // Deletes the product from the database
    fetch(`http://localhost:8080/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Attaches the token to the request
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product deleted successfully");
        console.log("Product deleted successfully:", data);

        setProducts((prevProducts) => 
        prevProducts.filter((product) => product._id !== productId) // Filters out the deleted product from the products state, makes the page update without having to refresh
        )
      })
      .catch((err) => console.log(err));
  };
  // Fetches all products from the database
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.allProducts)) // Sets the products state to the data from the database
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="Parent-add-product-btn">
        <button
          onClick={() => navigate(`/add`)} // Adds a button to navigate to the AddProduct page
          className="add-product-btn"
        >
          ADD PRODUCT
        </button>
      </div>
      <h1 className="product-h1">Product List</h1>
      <div className="productlist-container">
        <div className="product-row">
          {products.map((product) => (
            <div key={product._id}>
              <div
                onClick={() => navigate(`/productdetails/${product._id}`)}
                className="product-card"
              >
                <div className="img">
                  <img src={product.imgURL} alt={product.name} />
                </div>
                <div className="product-right">
                  <div className="details">
                    <p>{product.name}</p>
                    <p>{product.category}</p>
                    <p>€ {product.price}</p>
                    <p>{product.description}</p>
                  </div>
                  <div className="btn-parent">
                    <button
                      onClick={() => handleDeleteProduct(product._id)} // Pass the productId to the handleDeleteProduct function
                      className="delete-btn"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/productdetails/${product._id}`)} // Pass the productId to the handleDeleteProduct function
                      className="product-btn"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
