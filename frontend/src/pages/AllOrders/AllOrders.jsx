import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import DetailsOrders from "../../pages/DetailsOrders/DetailsOrders";
import "./AllOrders.css";

const AllOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!orders) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="order-h1">Product List</h1>
      <div className="order-container">
        <div className="order-row">
          {orders.map((order) => (
            <div className="order-card">
              <DetailsOrders
                key={order._id}
                order={order}
                setOrders={setOrders}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
