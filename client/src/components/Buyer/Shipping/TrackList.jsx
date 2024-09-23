import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth_context';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ReactLoading from 'react-loading';
import TrackStatus from './TrackStatus';
const TrackList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        setError('user not authenticated');
        setLoading(false);
        return;
      }

      try {
        const buyerRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(buyerRef);

        if (docSnap.exists()) {
          const ordersData = docSnap.data().tracks || [];
          setOrders(ordersData);
        } else {
          setError('no buyer profile found');
        }
      } catch (err) {
        console.error('Error fetching contracts:', err);
        setError('failed_to_fetch_contracts');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="text-center py-4 flex items-center h-full justify-center">
        <ReactLoading type={'spinningBubbles'} color={'#00b300'} height={'5%'} width={'5%'} />
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }
console.log(orders)
  return (
    <div className="w-full p-4 h-full shadow rounded-4 flex flex-col self-start items-start justify-start gap-2">
      <div className="font-bold w-full text-xl flex self-start mb-2">
      Your Orders: 
      </div>
      {orders.length === 0 ? (
        <p>No orders Placed</p>
      ) : (
        <div className="w-full flex gap-1 flex-col">
          {orders
            .map((order) => (
              <TrackStatus key={order} order={order}/>
            ))}
        </div>
      )}
    </div>
  );
};

export default TrackList;
