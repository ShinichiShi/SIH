import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import BHeader from './BHeader';
import { db } from '../../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import BNavbar from './BNavbar';
import BSettings from './Settings/BSettings';
import BDeals from './Deals/BDeals';
import BContract from './Contract/BContract';
import TrackList from './Shipping/TrackList';
import { getAuth } from 'firebase/auth';
import ReactLoading from 'react-loading';
function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigateRoute = useNavigate();
  const [navigate, setNavigate] = useState('settings');
  const auth = getAuth()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,async (user) => {
      const userRef = doc(db,'users', user.uid);
      const docSnap = await getDoc(userRef)
      if(docSnap.exists()){
        if(docSnap.data().profile.userType === 'buyer'){
          console.log('User is signed in');
        }
        else {
          // No user is signed in, redirect to signup or login page
          navigateRoute('/signup');
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
      <BNavbar handleNavigate={handleNavigate} navigate={navigate} />
      {navigate === 'settings' && <BSettings />}
      {navigate === 'deals' && <BDeals />}
      {navigate === 'contract' && <BContract />}
      {navigate === 'track' && <TrackList />}
    </>
  );
}

export default Dashboard;
