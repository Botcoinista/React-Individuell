import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ product, setProducts }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();


    const handleDeleteProduct = (event, productId) => {
        event.stopPropagation();
    
        const token = localStorage.getItem("token");
    
        setIsDeleting(true);
    
        setTimeout(() => {
          fetch(`http://localhost:8080/api/products/${productId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Product deleted successfully:", data);
    
              setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
              );
            })
            .catch((err) => console.log(err))
            .finally(() => {
              setIsDeleting(false); // Set isDeleting back to false after the delay
            });
        }, 1000);
      };

  return (
    <div>
    <div
      onClick={() => navigate(`/productdetails/${product._id}`)}
      className="product-card"
    >
      <div className="img">
        <img src={product.imgURL} alt={product.name} />
      </div>
      <div className="product-right">
        <div className="details">
          <div className="productlist-name">
            <p>{product.name}</p>
          </div>
          <p>{product.category}</p>
          <p>€ {product.price}</p>
          <div className="productlist-description">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="btn-parent">
          <button
            onClick={(event) =>
              handleDeleteProduct(event, product._id)
            } // Pass the productId to the handleDeleteProduct function
            className={isDeleting ? "delete-btn deleting" : "delete-btn"}
          >
            {isDeleting ? "Deleting..." : "Delete"}
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
  )
}

export default ListItem