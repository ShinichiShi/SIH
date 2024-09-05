import React from 'react';
import './trail.css'
import img1 from '../../assets/farmerPic.jpeg'
import img2 from '../../assets/buyerPic2.jpeg'
import img3 from '../../assets/handshake3.svg'
import img4 from '../../assets/reshot-icon-laptop.svg'
import img5 from '../../assets/reshot-icon-envelope.svg'
import img6 from '../../assets/reshot-icon-calendar.svg'
import img7 from '../../assets/etoe.svg'
import { Navigate, useNavigate } from 'react-router-dom';
function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <a className="navbar-brand"><strong><span style={{color: 'green'}}>Agri</span>Connect</strong></a>
        </div>
        <div className="navbar-menu">
          <button><strong>Login/signup</strong></button>
          <div className="navbar-menu-content">
            <a onClick={()=>navigate('/fsignup')}>Farmer</a>
            <a onClick={()=>navigate('/signup')}>Buyer</a>
          </div>
        </div>
      </nav>

      <section className="first-section">
        <div className="section-1">
          <div className="left">
            <h5 className="firstH5">Secure Income, Grow with Confidence</h5>
            <p>Connect directly with reliable buyers, negotiate contracts, and ensure timely payments.</p>
            <button className="signup-button" onClick={()=>navigate('/fsignup')}><strong>Signup</strong></button>
          </div>
          <div className="right">
            <img src={img1} alt="Farmer" />
          </div>
        </div>
      </section>

      <section className="second-section">
        <div className="section-2">
          <div className="left2">
            <img src={img2} alt="Buyer" />
          </div>
          <div className="right2">
            <h5 className="firstH5">Source Quality Produce, Hassle-Free</h5>
            <p>Find trusted farmers, negotiate prices, and secure your supply chain with ease.</p>
            <button className="signup-button" onClick={()=>navigate('/signup')}><strong>Signup</strong></button>
          </div>
        </div>
      </section>

      <section className="central-section">
        <h2>Why Choose AgriConnect?</h2>
        <div className="features">
          <div className="feature">
            <img src={img3} alt="Guaranteed Market Access" />
            <h3>Guaranteed Market Access</h3>
            <p>Connect with verified buyers and secure a steady market for your produce.</p>
          </div>
          <div className="feature">
            <img src={img4} alt="Transparent Negotiation" />
            <h3>Transparent Negotiation</h3>
            <p>Discuss terms in real-time and reach agreements with ease.</p>
          </div>
          <div className="feature">
            <img src={img5} alt="Secure Contracts" />
            <h3>Secure Contracts</h3>
            <p>Legal assurance with securely stored contracts.</p>
          </div>
          <div className="feature">
            <img src={img6} alt="Timely Payments" />
            <h3>Timely Payments</h3>
            <p>Get paid on time, every time with our integrated payment system.</p>
          </div>
          <div className="feature">
            <img src={img7} alt="End-to-End Support" />
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

      <section className="cta-section" style={{backgroundColor: '#f7f5eb'}}>
        <h2>Join a Growing Community of Successful Farmers and Buyers</h2>
      </section>

      <footer>
        <p>&copy; 2024 AgriConnect. All rights reserved.</p>
      </footer>

      <script>
        {`
          document.addEventListener("DOMContentLoaded", function() {
            console.log("AgriConnect Landing Page Loaded");
          });
        `}
      </script>
    </>
  );
}

export default LandingPage;
