import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "./navbar.css";
import Login from "../pages/Login";
import { toast } from "react-toastify";

function Navbar({openLogin}) {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogut = () =>{
    localStorage.removeItem('token');
    toast.success('Logged Out Successfully');
    navigate('/');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark p-1">
        <Link to="/" className="navbar-brand">Shopping Cart</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/addProducts" className="nav-link text-white">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link text-white">Orders</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link text-white"><CgProfile/></Link>
            </li>
            <li className="nav-item">
              {
                token ? (
                  <button className="nav-link text-white" onClick={handleLogut} >
                    Logout
                  </button>
                )
                :
                (
                  <button className="nav-link text-white" onClick={openLogin}>
                    Login
                  </button>
                )
              }
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-white">
                <FaCartArrowDown />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
