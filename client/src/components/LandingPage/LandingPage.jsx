import React, { useState, useEffect } from 'react';
import './landing.css'; // Ensure your CSS is correctly set up
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/farmerPic.jpeg'
import img2 from '../../assets/buyerPic2.jpeg'
import img3 from '../../assets/handshake3.svg'
import img4 from '../../assets/reshot-icon-laptop.svg'
import img5 from '../../assets/reshot-icon-envelope.svg'
import img6 from '../../assets/reshot-icon-calendar.svg'
import img7 from '../../assets/etoe.svg'

export default function LandingPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate=useNavigate()
  const slides = [
    {
      image: `${img1}`,
      caption: 'Secure Your Income, Grow with Confidence',
      description: 'Connect directly with reliable buyers, negotiate contracts, and ensure timely payments.',
      button:'Signup as a farmer',
      link:'/fsignup'
    },
    {
      image: `${img2}`,
      caption: 'Source Quality Produce, Hassle-Free',
      description: 'Find trusted farmers, negotiate prices, and secure your supply chain with ease.',
      button:'Signup as a buyer',
      link:'/signup'
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="navbar-brand">
            <strong><span style={{color: 'green'}}>KRISHI</span> SEVA</strong>
          </div>
        </div>
        <div className="navbar-menu">
          <button><strong>Login/signup</strong></button>
          <div className="navbar-menu-content">
            <a onClick={()=>navigate('/fsignup')}>Farmer</a>
            <a onClick={()=>navigate('/signup')}>Buyer</a>
          </div>
        </div>
      </nav>

      {/* Carousel Section */}
      <div className="carousel-container">
        <div
          className="carousel-slide"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div className="carousel-item" key={index}>
              
                
                  <div className="left">
                  <h1>{slide.caption}</h1>
                  <p>{slide.description}</p>
                  <button className="btnii" onClick={()=>{navigate(slide.link)}}>{slide.button}</button>
                  </div>
                
                <div className="right">
                <img src={slide.image} alt={`Slide ${index}`} className="carousel-image" />
                </div>
            
            
            </div>
            
          ))}
        </div>

        {/* Navigation buttons */}
        <div className='leftbtn'>
        <button className="prev" onClick={prevSlide}>
          &#10094;
        </button>
        </div>
        <div className='rightbtn'>
        <button className="next" onClick={nextSlide}>
          &#10095;
        </button>
        </div>
      </div>

        

      {/* Central Section */}
      <section className="central-section">
        <h2 style={{ fontFamily: 'Poppins, sans-serif', color: 'green' }}>
          Why Choose KrishiSeva?
        </h2>
        <div className="features">
          <div className="feature">
            <img src={img3} alt="Handshake Icon" />
            <br />
            <h3>Guaranteed Market Access</h3>
            <p>Connect with verified buyers and secure a steady market for your produce.</p>
          </div>
          <div className="feature">
            <img src={img4} alt="Laptop Speech Icon" />
            <br />
            <h3>Transparent Negotiation</h3>
            <p>Discuss terms in real-time and reach agreements with ease.</p>
          </div>
          <div className="feature">
            <img src={img5} alt="Envelope Icon" />
            <br />
            <h3>Secure Contracts</h3>
            <p>Legal assurance with securely stored contracts.</p>
          </div>
          <div className="feature">
            <img src={img6} alt="Calendar Icon" />
            <br />
            <h3>Timely Payments</h3>
            <p>Get paid on time, every time with our integrated payment system.</p>
          </div>
          <div className="feature">
            <img src={img7} alt="End-to-End Support Icon" />
            <br />
            <h3>End-to-End Support</h3>
            <p>From initial contact to final delivery, we ensure smooth transactions.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How KrishiSeva Works: A Simple 3-Step Process</h2>
        <ol>
          <li><strong>Sign Up & Create Your Profile:</strong> Farmers and buyers can easily sign up and create a profile tailored to their needs.</li>
          <li><strong>Connect & Negotiate:</strong> Use our platform to discover potential partners and establish secure contracts.</li>
          <li><strong>Deliver & Get Paid:</strong> Farmers deliver the produce as per the contract and receive timely payments.</li>
        </ol>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Join a Growing Community of Successful Farmers and Buyers</h2>
        <p>Already trusted by hundreds of farmers and buyers across the region, KrishiSeva is transforming the agricultural landscape.</p>
        <a href="#" className="button">Start Your Journey with KrishiSeva Today</a>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 KrishiSeva. All rights reserved.</p>
      </footer>
    </>
  );
}
