import { useState } from 'react';
import Profilesetup from './components/Profilesetup';

import './App.css';
import Signup from './components/Buyer/Signup';
import Login from './components/Buyer/Login';
function Landing() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Signup/>
      <Profilesetup/>
    </>
  );
}

export default Landing;
