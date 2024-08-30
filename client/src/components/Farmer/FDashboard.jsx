import styles from './FDashboard.module.css';
import { useState } from 'react';

function Searchsvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#fff"} fill={"none"}>
      <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <div className={styles.profileicon}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="white">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" />
        <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div>Profile▽</div>
    </div>
  );
}

function Navbar() {
  return (
    <header>
      <div className={styles.navp}>
        <div className={`${styles.h1nav} ${styles['text-excess']}`}>
          <h1>Agri</h1>
          <h1 id={styles.h1e}>Connect</h1>
        </div>
        <div className={styles['search-nav']}>
          <input type="text" placeholder='Search' />
          <Searchsvg />
          Search
        </div>
        <ProfileIcon />
      </div>
      <div className={styles.navs}>
        <ul>
          <li>Home</li>
          <li>Sell crops</li>
          <li>Notifications</li>
          <li>Contact</li>
        </ul>
      </div>
    </header>
  )
}

function Search() {
  return (
    <div className={styles['search-box']}>
      <div className={styles['search-box-div']}>
        <p>Search by crops:</p>
        <div className={styles['search-bar']}>
          <input type="text" name="search" id="search" placeholder="Enter crop's name" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
            <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className={styles['search-box-div']}>
        <p>{`Search by District:`}</p>
        <div className={styles['search-bar']}>
          <input type="text" name="search" id="search" placeholder="Enter District name" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
            <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Box({ showSecondaryBox }) {
  return (
    <div className={styles['box-primary']}>
      <div className={styles['primary-details']}>
        <p>Name : Arvind Kumar</p>
        <p>Crop : Rice</p>
        <p>Quantity required : 100kg</p>
        <p>Mobile No : 1234567890</p>
        <p>State : Karnataka</p>
      </div>
      <div className={styles['primary-btn']}>
        <button onClick={showSecondaryBox}>Show more details</button>
      </div>
    </div>
  )
}

function Secondarybox({ hideSecondaryBox }) {
  return (
    <div className={styles['box-sec']}>
      <h3>Details:</h3>
      <div className={styles.crossbtn}>
        <button onClick={hideSecondaryBox}>✕</button>
      </div>
      <div className={styles['sec-details']}>
        <p>Name : Arvind Kumar</p>
        <p>Crop : Rice</p>
        <p>Quantity : 100kg</p>
        <p>Language Known : Kannada, Hindi, English</p>
        <p>Mobile : 1234567890</p>
        <p>E-mail : arvind@gmail.com</p>
        <p>Address : 23, Jayanagar, Bengaluru</p>
        <p>City : Bengaluru</p>
        <p>District : Bengaluru</p>
        <p>State : Karnataka</p>
        <p>Pincode : 560078</p>
      </div>
      <div className={styles['contract-btn']}>
        <button>Make a Contract</button>
      </div>
    </div>
  )
}

function MainBox() {
  const [showBox, setShowBox] = useState(false);

  const showSecondaryBox = () => setShowBox(true);
  const hideSecondaryBox = () => setShowBox(false);

  return (
    <div className={styles['container-p']}>
      <h1>DEALERS</h1>
      <div className={styles['container-s']}>
        <Box showSecondaryBox={showSecondaryBox} />
        <Box showSecondaryBox={showSecondaryBox} />
        <Box showSecondaryBox={showSecondaryBox} />
        <Box showSecondaryBox={showSecondaryBox} />
        <Box showSecondaryBox={showSecondaryBox} />
      </div>
      {showBox && <div className={styles.modal}>
        <Secondarybox hideSecondaryBox={hideSecondaryBox} />
      </div>}
    </div>
  )
}

function FDashboard() {
  return (
    <>
      <Navbar />
      <Search />
      <MainBox />
    </>
  )
}

export default FDashboard;
