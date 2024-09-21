import { useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import MultiAgriConnect from '../../../contractAddress/MultiAgriConnect.json';
import PropTypes from 'prop-types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/auth_context';
import { db } from '../../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function Metamask({ formData, setFormData, setFlag }) {
  const { currentUser } = useContext(AuthContext);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [currentId, setCurrentId] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractInstance = new web3Instance.eth.Contract(
            MultiAgriConnect.abi,
            MultiAgriConnect.networks[5777].address
          );
          setContract(contractInstance);

          setFormData(prevData => ({ ...prevData, buyerId: accounts[0] }));

          // Fetch user data from Firestore if available
          if (currentUser) {
            const buyerRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(buyerRef);
            const data = docSnap.data();
            if (docSnap.exists()) {
              setFormData(prevData => ({
                ...prevData,
                buyerName: `${data.profile.displayName} ${data.profile.lname}`
              }));
            }
          }
        } catch (error) {
          toast.error('User denied account access', error.message);
        }
      } else {
        toast.error('Please install MetaMask!');
      }
    };

    const handleAccountChange = (accounts) => {
      if (accounts.length > 0 && accounts[0] !== account) {
        setAccount(accounts[0]);
        setFormData(prevData => ({ ...prevData, buyerId: accounts[0] }));
        toast.info('Account changed.');
      } else if (accounts.length === 0) {
        toast.error('No account detected');
      }
    };

    initWeb3();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
      }
    };
  }, [currentUser, setFormData,account]);

  const handleCreateContract = async () => {
    try {
      const result = await contract.methods
        .createContract(
          formData.farmerId,
          formData.crop,
          web3.utils.toWei(formData.totalAmt.toString(), 'wei'),
          web3.utils.toWei(formData.installmentAmt.toString(), 'wei')
        )
        .send({ from: account });

      const newContractId = result.events.ContractCreated.returnValues.contractId;
      setCurrentId(newContractId);

      const buyerRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(buyerRef);

      if (!docSnap.exists()) {
        toast.error('Kindly fill in your details at profile page');
        return;
      }

      const existingContracts = docSnap.data().contracts || [];
      const newContract = {
        contractId: newContractId.toString(),
        farmerId: formData.farmerId || 'Unknown',
        farmerName: formData.farmerName || 'Unknown',
        crop: formData.crop || 'Unknown',
        totalAmt: formData.totalAmt.toString() || '0',
        installmentAmt: formData.installmentAmt.toString() || '0',
        status: 'Created',
        date: formData.date,
        buyerName: formData.buyerName,
        buyerId: formData.buyerId,
        location: formData.location,
        createdAt: new Date().toISOString(),
      };

      const updatedContracts = [...existingContracts, newContract];

      await setDoc(
        buyerRef,
        { contracts: updatedContracts },
        { merge: true }
      );
      toast.success(`Contract created with ID: ${newContractId}`);
    } catch (error) {
      console.error('Error creating contract:', error);
      toast.error('Failed to create contract. Please try again.');
    }
  };

  const handleSignContract = async () => {
    try {
      await contract.methods.signContract(currentId).send({ from: account });

      const buyerRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(buyerRef);

      if (!docSnap.exists()) {
        toast.error('Buyer profile not found');
        return;
      }

      const existingContracts = docSnap.data().contracts || [];
      const updatedContracts = existingContracts.map((contract) => 
        contract.contractId === currentId.toString() 
          ? { ...contract, status: 'Signed' } 
          : contract
      );

      await setDoc(
        buyerRef,
        { contracts: updatedContracts },
        { merge: true }
      );
      setFlag(true);
      toast.success(`Contract with ID ${currentId} has been signed and updated in the database.`);
    } catch (error) {
      console.error('Error signing contract:', error);
      toast.error('Failed to sign contract. Please try again.');
    }
  };

  return (
    <div className="p-4">
      {t('connected_metamask_address', { account })}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{t('create_contract')}</h2>
        <button
          onClick={handleCreateContract}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {t('create_contract_button')}
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{t('sign_contract')}</h2>
        <p>{t('sign_contract_confirmation')}</p>
        <button
          onClick={handleSignContract}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {t('sign_button')}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

Metamask.propTypes = {
  formData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    farmerName: PropTypes.string.isRequired,
    farmerId: PropTypes.string.isRequired,
    buyerName: PropTypes.string.isRequired,
    buyerId: PropTypes.string.isRequired,
    crop: PropTypes.string.isRequired,
    totalAmt: PropTypes.number.isRequired,
    installmentAmt: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
  }),
  setFormData: PropTypes.func.isRequired,
  setFlag:PropTypes.func.isRequired
};