import { useState } from 'react';
import BHeader from './BHeader';
import BNavbar from './BNavbar';
import BSettings from './Settings/BSettings';
import BDeals from './Deals/BDeals';
import BContract from './Contract/BContract';
function Dashboard() {
  const [navigate, setNavigate] = useState('home');

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
      {/* Visited History here
       <div className="text-sm text-gray-500 mb-6">
          <span>Home</span> &gt; <span>Account</span> &gt;{' '}
          <span className="text-green-500">Settings</span>
        </div> */}
    </>
  );
}

export default Dashboard;
