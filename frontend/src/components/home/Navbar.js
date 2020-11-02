import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand" style={{ fontWeight: "bold", fontSize: "40px" }}>
          DEVHUB
        </a>
        <ul className="nav align-items-center">
          <li className="nav-item align-self-center">
            <Link to="/signin" className="btn btn-outline-primary px-4 m-3 align-self-center">
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>Login</span>
            </Link>
          </li>
          <li className="nav-item align-self-center ">
            <Link to="/signup" className="btn btn-primary px-4 m-3">
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>Signup</span>
            </Link>
          </li>
          <li className="nav-item align-self-center ">
            <Link to="/forget" className="btn btn-primary px-4 m-3">
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>Forget</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
