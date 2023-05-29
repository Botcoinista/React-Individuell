import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="card">
       <Link to="/login">  <h1 className="heading">Login to get Admin access</h1></Link>
      </div>
    </div>
  );
};

export default Home;
