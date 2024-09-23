import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import f1 from '../../assets/Screenshot_2024-09-15_125101-removebg-preview.png'

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="flex justify-between items-center py-6 px-8 bg-green-700 text-gray-300">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-white">
        <img src={f1} className='h-2/5 w-2/5' alt="" />
      </div>

      {/* Center: Navigation Links */}
      <div className='pt-8'>
        <div className='text-center'>
        <h3 className='font-bold mb-2 justify-center'>Links</h3></div>
        <hr />
        <ul className='flex flex-row justify-center'>
            <li className='m-2 font-medium cursor-pointer' onClick={() => navigate('/')}>Home</li>
            
            <li className='m-2 font-medium cursor-pointer' onClick={() => navigate('/contact')}>Contact</li>
            
        </ul>
        
      </div>

      {/* Right: Social Media Icons */}
      <div className="flex space-x-4">
        <a href="https://facebook.com" className="hover:text-white">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" className="hover:text-white">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" className="hover:text-white">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
