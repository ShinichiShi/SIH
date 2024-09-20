import FNavbar from './FNavbar';
import BHeader from '../../Buyer/BHeader';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth_context';
import FarmSell from './Sell Crops/FarmSell';
import FSettings from './Settings/FSettings';
import MainBox from './Explore/MainBox';
export default function FDashboard2() {
  const navigateRoute = useNavigate();
  const [navigate, setNavigate] = useState('settings');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser === null) {
      navigateRoute('/farmerlogin');
    }
  }, [currentUser, navigateRoute]);

  const handleNavigate = (key) => {
    setNavigate(key);
  };
  return (
    <>
      <BHeader />
      <FNavbar handleNavigate={handleNavigate} navigate={navigate} />
      {navigate === 'explore' && <MainBox />}
      {navigate === 'settings' && <FSettings />}
      {navigate === 'sell_crops' && <FarmSell />}
    </>
  );
}
