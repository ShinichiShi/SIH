import { FaSearch } from 'react-icons/fa';
import { MdOutlineTranslate } from 'react-icons/md';
import { IoIosArrowDropdown ,IoIosArrowDropup } from "react-icons/io";
import { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom'

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
  
  return (
    <header className="w-full font-sans">
      <div className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          <div className="text-green-500 text-2xl font-bold">AgriConnect</div>
          <div className="flex-grow mx-8">
            <div className="flex">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 rounded-l"
              />
              <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-r flex items-center justify-center gap-4">
                <FaSearch />
                Search
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4">
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
              <button className="px-4 py-2 border rounded-lg bg-green-500 hover:bg-green-600 text-white" onClick={()=>{navigate('/login')}}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default BHeader;
