import { useState, useEffect, useContext, useRef } from 'react';
import styles from '../Farmer2.0/Sell Crops/FarmSell.module.css'; // Assuming you're using CSS Modules
import { toast, ToastContainer } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { doc, getDoc } from 'firebase/firestore';
import { db,auth } from '../../../../firebase';
import { AuthContext } from '../../context/auth_context'
import { useTranslation } from 'react-i18next';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { MdOutlineTranslate } from 'react-icons/md';
import GoogleTranslateWidget from '../../GoogleTranslateWidget';

function ProfileIcon() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserName = async () => {
      if (currentUser) {
        try {
          const farmerDocRef = doc(db, 'farmers', currentUser.uid);
          const farmerDoc = await getDoc(farmerDocRef);
          if (farmerDoc.exists()) {
            const data = farmerDoc.data();
            setUserName(`${data.firstname} ${data.lastname}`);
          }
        } catch (error) {
          console.error('error fetching user data:', error);
        }
      }
    };
    fetchUserName();
  }, [currentUser]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logging Out');
      setTimeout(() => {
        navigate('/flogin');
      }, 1000);
    } catch (error) {
      toast.error('Error signing out:', error);
    }
  };

  return (
    <div className={styles.profileicon}>
      <div onClick={toggleDropdown} className={styles.profilebutton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="36"
          height="36"
          fill="white"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div className={styles.profiletext}>Profile▾</div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <p className={styles.username}>{`Hi ${userName || 'User'}`}</p>
          <button
            className={styles.settingsButton}
            onClick={() => navigate('/profilesetup')}
          >
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
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  // Update active item when route changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const handleNavClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('Eng');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    // const cachedLanguage = localStorage.getItem('language') || i18n.language;
    // setLanguage(cachedLanguage === 'en' ? 'Eng' : cachedLanguage === 'kn' ? 'ಕನ್ನಡ' : 'हिंदी');
    // i18n.changeLanguage(cachedLanguage); // Apply cached language if it exists
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // }, [dropdownRef,i18n]);
  }, [dropdownRef]);

  return (
    <header className={styles.headfs}>
      <div className={styles.navp}>
        <div className={styles.h1nav}>
          <h1>Krishi</h1>
          <h1 id={styles.h1e}>Seva</h1>
        </div>
        <div ref={dropdownRef} className="relative flex">
          <div>
            <GoogleTranslateWidget />
          </div>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer flex items-center justify-center gap-2 hover:bg-slate-300 p-2 rounded"
          >
            <MdOutlineTranslate />
            {language}
            {dropdownOpen ? <IoIosArrowDropdown /> : <IoIosArrowDropup />}
          </div>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-24 bg-white border rounded shadow-md">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  // onClick={() => changeLanguage('en')}
                >
                  English
                </li>
                <li
                  className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  // onClick={() => changeLanguage('kn')}
                >
                  ಕನ್ನಡ
                </li>
                <li
                  className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  // onClick={() => changeLanguage('hi')}
                >
                  हिंदी
                </li>
              </ul>
            </div>
          )}
        </div>
        <ProfileIcon />
      </div>
      <div className={styles.navs}>
        <ul>
          <li
            className={
              activeItem === '/farmerdashboard' ? styles.activeNavItem : ''
            }
            onClick={() => handleNavClick('/farmerdashboard')}
          >
            Home
          </li>
          <li
            className={activeItem === '/farmsell' ? styles.activeNavItem : ''}
            onClick={() => handleNavClick('/farmsell')}
          >
            Sell crops
          </li>
          <li
            className={
              activeItem === '/notifications' ? styles.activeNavItem : ''
            }
            onClick={() => handleNavClick('/notifications')}
          >
            Notifications
          </li>
          <li
            className={activeItem === '/chat' ? styles.activeNavItem : ''}
            onClick={() => navigate('/chat', { state: { userType: 'farmer' } })}
          >
            Chats
          </li>
          {/* <li
            className={activeItem === '/contact' ? styles.activeNavItem : ''}
            onClick={() => handleNavClick('/contact')}
          >
            Contact
          </li> */}
        </ul>
      </div>
      <ToastContainer />
    </header>
  );
}

export default Navbar;
