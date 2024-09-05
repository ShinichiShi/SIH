// import React from "react";
import 'tailwindcss/tailwind.css';
// import './Landing.module.css'; // Ensure you also adjust any custom styles if necessary

export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#f7f5eb' }}>
      <div className="container">
        <a className="navbar-brand" href="#"><span>Agri</span>Connect</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown d-flex">
              <a className="nav-link dropdown-toggle btn btn-secondary me-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#f7f5eb' }}>
                Login/Signup
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Farmer</a></li>
                <li><a className="dropdown-item" href="#">Buyer</a></li>
              </ul>

                <a
                  className="nav-link dropdown-toggle btn btn-secondary"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: '#f7f5eb',fontSize:'20px'}}
                >
                  Languages
                </a>
                <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">English</a></li>
                <li><a className="dropdown-item" href="#">Hindi</a></li>
                <li><a className="dropdown-item" href="#">Kannada</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
)}