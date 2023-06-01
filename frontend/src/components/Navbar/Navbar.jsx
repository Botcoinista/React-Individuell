import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left-nav">
        <NavLink to="/">
          <img
            src="https://s7template.com/tf/bmarketo/assets/img/logo.png"
            alt="Bmerketo"
          />
        </NavLink>
      </div>
      <div className="right-nav">
        <ul className="nav-links">
          <li>
            <NavLink to="/">HOME</NavLink>
            <i className="fa-solid fa-plus fa-sm"></i>{" "}
          </li>

          {user ? ( // If user is logged in, show the productlist
            <>
              <li>
                <NavLink to="/productlist">PRODUCTS</NavLink> {/*//If user is logged in, show the Add Product link*/}
                <i className="fa-solid fa-plus fa-sm"></i>
              </li>
              <li>
                <button onClick={Logout} className="textLight btn-logout">
                  Logout
                  <i class="logout-icon fa-solid fa-right-from-bracket"></i>                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="textLight">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
