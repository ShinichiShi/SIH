import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ContractStatus from './ContractStatus';

const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchContracts = async () => {
      if (!currentUser) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const buyerRef = doc(db, 'buyers', currentUser.uid);
        const docSnap = await getDoc(buyerRef);

        if (docSnap.exists()) {
          const contractsData = docSnap.data().contracts || [];
          setContracts(contractsData);
        } else {
          setError('No buyer profile found');
        }
      } catch (err) {
        console.error('Error fetching contracts:', err);
        setError('Failed to fetch contracts');
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [currentUser]);

  if (loading) {
    return <div className="text-center py-4">Loading contracts...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full p-4 h-full shadow rounded-4 flex flex-col self-start items-start justify-start gap-2">
      <div className="font-bold w-full text-xl flex self-start mb-2">
        Your Contracts
      </div>
      {contracts.length === 0 ? (
        <p>No contracts found.</p>
      ) : (
        <div className="w-full flex gap-1 flex-col">
          {contracts
            .sort((a, b) => b.contractId - a.contractId) // Sort contracts by contractId in decreasing order
            .map((contract) => (
              <ContractStatus key={contract.contractId} contract={contract} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ContractList;
