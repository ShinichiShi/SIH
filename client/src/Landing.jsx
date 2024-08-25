import { useState } from 'react';
import Profilesetup from './components/Profilesetup';

import './App.css';
function Landing() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Profilesetup/>
    </>
  );
}

export default Landing;
