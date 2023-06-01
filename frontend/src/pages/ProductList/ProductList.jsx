import React, { useEffect } from "react";
import { useState } from "react";
import "./ProductList.css";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ListItem from "../../components/ListItem/ListItem";

const ProductList = ({user}) => { // Pass the user state as a prop
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetches all products from the database
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.allProducts)) // Sets the products state to the data from the database
      .catch((err) => console.log(err));
  }, []);

  // If user is not logged in, redirect to the Login page
  if(!user) return (
    <Navigate to="/login" />
  )

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
            <ListItem key={product._id} product={product} setProducts={setProducts}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
