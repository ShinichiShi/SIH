import BDealsSection from './BDealsSection';
import { db } from '../../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';

function BDeals() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Filter States
  const [selectedState, setSelectedState] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [landAreaRange, setLandAreaRange] = useState([0, 5000]);
  const [quantityRange, setQuantityRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const farmersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(farmersCollectionRef);

        const contractsData = [];
        querySnapshot.forEach((doc) => {
          const farmerData = doc.data();
          if (farmerData.cropProduce) {
            Object.keys(farmerData.cropProduce).forEach((cropName) => {
              contractsData.push({
                id: doc.id,
                name: farmerData.profile.firstname,
                [cropName]: farmerData.cropProduce[cropName]
              });
            });
          }
        });

        setDeals(contractsData);
        setFilteredDeals(contractsData);
      } catch (err) {
        console.error('Error fetching contracts:', err);
        alert('Failed to fetch contracts');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = deals.filter((deal) => {
        const cropName = Object.keys(deal).find(key => typeof deal[key] === 'object');
        if (!cropName) {
          console.warn('No crop details found for deal:', deal);
          return false;
        }
        const cropDetails = deal[cropName];

        if (!cropDetails) {
          console.warn('Crop details are undefined for deal:', deal);
          return false;
        }        
        const inPriceRange =
          parseInt(cropDetails.price) >= priceRange[0] && parseInt(cropDetails.price) <= priceRange[1];
        const inLandAreaRange =//
          parseInt(cropDetails.landArea) >= landAreaRange[0] && parseInt(cropDetails.landArea) <= landAreaRange[1];
        const inQuantityRange =
          parseInt(cropDetails.quantity) >= quantityRange[0] && parseInt(cropDetails.quantity) <= quantityRange[1];
        const matchesState =
          selectedState === '' || (cropDetails.state && cropDetails.state.toUpperCase() === selectedState.toUpperCase());
        return inPriceRange && inLandAreaRange && inQuantityRange && matchesState;
      });
  
      setFilteredDeals(filtered);
    };
  
    applyFilters();
  }, [deals, selectedState, priceRange, landAreaRange, quantityRange]);
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange([0, parseInt(e.target.value, 10)]);
  };

  const handleLandAreaRangeChange = (e) => {
    setLandAreaRange([0, parseInt(e.target.value, 10)]);
  };

  const handleQuantityRangeChange = (e) => {
    setQuantityRange([0, parseInt(e.target.value, 10)]);
  };

  if (loading) {
    return (
      <div className="text-center py-4 flex items-center h-full justify-center">
        <ReactLoading type={'spinningBubbles'} color={'#00b300'} height={'5%'} width={'5%'} />
      </div>
    );
  }

  return (
    <div className="flex px-4 py-6">
      {/* Sidebar Section */}
      <aside className="w-1/5 pr-4">
        {/* Filter by State */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">{t('state')}</h2>
          <select
            className="px-4 py-2 border rounded"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">{t('all_states')}</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Punjab">Punjab</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Bihar">Bihar</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">{t('price_range')}</h2>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            className="w-full"
            onChange={handlePriceRangeChange}
          />
          <p className="mt-2">
            {t('up_to')} ₹{priceRange[1]} {t('per_kg')}
          </p>
        </div>

        {/* Land Area Filter */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">{t('land_area')}</h2>
          <input
            type="range"
            min="0"
            max="5000"
            value={landAreaRange[1]}
            className="w-full"
            onChange={handleLandAreaRangeChange}
          />
          <p className="mt-2">
            {t('up_to')} {landAreaRange[1]} {t('sq_ft')}
          </p>
        </div>

        {/* Quantity Filter */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">{t('quantity')}</h2>
          <input
            type="range"
            min="0"
            max="1000"
            value={quantityRange[1]}
            className="w-full"
            onChange={handleQuantityRangeChange}
          />
          <p className="mt-2">
            {t('up_to')} {quantityRange[1]} kg
          </p>
        </div>
      </aside>

      {/* Deals Section */}
      <main className="w-3/4">
        {filteredDeals.length === 0 ? (
          <p>{t('no_deals_found')}.</p>
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