import { FaLeaf } from 'react-icons/fa';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
function DealerCard({ dealer }) {
    const navigate = useNavigate();
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex gap-6">
        {/* Icon Section */}
        <div className="bg-green-100 p-4 rounded-full">
          <FaLeaf className="text-green-500 text-3xl" />
        </div>
  
        {/* Details Section */}
        <div className="flex-grow grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h2 className="font-bold text-xl text-gray-800 mb-2">
            {dealer.profile?.displayName || 'N/A'} {dealer.profile?.lname || ''}
            </h2>
          </div>
          <div className="w-full flex">
            <div className="w-full">
              <p className="text-gray-600 mb-1">
                <span className="font-medium">
                  <strong>Phone:</strong>
                </span>{' '}
                {dealer.profile?.phone || 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">
                  <strong>Email:</strong>
                </span>{' '}
                {dealer.profile?.email || 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">
                  <strong>Gender:</strong>
                </span>{' '}
                {dealer.profile?.gender || 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">
                  <strong>Crops:</strong>
                </span>{' '}
                {dealer.profile?.crop || 'N/A'}
              </p>
            </div>
  
            <div className="w-full">
              <p className="text-gray-600 mb-1">
                <span className="font-medium">
                  <strong>Address:</strong>
                </span>{' '}
                {dealer.address?.addr1 || 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">
                  <strong>Languages Known: </strong>
                </span>{' '}
                {dealer.profile?.languages || 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">
                  <strong>State:</strong>
                </span>{' '}
                {dealer.address?.state || 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">
                  <strong>Country:</strong>
                </span>{' '}
                {dealer.address?.country || 'N/A'}
              </p>
            </div>
          </div>
        </div>
  
        {/* CTA Button */}
        <div className="  items-end">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
            onClick={() => navigate('/chat', { state: { uid: dealer.profile?.uid, userType: 'farmer' } })}
          >
            <IoChatbubblesSharp />
            Negotiate
          </button>
        </div>
      </div>
    );
  }
  
  export default DealerCard;
 
  DealerCard.propTypes = {
    dealer: PropTypes.shape({
      profile: PropTypes.shape({
        displayName: PropTypes.string,
        lname: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        uid: PropTypes.string,
        gender:PropTypes.string,
        crop:PropTypes.string,
        languages:PropTypes.string
      }),
      bank: PropTypes.shape({
        bank_name: PropTypes.string,
      }),
      address: PropTypes.shape({
        addr1: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string,
      }),
    }).isRequired,
  };
  