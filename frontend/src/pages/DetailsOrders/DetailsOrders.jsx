import React from "react";
import { Link } from "react-router-dom";

const DetailsOrders = ({ order }) => {
  if (!order) {
    return null;
  }

  const orderLineStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    marginBottom: "12px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    border: "1px solid #ccc",
    width: "60%",
    margin: "0 auto",
    marginBottom: "2rem"
  };

  const orderInfoStyle = {
  //  width: "25%",
  //  display: "flex",
  //   justifyContent: "center",
  };

  return (
    <Link to={`/orderdetails/${order._id}`} style={orderLineStyle}>
      <div style={orderInfoStyle}>{order._id}</div>
      <div style={orderInfoStyle}>{order.createdAt.slice(0, 10)}</div>
      <div style={orderInfoStyle}>
        {order.pending ? "Not delivered" : "Delivered"}
      </div>
      <div style={orderInfoStyle}>€ {order.totalPrice}</div>
    </Link>
  );
};

export default DetailsOrders;
