import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BHeader from './BHeader';
import BNavbar from './BNavbar';
import BSettings from './Settings/BSettings';
import BDeals from './Deals/BDeals';
import BContract from './Contract/BContract';
import { AuthContext } from '../context/auth_context';
function Dashboard() {
  const navigateRoute = useNavigate();
  const [navigate, setNavigate] = useState('settings');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser === null) {
      navigateRoute('/signup');
    }
  }, [currentUser, navigateRoute]);

  const handleNavigate = (key) => {
    setNavigate(key);
  };
  return (
    <>
      <BHeader />
      <BNavbar handleNavigate={handleNavigate} navigate={navigate} />

      {navigate === 'settings' && <BSettings />}
      {navigate === 'deals' && <BDeals />}
      {navigate === 'contract' && <BContract />}
    </>
  );
}

export default Dashboard;
