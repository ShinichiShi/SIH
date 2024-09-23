import React, { useState } from "react";
import i1 from '../../assets/reshot-icon-laptop-speech-bubble-3FTBXEHGL2.svg';
import i2 from '../../assets/handshake3.svg';
import i3 from '../../assets/etoe.svg';
import i4 from '../../assets/reshot-icon-calendar-T8KE5NP7DR.svg'
import i5 from '../../assets/reshot-icon-envelope-FD2JGW9ELS.svg'

const CardCarousel = () => {
  const cards = [
    { id: 1,img:`${i1}`,title: "Guaranteed Market Access", content: "Connect with verified buyers and secure a steady market for your produce." },
    { id: 2, img:`${i2}`,title: "Transparent Negotiation", content: "Discuss terms in real-time and reach agreements with ease." },
    { id: 3, img:`${i3}`,title: "Secure Contracts", content: "Legal assurance with securely stored contracts." },
    { id: 4, img:`${i4}`,title: "Timely Payments", content: "Get paid on time, every time with our integrated payment system." },
    { id: 5, img:`${i5}`,title: "End-to-End Support", content: "From initial contact to final delivery, we ensure smooth transactions." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < 1) setCurrentIndex(currentIndex + 1); // Move forward (show the last 2 cards)
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1); // Move back to the first set (show the first 3 cards)
  };

  return (
    <div className="flex flex-col items-center w-full py-32 overflow-hidden bg-gradient-to-r from-yellow-100 to-green-500">
      <h1 className='font-bold text-center text-green-800 text-6xl bg-green-200 rounded-lg p-4 mb-8'>Why Choose KrishiSeva?</h1>
      {/* Cards container with transition */}
      <div
        className={`flex transition-transform duration-500 ease-in-out transform ${
          currentIndex === 0 ? "translate-x-0" : "-translate-x-1/3"
        }`}
        style={{ width: "75%" }} // Enough width to fit all cards
      >
        {/* First 3 cards */}
        <div className="flex">
  {cards.slice(0, 3).map((card) => (
    <div
      key={card.id}
      className="hover:scale-105 hover:shadow-lg transition transform duration-300 ease-in-out p-4 border rounded-lg shadow-md bg-green-200 w-72 h-72 flex flex-col justify-center items-center mx-2"
    >
      <img className='w-16 h-16' src={card.img} alt="" />
      <h2 className="text-lg font-bold mb-2 text-green-600">{card.title}</h2>
      <p className="text-center text-green-700 font-semibold">{card.content}</p>
    </div>
  ))}
</div>

        {/* Remaining 2 cards */}
        <div className="flex">
          {cards.slice(3).map((card) => (
            <div
              key={card.id}
              className="hover:scale-105 hover:shadow-lg transition transform duration-300 ease-in-out p-4 border rounded-lg shadow-md bg-green-200 w-72 h-72 flex flex-col justify-center items-center mx-2"
            >
                <img className='size-16' src={card.img} alt="" />
              <h2 className="text-lg font-bold mb-2 text-green-600">{card.title}</h2>
              <p className="text-center text-green-800 font-semibold">{card.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex space-x-4 mt-4">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABf0lEQVR4nO2asUrEQBCGPxURLCws5O5sbOysLH2F2Fj4Cj6Ber1n4Sv4Cj6BzYmdnZ0vYGFhIXincIo4sjqBIIgbk1x21/kgRWB2Z35mkszeHBiG8Ve2gSHwBEjL11hjycqKOA4gePnhGpTJhFswAfaBLu3TBQ40JvHNzIUaOxGhcaixuTL7lbEadwiPjsY28jHOazFUxDc+EzIlxDISGBJSRhaAo9iFbAE3FXxI20IWgRPgraIPaVOIa3tudd/XGIUsA6eFPa+BzdiE7AL3utcz0AfmavAh0xKyBpwX9rkE1mv0IU0LmQX2tKFz6x/0fqZGH40L2QCuCmvPgJWafTQqZF5rPz/w3AE7NftoXEjxw/aub6clHwcm5AsrrX/xsCf3+k3qg5hci5Jc05hUG5/cwSqpo25yPz5URUxIYIhlJNaMjNQwhJHbd1Y1tkc8GKqxm9mFRr/M6C1T44nO7Hq0T09FvGhs3mPqQaEWox1P52Sawnw4GuUfBgzD4JMPVpmXQuTAME0AAAAASUVORK5CYII="/>
          </button>
        )}
        {currentIndex < 1 && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABi0lEQVR4nO2aP07DMBSHP8qAxMDQAbVl6cLWiRuwEtZegRMA3VsGrtArcAKWIjY2LtAJRgYkWpBKhWpk9CxFSIjYquI/9SdZUZIX5/30HPslL5DJZFw5BSbAO6A8t7n4UtiKuArAefVHG9lEQl+wAM6BNv5pAxfik6oamTsx1iJC41J808PsX+Zi3CI8WuLbrIqxGYuhoqr6l4XUhMoR2cSIDIEdEhCigClw7Hh9UEJ0WwFjYM+xn2CELGX7LClPtEJ6wENp/wbYd+zTqxBNAziTdEIfe5X9Lce+vQkxdIHb0rl74NCxf69CDH3gRc5/AANge833qEWIpimzmbF7BI7WfI9ahBhOgKfSDHdtsZCqkIRodkXAl+VCqrIQCzZmaDVTeNj7sU+/3dgXxEYKKUovlaRxmUoav0rhxWqawqvuMJWPD3WgspDAUDkisUZkJoYhlNx+cyC+vVGBiRjrml1oDGxKb4UYL6Rm18E/HRHxKb5VLlOPSmMx2vK0oZAQmuJolD8MZDIZfvgGKYuXiAfJm2oAAAAASUVORK5CYII="/>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardCarousel;
