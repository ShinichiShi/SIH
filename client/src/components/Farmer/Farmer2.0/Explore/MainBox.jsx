import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../../firebase';

import ReactLoading from 'react-loading';

import DealerCard from './DealerCard';
function MainBox() {
  const [dealers, setDealers] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedState, setSelectedState] = useState('');
  const [cropSearch, setCropSearch] = useState('');

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const buyersList = usersSnapshot.docs
          .map((doc) => doc.data())
          .filter((user) => user.profile?.userType === 'buyer');
        setDealers(buyersList);
        setFilteredDealers(buyersList);
      } catch (error) {
        console.error('Error fetching buyers data: ', error);
        alert('Failed to fetch buyers data');
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);
  useEffect(() => {
    const applyFilters = () => {
      const filtered = dealers.filter((dealer) => {
        const matchesState =
          selectedState === '' || dealer.address?.state === selectedState;
        const matchesCrop =
          cropSearch === '' ||
          (dealer.profile?.crop &&
            dealer.profile.crop
              .toLowerCase()
              .includes(cropSearch.toLowerCase()));

        return matchesState && matchesCrop;
      });

      setFilteredDealers(filtered);
    };

    applyFilters();
  }, [dealers, selectedState,cropSearch]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };
  const handleCropSearchChange = (e) => {
    setCropSearch(e.target.value);
  }

  if (loading) {
    return (
      <div className="text-center py-4 flex items-center h-full justify-center">
        <ReactLoading
          type={'spinningBubbles'}
          color={'#00b300'}
          height={'5%'}
          width={'5%'}
        />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex px-4 py-6 flex-grow">
        {/* Sidebar Section */}
        <aside className="w-1/5 pr-4">
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-4">State</h2>
            <select
              className="px-4 py-2 border rounded w-full"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">All States</option>  
              <option value="Maharashtra">Maharashtra</option>
              <option value="Punjab">Punjab</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Bihar">Bihar</option>
            </select>
          </div>
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-4">Search Crop</h2>
            <input
              type="text"
              className="px-4 py-2 border rounded w-full"
              value={cropSearch}
              onChange={handleCropSearchChange}
              placeholder="Enter crop name"
            />
          </div>
        </aside>

        {/* Dealers Section */}
        <main className="w-3/4">
          {filteredDealers.length === 0 ? (
            <p>No Dealers Found.</p>
          ) : (
            <div className="w-full flex gap-2 flex-col">
              {filteredDealers.map((dealer) => (
                <DealerCard key={dealer.profile?.uid} dealer={dealer} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default MainBox;
