import { useState, useEffect } from 'react';
import styles from './FarmSell.module.css';
import { useNavigate } from 'react-router-dom';
import { getDoc,doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../../../../../firebase';
import { useAuth } from '../../../context/auth_context';
import Details from './Details';
import DetailsPopup from './DetailsPopup';
import cropData from '../../cropsData.json';
import PropTypes from 'prop-types';
function Search({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className={styles['search-box']}>
      <div className={styles['search-box-div']}>
        <p>Search by crops:</p>
        <div className={styles['search-bar']}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter crop's name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={'#000000'}
              fill={'none'}
            >
              <path
                d="M17.5 17.5L22 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function FarmSell() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate('/abc');
    }
  }, [currentUser, navigate]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCrops, setFilteredCrops] = useState(cropData.crops);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [formData, setFormData] = useState({
    quantity: '',
    price: '',
    landArea: '',
    items: '',
    location: '',
    district: '',
    state: '',
    pincode: '',
  });

  const handleSearch = () => {
    const filtered = cropData.crops.filter((crop) =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const rest = cropData.crops.filter(
      (crop) => !crop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(rest);
    console.log(filtered);
    setFilteredCrops([...filtered]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitDetails = async () => {
    if (!currentUser) {
      toast.error('No user is logged in. Please log in to submit details.');
      return;
    }

    if (!selectedCrop) {
      toast.error('Please select a crop.');
      return;
    }

    const cropData = {
      cropName: selectedCrop.name,
      quantity: formData.quantity,
      price: formData.price,
      landArea: formData.landArea,
      items: formData.items,
      location: formData.location,
      district: formData.district,
      state: formData.state,
      pincode: formData.pincode,
    };

    try {
      const farmerDocRef = doc(db, 'users', currentUser.uid);

      // Get the current user's document
      const farmerDoc = await getDoc(farmerDocRef);

      let updatedCropProduce = {};

      if (farmerDoc.exists()) {
        // If the document exists, get the current cropProduce data
        const currentCropProduce = farmerDoc.data().cropProduce || {};

        // Use the crop name as the ID
        const cropId = cropData.cropName;

        if (currentCropProduce[cropId]) {
          // If the crop already exists, update its details
          updatedCropProduce = {
            ...currentCropProduce,
            [cropId]: {
              ...currentCropProduce[cropId],
              ...cropData,
            },
          };
        } else {
          // If it's a new crop, add it to the existing crops
          updatedCropProduce = {
            ...currentCropProduce,
            [cropId]: cropData,
          };
        }
      } else {
        // If the document doesn't exist, create a new cropProduce object
        updatedCropProduce = {
          [cropData.name]: cropData,
        };
      }

      // Update the document with the new or updated crop data
      await setDoc(
        farmerDocRef,
        { cropProduce: updatedCropProduce },
        { merge: true }
      );

      toast.success('Crop details submitted successfully!');
      setShowDetailsPopup(false);
      setFormData({
        quantity: '',
        price: '',
        landArea: '',
        items: '',
        location: '',
        district: '',
        state: '',
        pincode: '',
      });
    } catch (e) {
      console.error('Error adding document: ', e);
      toast.error('Failed to submit details. Please try again.');
    }
  };
  const handleCropSelection = (crop) => {
    setSelectedCrop(crop);
    setShowDetailsPopup(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800"></h1>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Details crops={filteredCrops} setSelectedCrop={handleCropSelection} />
      {showDetailsPopup && (
        <DetailsPopup
          crop={selectedCrop}
          formData={formData}
          handleInputChange={handleInputChange}
          onClose={() => setShowDetailsPopup(false)}
          onSubmit={submitDetails}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default FarmSell;
Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
