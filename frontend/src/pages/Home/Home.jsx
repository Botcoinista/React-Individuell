import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <img className="homepage" src="https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
      <div className="centered-content ">
       <Link to="/login">  <h1 className="heading">Login to get Admin access</h1></Link>
      </div>
    </div>
  );
};

export default Home;
