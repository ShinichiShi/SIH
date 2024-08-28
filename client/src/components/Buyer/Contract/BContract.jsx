import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { db } from '../../../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import ContractStatus from './ContractStatus';
export default function BContract() {
  const { currentUser } = useContext(AuthContext);
  const [contracts, setContracts] = useState([]); // Initialize state to store contracts

  useEffect(() => {
    const fetchDetails = async () => {
      if (currentUser) {
        const buyerRef = doc(db, 'buyers', currentUser.uid);
        const docSnap = await getDoc(buyerRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const contractsData = data.contracts
            ? Object.values(data.contracts)
            : []; // Convert map to array
          setContracts(contractsData); // Update state with contracts
        }
      }
    };

    fetchDetails(); // Fetch details on component mount
  }, [currentUser]);

  return (
    <div className="w-full h-[100vh] flex self-start justify-center">
  <div className="w-3/4 p-4 h-full shadow flex flex-col self-start items-start justify-start gap-2">
    <div className="font-bold text-xl self-start mb-2">Contract History :</div>
    <div className="w-full h-8 bg-slate-400 flex flex-row items-center justify-between px-4">
      <div className="flex-1 text-center">Date</div>
      <div className="flex-1 text-center">Total</div>
      <div className="flex-1 text-center">Status</div>
      <div className="flex-1 text-center">Details</div>
    </div>
    <div className="w-full flex flex-col items-start justify-start mt-2">
      {contracts.length > 0 ? (
        contracts.map((contract, index) => (
          <ContractStatus key={index} contract={contract} />
        ))
      ) : (
        <p className='flex-1 w-full flex text-center'>No contracts found</p>
      )}
    </div>
  </div>
</div>
  )
}
