import { useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import MultiAgriConnect from '../../../contractAddress/MultiAgriConnect.json';
import PropTypes from 'prop-types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/auth_context';
import { db } from '../../../../firebase';
import { ToastContainer, toast } from 'react-toastify';

export default function Metamask({ formData }) {
  const { currentUser } = useContext(AuthContext);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);

          // Get accounts
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Initialize the contract
          const contractInstance = new web3Instance.eth.Contract(
            MultiAgriConnect.abi,
            MultiAgriConnect.networks[5777].address
          );
          setContract(contractInstance);

          // Set buyer details in formData
          formData.buyerId = accounts[0];
        } catch (error) {
          toast.error('User denied account access', error.message);
        }
      } else {
        toast.error('Please install MetaMask!');
      }

      // Fetch user data from Firestore if available
      if (currentUser) {
        const buyerRef = doc(db, 'buyers', currentUser.uid);
        const docSnap = await getDoc(buyerRef);
        const data = docSnap.data();
        if (docSnap.exists()) {
          formData.buyerName =
            data.profile.displayName + ' ' + data.profile.lname;
        }
      }
    };

    // Handle account changes and reload window
    const handleAccountChange = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        window.location.reload(); // Reload the page when the account changes
      } else {
        toast.error('No account detected');
      }
    };

    // Initialize web3
    initWeb3();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange);
    }

    // Cleanup event listener on unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
      }
    };
  }, [currentUser, formData, account]);

  const handleCreateContract = async () => {
    try {
      const result = await contract.methods
        .createContract(
          formData.farmerId,
          formData.crop,
          web3.utils.toWei(formData.totalAmt.toString(), formData.unit),
          web3.utils.toWei(formData.installmentAmt.toString(), formData.unit)
        )
        .send({ from: account });

      const newContractId =
        result.events.ContractCreated.returnValues.contractId;
      setCurrentId(newContractId);
      console.log(result.events.ContractCreated.returnValues);

      const buyerRef = doc(db, 'buyers', currentUser.uid);
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
        unit: formData.unit || 'ether',
        status: 'Created',
        date: formData.date,
        buyerName: formData.buyerName,
        buyerId: formData.buyerId,
        location: formData.location,
        createdAt: new Date().toISOString(),
      };

      const updatedContracts = [...existingContracts, newContract];

      // Update Firestore with the new/updated contracts array
      await setDoc(
        buyerRef,
        {
          contracts: updatedContracts,
        },
        { merge: true }
      );

      toast.success(`Contract created with ID: ${newContractId}`);
    } catch (error) {
      console.error('Error creating contract:', error);
      toast.error('Failed to create contract. Please try again.');
    }
  };
  // const details = await contract.methods.getContractDetails(selectedContractId).call(); //        contractDetails: details.contractDetails,

  const handleSignContract = async () => {
    try {
      // Sign the contract on the blockchain
      await contract.methods.signContract(currentId).send({ from: account });

      // Update the contract status in Firebase
      const buyerRef = doc(db, 'buyers', currentUser.uid);
      const docSnap = await getDoc(buyerRef);

      if (!docSnap.exists()) {
        toast.error('Buyer profile not found');
        return;
      }

      const existingContracts = docSnap.data().contracts || [];
      const updatedContracts = existingContracts.map((contract) => {
        if (contract.contractId === currentId.toString()) {
          return { ...contract, status: 'Signed' };
        }
        return contract;
      });

      // Update Firestore with the modified contracts array
      await setDoc(
        buyerRef,
        {
          contracts: updatedContracts,
        },
        { merge: true }
      );

      toast.success(
        `Contract with ID ${currentId} has been signed and updated in the database.`
      );
    } catch (error) {
      console.error('Error signing contract:', error);
      toast.error('Failed to sign contract. Please try again.');
    }
  };

  return (
    <div className="p-4">
      Connected Metamask Address : {account}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create Contract</h2>
        <button
          onClick={handleCreateContract}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Contract Block
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Sign Contract</h2>
        {/* Are you sure you want to sign the contract with ID {currentId}? */}
        Are you sure you want to sign the contract ?
        <button
          onClick={handleSignContract}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sign
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
    unit: PropTypes.string.isRequired,
  }),
};
