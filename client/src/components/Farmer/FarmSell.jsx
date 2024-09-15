import styles from './FarmSell.module.css';
import cropData from './cropsData.json';
import { useState,useEffect } from 'react';
import { collection, addDoc, doc,setDoc} from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../context/auth_context';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from './FarmNav';

function Box({ crop, onCropSelect }) {
  return (
    <div className={styles['box-crop']} onClick={() => onCropSelect(crop)}>
      <img src={crop.imageUrl} alt={crop.name} />
      <div className={styles['radio-button']}>
        <label>
          <input
            type="radio"
            name="crop"
            value={crop.name}
            className={styles.rad}
            checked={false} // Remove the checked attribute to avoid radio button interference
            onChange={() => onCropSelect(crop)} // Update crop selection on radio button change
          />
          {' ' + crop.name}
        </label>
      </div>
    </div>
  );
}
function Details({ crops, setSelectedCrop, handleInputChange }) {
  return (
    <div className={styles['details-box']}>
      <div className={styles['image-box']}>
        {crops.map((crop, index) => (
          <Box
            key={index}
            crop={crop}
            onCropSelect={setSelectedCrop}
          />
        ))}
      </div>
      <div className={styles.formbox}>
        <h1>Details of Crop</h1>
        <div className={styles.form}>
          <div className={styles['form-group']}>
            <label htmlFor="quantity">Quantity of Crop (in kg)</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              onChange={handleInputChange}
              required
              min={0}
              step={1}
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="price">Selling Price (per kg)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter selling price"
              onChange={handleInputChange}
              required
              min={0}
              step={1}
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="landArea">Land Area (in acres)</label>
            <input
              type="number"
              id="landArea"
              name="landArea"
              placeholder="Enter land area"
              onChange={handleInputChange}
              required
              min={0}
              step={1}
            />
          </div>

          <div className={styles['form-group']} id={styles.itemsNeed}>
            <label htmlFor="items">Items Needed for Cultivation</label>
            <input
              type="text"
              id="items"
              name="items"
              placeholder="Enter items"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="location">Location of Farm</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              name="district"
              placeholder="Enter district"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter state"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter pincode"
              onChange={handleInputChange}
              required
              min={0}
              step={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const {currentUser} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(currentUser === null){
      navigate('/abc');
    }
  },[currentUser,navigate]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCrops, setFilteredCrops] = useState(cropData.crops);
  const [selectedCrop, setSelectedCrop] = useState(null);
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

  // const { currentUser } = useAuth();

  const handleSearch = () => {
    const filtered = cropData.crops.filter((crop) =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const rest = cropData.crops.filter(
      (crop) => !crop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCrops([...filtered, ...rest]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  // console.log(currentUser);
  const submitDetails = async () => {
    // Check if the user is logged in
    if (!currentUser) {
      toast.error('No user is logged in. Please log in to submit details.');
      return;
    }
  
    // Ensure a crop is selected
    if (!selectedCrop) {
      toast.error('Please select a crop.');
      return;
    }
    // console.log(currentUser);
    // Structure the data to be submitted as part of a map
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
      // Reference to the farmer's document
      const farmerDocRef = doc(db, 'farmers', currentUser.uid);
  
      // Use setDoc to update the farmer's document by merging cropProduce as a map
      await setDoc(
        farmerDocRef,
        {
          cropProduce: {
            ...cropData, // Use the crop name as a key and store the data
          } // Use the crop name as a key and store the data
          
        },
        { merge: true } // Merge to avoid overwriting existing data
      );
      
      toast.success('Crop details is submitted successfully!');
      // alert('Details submitted successfully!');
    // console.log(currentUser);

    } catch (e) {
      console.error('Error adding document: ', e);
      toast.error('Failed to submit details. Please try again.');
    }
  };
  
  const handleCropSelection = (crop) => {
    setSelectedCrop(crop);
    document.getElementById('details-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.divbody}>
      <Navbar />
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Details
        crops={filteredCrops}
        setSelectedCrop={handleCropSelection}
        handleInputChange={handleInputChange}
      />
      <div className={styles['submit-btn-div']}>
        <button id="details-section" className={styles['submit-button']} onClick={submitDetails}>
          Submit Details
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default FarmSell;
