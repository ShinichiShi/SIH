import 'bootstrap/dist/css/bootstrap.min.css';
import './Landing.css'
import img from '../../assets/buyerPic2.jpeg'
import img1 from '../../assets/farmerPic.jpeg'
import img2 from '../../assets/handshake3.svg'
import img3 from '../../assets/reshot-icon-laptop.svg'
import img4 from '../../assets/reshot-icon-envelope.svg'
import img5 from '../../assets/reshot-icon-calendar.svg'
import img6 from  '../../assets/etoe.svg'
import { useNavigate } from 'react-router-dom';



const AgriConnect = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    // navigate(`/login/${userType}`);
    // if(userType === 'farmer')
    //   toast.error('Processing...')
    // else 
    // {
      navigate(`/signup`)
    // }
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#f7f5eb' }}>
        <div className="flex justify-around w-full p-4">
          <a className="navbar-brand" href="#"><span>Agri</span>Connect</a>
          
          <div className="flex w-full justify-between" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown d-flex">
                <a className="nav-link dropdown-toggle btn btn-secondary me-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#f7f5eb' }}>
                  Login/Signup
                </a>
                <ul className="dropdown-menu">
                  <li className='dropdown-item cursor-pointer' onClick={() => handleNavigation('farmer')}>
                  Farmer</li>
                  <li className='dropdown-item cursor-pointer' onClick={() => handleNavigation('buyer')}>Buyer</li>
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
              <div className="row ">
                <div className="col-lg-5 col-md-12 col-12">
                  <div className="banner-info">
                    <h5>Secure Income, Grow with Confidence</h5>
                    <p>Connect directly with reliable buyers, negotiate contracts, and ensure timely payments.</p>
                    <p><a href="#" className="btn mt-3">Signup|Login as farmer</a></p>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-12">
                  <div className="imgBox1">
                    <img src={img} className="img-fluid" alt="" style={{ height: '290px', borderRadius: '20%' }} />
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
                    <img src={img1} className="img-fluid" alt="" style={{ borderRadius: '30%' ,height:'290px'}} />
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
            <img src={img2} alt="Guaranteed Market Access" />
            <h3>Guaranteed Market Access</h3>
            <p>Connect with verified buyers and secure a steady market for your produce.</p>
          </div>
          <div className="feature">
            <img src={img3} alt="Transparent Negotiation" />
            <h3>Transparent Negotiation</h3>
            <p>Discuss terms in real-time and reach agreements with ease.</p>
          </div>
          <div className="feature">
            <img src={img4} alt="Secure Contracts" />
            <h3>Secure Contracts</h3>
            <p>Legal assurance with securely stored contracts.</p>
          </div>
          <div className="feature">
            <img src={img5} alt="Timely Payments" />
            <h3>Timely Payments</h3>
            <p>Get paid on time, every time with our integrated payment system.</p>
          </div>
          <div className="feature">
            <img src={img6} alt="End-to-End Support" />
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
