import BDealsSection from './BDealsSection';
import { db } from '../../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

function BDeals() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedState, setSelectedState] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [landAreaRange, setLandAreaRange] = useState([0, 5000]);
  const [quantityRange, setQuantityRange] = useState([0, 1000]); // New quantity range state

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const farmersCollectionRef = collection(db, 'farmers');
        const querySnapshot = await getDocs(farmersCollectionRef);

        const contractsData = [];
        querySnapshot.forEach((doc) => {
          const farmerData = doc.data();
          if (farmerData.cropProduce) {
            contractsData.push({
              id: doc.id,
              name: doc.data().firstname,
              ...farmerData.cropProduce,
            });
          }
        });

        setDeals(contractsData);
        setFilteredDeals(contractsData); // Initially, all deals
      } catch (err) {
        console.error('Error fetching contracts:', err);
        alert('Failed to fetch contracts');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Filtering Logic
  useEffect(() => {
    const applyFilters = () => {
      const filtered = deals.filter((deal) => {
        const inPriceRange = deal.price >= priceRange[0] && deal.price <= priceRange[1];
        const inLandAreaRange = deal.landArea >= landAreaRange[0] && deal.landArea <= landAreaRange[1];
        const inQuantityRange = deal.quantity >= quantityRange[0] && deal.quantity <= quantityRange[1]; // New quantity filter
        const matchesState = selectedState === '' || deal.state === selectedState;

        return inPriceRange && inLandAreaRange && inQuantityRange && matchesState;
      });

      setFilteredDeals(filtered);
    };

    applyFilters();
  }, [deals, selectedState, priceRange, landAreaRange, quantityRange]); // Added quantityRange to dependencies

  // Handle state filter
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  // Handle price range filter
  const handlePriceRangeChange = (e) => {
    setPriceRange([0, parseInt(e.target.value, 10)]);
  };

  // Handle land area filter
  const handleLandAreaRangeChange = (e) => {
    setLandAreaRange([0, parseInt(e.target.value, 10)]);
  };

  // Handle quantity range filter
  const handleQuantityRangeChange = (e) => {
    setQuantityRange([0, parseInt(e.target.value, 10)]);
  };

  if (loading) {
    return <div className="text-center py-4 flex items-center h-full justify-center">
          <ReactLoading type={"spinningBubbles"} color={"#00b300"} height={'5%'} width={'5%'} />
    </div>;
  }

  return (
    <div className="flex px-4 py-6">
      {/* Sidebar Section */}
      <aside className="w-1/5 pr-4">
        {/* Filter by State */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">State</h2>
          <select className="px-4 py-2 border rounded" value={selectedState} onChange={handleStateChange}>
            <option value="">All States</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Punjab">Punjab</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Bihar">Bihar</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">Price Range</h2>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            className="w-full"
            onChange={handlePriceRangeChange}
          />
          <p className="mt-2">Up to ₹{priceRange[1]} per kg</p>
        </div>

        {/* Land Area Filter */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">Land Area</h2>
          <input
            type="range"
            min="0"
            max="5000"
            value={landAreaRange[1]}
            className="w-full"
            onChange={handleLandAreaRangeChange}
          />
          <p className="mt-2">Up to {landAreaRange[1]} sq.ft</p>
        </div>

        {/* Quantity Filter */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">Quantity</h2>
          <input
            type="range"
            min="0"
            max="1000"
            value={quantityRange[1]}
            className="w-full"
            onChange={handleQuantityRangeChange}
          />
          <p className="mt-2">Up to {quantityRange[1]} kg</p>
        </div>

        {/* Other filters (e.g., Rating) can go here */}
      </aside>

      {/* Deals Section */}
      <main className="w-3/4">
        {filteredDeals.length === 0 ? (
          <p>No Deals found.</p>
        ) : (
          <div className="w-full flex gap-2 flex-col">
            {filteredDeals.map((deal) => (
              <BDealsSection key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default BDeals;