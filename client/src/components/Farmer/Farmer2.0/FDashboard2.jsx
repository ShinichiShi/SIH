import FNavbar from './FNavbar';
import BHeader from '../../Buyer/BHeader';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import ReactLoading from 'react-loading';
import FarmSell from './Sell Crops/FarmSell';
import FSettings from './Settings/FSettings';
import MainBox from './Explore/MainBox';
export default function FDashboard2() {
  const [loading, setLoading] = useState(true);
  const navigateRoute = useNavigate();
  const [navigate, setNavigate] = useState('settings');
  const auth = getAuth()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,async (user) => {
      const userRef = doc(db,'users', user.uid);
      const docSnap = await getDoc(userRef)
      if(docSnap.exists()){
        if(docSnap.data().profile.userType === 'farmer'){
          console.log('User has signed in');
        }
        else {
          // No user is signed in, redirect to signup or login page
          navigateRoute('/farmerlogin');
        }
      }
      setLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth, navigateRoute]);
  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ReactLoading type={'spinningBubbles'} color={'#00b300'} height={'5%'} width={'5%'} />
      </div>
    );
  }
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
