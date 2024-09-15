import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth_context';
import { db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ContractStatus from './ContractStatus';
import { useTranslation } from 'react-i18next';

const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation(); // Initialize translation function

  useEffect(() => {
    const fetchContracts = async () => {
      if (!currentUser) {
        setError(t('user_not_authenticated'));
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
          setError(t('no_buyer_profile_found'));
        }
      } catch (err) {
        console.error('Error fetching contracts:', err);
        setError(t('failed_to_fetch_contracts'));
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [currentUser,t]);

  if (loading) {
    return <div className="text-center py-4">{t('loading_contracts')}....</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full p-4 h-full shadow rounded-4 flex flex-col self-start items-start justify-start gap-2">
      <div className="font-bold w-full text-xl flex self-start mb-2">
      {t('your_contracts')}
      </div>
      {contracts.length === 0 ? (
        <p>{t('no_contracts_found')}</p>
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
