import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Landing from './Landing.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Landing />
  </StrictMode>
);
