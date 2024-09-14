import { MdOutlineTranslate } from 'react-icons/md';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function BHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    console.log('enter');
    try {
      await signOut(auth);
      console.log('hello');
      toast.success('Logged Out');
      navigate('/login');
    } catch (error) {
      toast.error('Error signing out:', error);
    }
  };
  return (
    <div className="h-20 font-sans">
      <div className="bg-white h-full shadow flex w-full">
        <div className=" w-full flex justify-between items-center  px-4">
          <div className="text-green-500 text-2xl font-bold">KrishiSeva</div>

          <div>
            <div className="flex items-center justify-center gap-4">
              <div ref={dropdownRef} className="relative">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="cursor-pointer flex items-center justify-center gap-2 hover:bg-slate-300 p-2 rounded"
                >
                  <MdOutlineTranslate />
                  Eng
                  {dropdownOpen ? <IoIosArrowDropdown /> : <IoIosArrowDropup />}
                </div>
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-24 bg-white border rounded shadow-md">
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-slate-100 cursor-pointer">
                        English
                      </li>
                      <li className="px-4 py-2 hover:bg-slate-100 cursor-pointer">
                        Kannada
                      </li>
                      <li className="px-4 py-2 hover:bg-slate-100 cursor-pointer">
                        Hindi
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="py-2 px-2 border rounded-lg flex items-center justify-center bg-green-500 hover:bg-green-600 text-white"
                onClick={handleLogout}
              >
                Logout
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
