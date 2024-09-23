import React from 'react';
import { useNavigate } from 'react-router-dom';
import f1 from '../../assets/Screenshot_2024-09-15_125101-removebg-preview.png'

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
    <div className='sticky top-0 bg-gradient-to-r from-yellow-100 to-green-500 flex justify-between '>
        <div className='size-24 '>
            <img className='pt-4 ml-5'src={f1} alt="Logo" />

        </div>
        <div className='flex justify-end pt-3'>
        <ul className="flex">
  <li className="mt-6 ml-6 text-green-100 cursor-pointer font-semibold relative group" onClick={() => navigate('/')}>
    Home
    <span className="absolute left-0 bottom-6 w-full h-0.5 bg-green-100 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
  </li>
  
  <li className="mt-6 ml-6 mr-6 text-green-100 cursor-pointer font-semibold relative group" onClick={() => navigate('/contact')} >
    Contact us
    <span className="absolute left-0 bottom-6 w-full h-0.5 bg-green-100 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
  </li>
</ul>

            <select className='size-20 h-11 w-28 bg-green-400 m-4 rounded-md border-solid border-2 border-green-700 text-green-100 font-semibold p-2 hover:bg-green-100 hover:text-green-700 hover:duration-500  '>
                <option>Language</option>
                <option value="English">English</option>
                <option value='Kannada'>ಕನ್ನಡ</option>
                <option value="Hindi">हिन्दी</option>
            </select>
            <div>
               <button className=' hover:bg-green-100 hover:text-green-700 hover:duration-500 bg-green-400 border-solid border-2 border-green-700 rounded-md px-7 py-2 m-4 text-green-100 font-semibold ' onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    </div>


    </>
  )
}
