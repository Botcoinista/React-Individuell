import React, { useEffect } from "react";
import { useState } from "react";
import "./ProductList.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.allProducts))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1 className="product-h1">Product List</h1>
      <div className="productlist-container">
        <div className="product-row">
          {products.map((product) => (
            <div key={product._id}>
              <div onClick={() => navigate(`/productdetails/${product._id}`)} className="product-card">
                <div className="img">
                  <img src={product.imgURL} alt={product.name} />
                </div>
                <div className="product-right">
                  <div className="details">
                    <p>{product.name}</p>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                  </div>
                  <div className="btn-parent">
                  <button onClick={() => navigate(`/productdetails/${product._id}`)} className="delete-btn">Delete</button>
                  <button onClick={() => navigate(`/productdetails/${product._id}`)} className="product-btn">Edit</button>
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
