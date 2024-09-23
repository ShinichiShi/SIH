import  { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import ShippingTrackingUI from './ShippingTrackingUI';
import PropTypes from 'prop-types';
export default function TrackStatus({ order }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const userRef = doc(db, 'tracks', order);
        const docSnap = await getDoc(userRef);
  
        if (!docSnap.exists()) {
          toast.error("Order Not found");
          setDetails(null);
        } else {
          setDetails(docSnap.data());
        }
      } catch (error) {
        toast.error('Error fetching order status');
        console.error('Error fetching order status in Firebase:', error);
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [order]);

  if (loading) {
    return <div className="w-full h-12 bg-gray-200 flex items-center justify-center">Loading...</div>;
  }

  if (!details) {
    return <div className="w-full h-12 bg-red-200 flex items-center justify-center">Order not found</div>;
  }

  const { formDataWithOrderId, responseForm } = details;

  return (
    <div className="w-full">
      {/* Order Row */}
      <div className="w-full h-12 bg-green-200 flex flex-row items-center px-4 mb-2">
        <div className="flex-1 text-center">
          #{formDataWithOrderId?.order_id || 'N/A'}
        </div>
        <div className="flex-1 text-center">
          {formDataWithOrderId?.pickup_name || 'N/A'}
        </div>
        <div className="flex-1 text-center">
          {responseForm?.status_code==1?'Initiated':responseForm?.status || 'N/A'}
        </div>
        <div
          className="flex-1 text-center text-green-800 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          View Details
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex w-full items-center justify-center z-50">
          <div className="absolute w-full inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 w-full max-w-4xl rounded-lg shadow-lg z-10 overflow-y-auto max-h-[90vh]">
            <ShippingTrackingUI order={details} />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

TrackStatus.propTypes = {
    order:PropTypes.string.isRequired
}