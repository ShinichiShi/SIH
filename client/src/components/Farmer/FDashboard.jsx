import styles from './FDashboard.module.css';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';  // Import your firebase configuration
import Navbar from '../Farmer/Farmer1.0/FarmNav';
import { useAuth } from '../context/auth_context';
import { useNavigate } from 'react-router-dom';



function Box({ data, showSecondaryBox }) {
  return (
    <div className={styles['box-primary']}>
      <div className={styles['primary-details']}>
        <p>{data.profile?.displayName || 'N/A'} {data.profile?.lname || ''}</p>
        <p>Phone: {data.profile?.phone || 'N/A'}</p>
        <p className={styles.emu}>Email : {data.profile?.email || 'N/A'}</p>
        <p>State: {data.address?.state || 'N/A'}</p>
      </div>
      <div className={styles['primary-btn']}>
        <button onClick={() => showSecondaryBox(data)}>Show more details</button>
      </div>
    </div>
  );
}


function Secondarybox({ data, hideSecondaryBox }) {

  const {currentUser} = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles['box-sec']}>
      <h3>Details:</h3>
      <div className={styles.crossbtn}>
        <button onClick={hideSecondaryBox}>✕</button>
      </div>
      <div className={styles['sec-details']}>
        <div className={styles.secImgbox}>
          <img className={styles.secImg} src={data.profile?.photoUrl || "https://freesvg.org/img/abstract-user-flat-4.png" } alt="photo" />
        </div>
        <p>Name : {data.profile?.displayName || 'N/A'} {data.profile?.lname || ''}</p>
        <p>Company Name : {data.address?.companyName || 'N/A'}</p>
        <p>Phone : {data.profile?.phone || 'N/A'}</p>
        <p>Email : {data.profile?.email || 'N/A'}</p>
        <p>Address 1 : {data.address?.addr1}</p>
        <p>Address 2 : {data.address?.addr2}</p>
        <p>State : {data.address?.state}</p>
        <p>Country : {data.address?.country}</p>
        <p>Bank: {data.bank?.bank_name || 'N/A'}</p>

        <div className={styles.contractBtn}>
          <button onClick={() => navigate('/chat', { state: { uid: data.profile?.uid, userType: 'farmer' } })}>Negotiate</button>
        </div>
      </div>
    </div>
  );
}


function MainBox({searchQuery}) {
  const [showBox, setShowBox] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dealers, setDealers] = useState([]);
  // const [searchQuery,setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        // Reference to the 'buyers' collection in Firestore
        const dealersCollection = collection(db, 'buyers');
        const dealersSnapshot = await getDocs(dealersCollection);
        const dealersList = dealersSnapshot.docs.map(doc => doc.data());
        setDealers(dealersList);  // Store fetched data in state
      } catch (error) {
        console.error("Error fetching buyers data: ", error);
      }
    };

    fetchDealers();  // Fetch the data when the component mounts
  }, []);

  // const handleSearch = (event) => {
  //   setSearchQuery(event.target.value);
  // }

  const filteredDealers = dealers.sort((a, b) => {
    const stateA = a.address?.state?.toLowerCase() || '';
    const stateB = b.address?.state?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();

    // If state matches the search query, it will appear first
    if (stateA.includes(query) && !stateB.includes(query)) {
      return -1; // a comes before b
    }
    if (!stateA.includes(query) && stateB.includes(query)) {
      return 1; // b comes before a
    }
    return 0; // otherwise, maintain the same order
  });

  const showSecondaryBox = (data) => {
    setSelectedData(data);
    setShowBox(true);
  };

  const hideSecondaryBox = () => setShowBox(false);

  return (
    <div className={styles['container-p']}>
      <h1>DEALERS</h1>
      <div className={styles['container-s']}>
        {filteredDealers.map((dealer, index) => (
          <Box key={index} data={dealer} showSecondaryBox={showSecondaryBox} />
        ))}
      </div>
      {showBox && selectedData && (
        <div className={styles.modal}>
          <Secondarybox data={selectedData} hideSecondaryBox={hideSecondaryBox} />
        </div>
      )}
    </div>
  );
}

function Search({handleSearch}) {
  return (
    <div className={styles['search-box']}>
      {/* <div className={styles['search-box-div']}>
        <p>Search by crops:</p>
        <div className={styles['search-bar']}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter crop's name"
          />
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
        </div>
      </div> */}
      <div className={styles['search-box-div']}>
        <p>{`Search by State:`}</p>
        <div className={styles['search-bar']}>
          <input type="text" name="search" id="search" placeholder="Enter State name" onChange={handleSearch} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
            <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FDashboard() {
  const [searchQuery,setSearchQuery] = useState('');
  const {currentUser} = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if(currentUser === null){
  //     navigate('/abc');
  //   }
  // },[currentUser,navigate]);

  return (
    <div className={styles.dashbody}>
      <Navbar />
      <Search handleSearch={(e) => setSearchQuery(e.target.value)} />
      <MainBox searchQuery={searchQuery} />
    </div>
  );
}

export default FDashboard;
