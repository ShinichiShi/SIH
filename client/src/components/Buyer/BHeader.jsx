import { MdOutlineTranslate } from 'react-icons/md';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import GoogleTranslateWidget from '../GoogleTranslateWidget';
function BHeader() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('Eng')
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    const cachedLanguage = localStorage.getItem('language') || i18n.language;
    setLanguage(cachedLanguage === 'en' ? 'Eng' : cachedLanguage === 'kn' ? 'ಕನ್ನಡ' : 'हिंदी');
    i18n.changeLanguage(cachedLanguage); // Apply cached language if it exists
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef,i18n]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged Out');
      navigate('/login');
    } catch (error) {
      toast.error('Error signing out:', error);
    }
  };
  
  // Language change handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng === 'en' ? 'Eng' : lng === 'kn' ? 'ಕನ್ನಡ' : 'हिंदी');
    setDropdownOpen(false); // Close the dropdown after selecting a language
    localStorage.setItem('language', lng); // Cache the selected language
  };

  return (
    <div className="h-20 font-sans">
      <div className="bg-white h-full shadow flex w-full">
        <div className=" w-full flex justify-between items-center  px-4">
          <div className="text-green-500 text-2xl font-bold">{t('header.title')}</div>
          <h1>{t('header.welcome')}</h1>
          <div>
            <div className="flex items-center justify-center gap-4">
              <div>
                <GoogleTranslateWidget />
              </div>
              <div ref={dropdownRef} className="relative">
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
                        onClick={() => changeLanguage('en')}
                      >
                        English
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                        onClick={() => changeLanguage('kn')}
                      >
                        ಕನ್ನಡ
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                        onClick={() => changeLanguage('hi')}
                      >
                        हिंदी
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="py-2 px-2 border rounded-lg flex items-center justify-center bg-green-500 hover:bg-green-600 text-white"
                onClick={handleLogout}
              >
               {t('header.logout')}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default BHeader;
