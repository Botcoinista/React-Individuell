import React, { useEffect } from "react";
import { useState } from "react";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.allProducts))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Product List</h1>
      <div className="productlist-container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id}>
              <div className="card">
                <div className="img">
                  <img src={product.imgURL} alt={product.name} />
                </div>
                <div className="right">
                <div className="details">
                  <p>{product.name}</p>
                  <p>{product.category}</p>
                  <p>{product.price}</p>
                  <p>{product.description}</p>
                </div>
                <div className="btn-parent">
                  <button className="btn">Change</button>
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
