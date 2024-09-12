import { useState } from 'react';
import styles from './FarmSell.module.css'; // Assuming you're using CSS Modules
import { toast,ToastContainer } from 'react-toastify';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// function Searchsvg() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#fff"} fill={"none"}>
//       <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
//     </svg>
//   );
// }



function ProfileIcon() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("enter")
    try {
      await signOut(auth);
      console.log('hello')
      toast.success("Logging Out")
      setTimeout(() => {
        navigate('/flogin');
      }, 1000);
      // navigate('/flogin'); 
    } catch (error) {
      toast.error('Error signing out:', error);
    }
  };



  return (
    <div className={styles.profileicon}>
      <div onClick={toggleDropdown} className={styles.profilebutton}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="white">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" />
          <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className={styles.profiletext}>Profile▾</div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <p className={styles.username}>Arvind Kumar</p> {/* Display user's name */}
          <button className={styles.settingsButton} onClick={() => navigate('/profilesetup')}>
            Settings
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}


function Navbar() {
    const navigate = useNavigate();
  return (
    <header className={styles.headfs}>
      <div className={styles.navp}>
        <div className={styles.h1nav}>
          <h1>Agri</h1>
          <h1 id={styles.h1e}>Connect</h1>
        </div>
        {/* <div className={styles['search-nav']}>
          <input type="text" placeholder="Search" />
          <Searchsvg />
          Search
        </div> */}
        <ProfileIcon />
      </div>
      <div className={styles.navs}>
        <ul>
          <li onClick={() => navigate('/farmerdashboard')}>Home</li>
          <li onClick={() => navigate('/farmsell')}>Sell crops</li>
          <li>Notifications</li>
          <li>Contact</li>
        </ul>
      </div>
      <ToastContainer />
    </header>
  );
}

export default Navbar;
