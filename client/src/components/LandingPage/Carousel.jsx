import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import c1 from '../../assets/19.jpg'
import c2 from '../../assets/fb02b109-c16b-459e-97c3-904bf77f8503-1024x684.dm.edit_9SU1Ex.jpeg'

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: `${c1}`,
      title: 'Join with us as Farmer!',
      
      description: `Join us in contract farming! Grow your crops with our support, and we'll buy them at a guaranteed price. Let's grow together!`,
      ds:'farmersignup'
    },
    {
      id: 2,
      image: `${c2}`,
      title: 'Join with us as Buyer! ',
      
      description: `Partner with us in contract farming! Purchase high-quality crops directly from trusted farmers at agreed prices. Let's build a successful partnership together!`,
      ds: 'Signup'
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-full mx-auto h-screen">
      {/* Stationary Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-green-500 h-full w-full pb-48"></div>

      {/* Moving Content */}
      <div className="relative overflow-hidden h-5/6 ">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute transition-transform duration-1000 ease-in-out w-full h-full ${
              index === currentIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
          >
           <div className="absolute inset-0 flex flex-col items-center justify-center">
  <div className="h-96 w-4/5 bg-green-300 rounded-xl border-2 border-solid border-slate-300 shadow-lg flex items-center justify-between px-10 hover:scale-105 hover:shadow-lg transition transform duration-300 ease-in-out">
    
    {/* Wrap h1, p, and button in a flex-col div to stack them */}
    <div className="flex flex-col">
      <h1 className="font-bold text-6xl text-white drop-shadow-md">{slide.title}</h1>
      <p className="text-green-700 text-xl font-bold mt-4 mr-6">{slide.description}</p>
      <button className="font-semibold mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 w-28" onClick={() => navigate(`/${slide.ds}`)}>
        SignUp
      </button>
    </div>
    
    <img
      className="h-72 w-1/3 rounded-xl shadow-lime-500 shadow-2xl"
      src={slide.image}
      alt={slide.title}
    />
  </div>
</div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &lt;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
