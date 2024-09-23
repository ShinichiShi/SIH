import React, { useEffect, useState } from "react";

const CounterCard = ({title,desp}) => {
    

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      if (start <= 100) {
        setCount(start);
        start++;
      } else {
        clearInterval(interval);
      }
    }, 15); // 100 counts over 1 second (1000ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-green-200 shadow-lg rounded-lg p-6 w-64 m-8 hover:scale-105 hover:shadow-lg transition transform duration-300 ease-in-out">
      <h3 className="text-xl text-center font-bold text-green-500">{title}</h3>
      <p className="text-4xl  text-center text-green-500 font-bold mt-4">{count}</p>
      <p className="mt-2  text-center text-green-500 font-semibold">
        {desp}
      </p>
    </div>
  );
};

const ThreeCards = () => {
  return (
    <div className="min-h-48 bg-gradient-to-r from-yellow-100 to-green-500 flex flex-col justify-center items-center">
      <h1 className='font-bold text-center text-green-800 text-6xl bg-green-200 rounded-lg p-4 mb-8'>Users Connected to our PLatform</h1>
      <div className="flex flex-wrap justify-center">
        <CounterCard title="Farmers Regd." desp="100 Farmers Regd. Successfully"/>
        <CounterCard title="Buyers Regd." desp="100 Buyers Regd. Successfully"/>
        <CounterCard title="Users Regd." desp="100 Users Registered Successfully"/>
      </div>
    </div>
  );
};

export default ThreeCards;
