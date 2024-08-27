import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const AgriConnect = () => {
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

                <a className="nav-link dropdown-toggle btn btn-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#f7f5eb' }}>
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

      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="carousel-caption">
              <div className="row">
                <div className="col-lg-5 col-md-12 col-12">
                  <div className="banner-info">
                    <h5>Secure Income, Grow with Confidence</h5>
                    <p>Connect directly with reliable buyers, negotiate contracts, and ensure timely payments.</p>
                    <p><a href="#" className="btn mt-3">Signup|Login as farmer</a></p>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-12">
                  <div className="imgBox1">
                    <img src="farmerPic.jpeg" className="img-fluid" alt="" style={{ height: '290px', borderRadius: '20%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="carousel-caption">
              <div className="row">
                <div className="col-lg-5 col-md-12 col-12">
                  <div className="banner-info">
                    <h5>Source Quality Produce, Hassle-Free</h5>
                    <p>Find trusted farmers, negotiate prices, and secure your supply chain with ease.</p>
                    <p style={{ fontSize: 'smaller' }}><a href="landingPage.html" className="btn mt-3">Signup|Login as buyer</a></p>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-12">
                  <div className="imgBox">
                    <img src="buyerPic2.jpeg" className="img-fluid" alt="" style={{ borderRadius: '30%' ,height:'290px'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="central-section">
        <h2>Why Choose AgriConnect?</h2>
        <div className="features">
          <div className="feature">
            <img src="icons/handshake3.svg" alt="Guaranteed Market Access" />
            <h3>Guaranteed Market Access</h3>
            <p>Connect with verified buyers and secure a steady market for your produce.</p>
          </div>
          <div className="feature">
            <img src="icons/reshot-icon-laptop-speech-bubble-3FTBXEHGL2.svg" alt="Transparent Negotiation" />
            <h3>Transparent Negotiation</h3>
            <p>Discuss terms in real-time and reach agreements with ease.</p>
          </div>
          <div className="feature">
            <img src="./icons/reshot-icon-envelope-FD2JGW9ELS.svg" alt="Secure Contracts" />
            <h3>Secure Contracts</h3>
            <p>Legal assurance with securely stored contracts.</p>
          </div>
          <div className="feature">
            <img src="icons/reshot-icon-calendar-T8KE5NP7DR.svg" alt="Timely Payments" />
            <h3>Timely Payments</h3>
            <p>Get paid on time, every time with our integrated payment system.</p>
          </div>
          <div className="feature">
            <img src="icons/etoe.svg" alt="End-to-End Support" />
            <h3>End-to-End Support</h3>
            <p>From initial contact to final delivery, we ensure smooth transactions.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How AgriConnect Works: A Simple 3-Step Process</h2>
        <ol>
          <li><strong>Sign Up & Create Your Profile:</strong> Farmers and buyers can easily sign up and create a profile tailored to their needs.</li>
          <li><strong>Connect & Negotiate:</strong> Use our platform to discover potential partners and establish secure contracts.</li>
          <li><strong>Deliver & Get Paid:</strong> Farmers deliver the produce as per the contract and receive timely payments.</li>
        </ol>
      </section>

      <section className="cta-section" style={{ backgroundColor: '#f7f5eb' }}>
        <h2>Join a Growing Community of Successful Farmers and Buyers</h2>
      </section>

      <footer>
        <p>&copy; 2024 AgriConnect. All rights reserved.</p>
      </footer>
    </>
  );
};

export default AgriConnect;
