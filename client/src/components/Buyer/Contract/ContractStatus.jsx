import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/auth_context';
import { db } from '../../../../firebase';
import MultiAgriConnect from '../../../contractAddress/MultiAgriConnect.json';
import { ToastContainer, toast } from 'react-toastify';

export default function ContractStatus({ contract }) {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [localContract, setLocalContract] = useState(contract);
  const [web3, setWeb3] = useState(null);
  const [contractState, setContractState] = useState(null);
  const [currentMetaUser, setCurrentMetaUser] = useState('');
  const [account, setAccount] = useState('');
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
          setContractState(contractInstance);

          // Set buyer details in formData
          setCurrentMetaUser(accounts[0]);
        } catch (error) {
          toast.error('User denied account access', error.message);
        }
      } else {
        toast.error('Please install MetaMask!');
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
  }, [currentUser, account]);

  // Function to handle date formatting
  const formatDate = (createdAt) => {
    if (createdAt instanceof Date) {
      return createdAt.toLocaleDateString();
    } else if (createdAt && createdAt.toDate) {
      return createdAt.toDate().toLocaleDateString();
    } else if (typeof createdAt === 'string') {
      return new Date(createdAt).toLocaleDateString();
    }
    return 'N/A';
  };

  const handleSignContract = async () => {
    if (!contractState || !account) {
      toast.error('Web3 or contract not initialized');
      return;
    }

    if (currentMetaUser !== contract.buyerId) {
      toast.error('Log in through the appropriate MetaMask account');
      return;
    }

    try {
      // Sign the contract on the blockchain
      await signContractOnBlockchain(contract.contractId);

      // Update the contract status in Firebase
      await updateContractStatusInFirebase(contract.contractId);

      setLocalContract((prevContract) => ({
        ...prevContract,
        status: 'Signed',
      }));

      toast.success(
        `Contract with ID ${contract.contractId} has been signed and updated in the database.`
      );
    } catch (error) {
      console.error('Error in handleSignContract:', error);
      toast.error('Failed to sign contract. Please try again.');
    }
  };

  const signContractOnBlockchain = async (contractId) => {
    try {
      await contractState.methods
        .signContract(contractId)
        .send({ from: account });
    } catch (error) {
      console.error('Error signing contract on blockchain:', error);
      throw new Error('Failed to sign contract on blockchain');
    }
  };

  const updateContractStatusInFirebase = async (contractId) => {
    try {
      const buyerRef = doc(db, 'buyers', currentUser.uid);
      const docSnap = await getDoc(buyerRef);

      if (!docSnap.exists()) {
        throw new Error('Buyer profile not found');
      }

      const existingContracts = docSnap.data().contracts || [];
      const updatedContracts = existingContracts.map((contractVar) => {
        if (contractVar.contractId === contractId.toString()) {
          return { ...contractVar, status: 'Signed' };
        }
        return contractVar;
      });

      await setDoc(buyerRef, { contracts: updatedContracts }, { merge: true });
    } catch (error) {
      console.error('Error updating contract status in Firebase:', error);
      throw new Error('Failed to update contract status in database');
    }
  };

  const handleMakePayment = async () => {
    if (!contractState || !account || !web3) {
      toast.error('Web3 or contract not initialized');
      return;
    }

    if (currentMetaUser !== contract.buyerId) {
      toast.error('Log in through the appropriate MetaMask account');
      return;
    }

    try {
      // Make payment on the blockchain
      await makePaymentOnBlockchain(
        contract.contractId,
        contract.installmentAmt,
        contract.unit
      );

      // Update the contract status in Firebase
      // Get updated payments made
      const paymentsMade = await getPaymentsMade(contract.contractId);

      // Convert totalAmt and paymentsMade to Wei for accurate comparison
      const totalAmtWei = web3.utils.toWei(contract.totalAmt, contract.unit);
      const paymentsMadeWei = web3.utils.toWei(
        paymentsMade.toString(),
        'ether'
      );

      // Check if total payments made are greater than or equal to the contract's total amount
      try {
        if (
          new web3.utils.BN(paymentsMadeWei).gte(new web3.utils.BN(totalAmtWei))
        ) {
          // Update the contract status in Firebase
          await updateContractPaymentInFirebase(contract.contractId);

          setLocalContract((prevContract) => ({
            ...prevContract,
            status: 'Paid',
          }));
        }
      } catch (error) {
        console.log(error);
      }

      toast.success(
        `Payment of ${contract.installmentAmt} ${contract.unit} made for contract with ID ${contract.contractId}.`
      );
    } catch (error) {
      console.error('Error in handleMakePayment:', error);
      //   toast.error("Failed to make payment. Please try again.");
    }
  };

  const getPaymentsMade = async (contractId) => {
    try {
      const payments = await contractState.methods
        .paymentsMade(contractId, account)
        .call();
      return web3.utils.fromWei(payments, 'ether');
    } catch (error) {
      console.error('Error getting payments made:', error);
      throw error;
    }
  };
  const makePaymentOnBlockchain = async (contractId, amount, unit) => {
    try {
      await contractState.methods.makePayment(contractId).send({
        from: account,
        value: web3.utils.toWei(amount, unit),
      });
    } catch (error) {
      console.error('Error making payment on blockchain:', error);
      throw new Error('Failed to make payment on blockchain');
    }
  };

  const updateContractPaymentInFirebase = async (contractId) => {
    try {
      const buyerRef = doc(db, 'buyers', currentUser.uid);
      const docSnap = await getDoc(buyerRef);

      if (!docSnap.exists()) {
        throw new Error('Buyer profile not found');
      }

      const existingContracts = docSnap.data().contracts || [];
      const updatedContracts = existingContracts.map((contractVar) => {
        if (contractVar.contractId === contractId.toString()) {
          return { ...contractVar, status: 'Paid' }; // Or update to an appropriate status
        }
        return contractVar;
      });

      await setDoc(buyerRef, { contracts: updatedContracts }, { merge: true });
    } catch (error) {
      console.error(
        'Error updating contract payment status in Firebase:',
        error
      );
      throw new Error('Failed to update contract payment status in database');
    }
  };

  return (
    <div className="w-full">
      {/* Contract Row */}
      <div className="w-full h-12 bg-green-200 flex flex-row items-center px-4 mb-2">
        <div className="flex-1 text-center">{contract.contractId || 'N/A'}</div>
        <div className="flex-1 text-center">{contract.crop || 'N/A'}</div>
        <div className="flex-1 text-center">{contract.farmerName || 'N/A'}</div>
        <div className="flex-1 text-center">
          {localContract.status || 'N/A'}
        </div>
        <div className="flex-1 text-center">
          {formatDate(contract.createdAt)}
        </div>
        <div
          className="flex-1 text-center text-green-800 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          View Details
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex w-full items-center justify-center z-50">
          <div className="absolute w-full inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 w-full rounded-lg shadow-lg z-10">
            <div>
              <strong>Contract ID:</strong> {contract.contractId || 'N/A'}
            </div>
            <div>
              <strong>Crop:</strong> {contract.crop || 'N/A'}
            </div>
            <div>
              <strong>Farmer Name:</strong> {contract.farmerName || 'N/A'}
            </div>
            <div>
              <strong>Farmer Id:</strong> {contract.farmerId || 'N/A'}
            </div>
            <div>
              <strong>Buyer Name:</strong> {contract.buyerName || 'N/A'}
            </div>
            <div>
              <strong>Buyer Id:</strong> {contract.buyerId || 'N/A'}
            </div>
            <div>
              <strong>Final Date:</strong> {contract.date || 'N/A'}
            </div>
            <div>
              <strong>Total Amount:</strong>{' '}
              {contract.totalAmt + ' ' + contract.unit || 'N/A'}
            </div>
            <div>
              <strong>Installment Amount:</strong>{' '}
              {contract.installmentAmt + ' ' + contract.unit || 'N/A'}
            </div>
            <div>
              <strong>Location:</strong> {contract.location || 'N/A'}
            </div>
            <div>
              <strong>Status:</strong> {localContract.status || 'N/A'}
            </div>
            <div>
              <strong>Created At:</strong> {formatDate(contract.createdAt)}
            </div>
            <div className="flex gap-2">
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {localContract.status === 'Created' && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleSignContract}
                >
                  Sign
                </button>
              )}
              {localContract.status === 'Signed' && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleMakePayment}
                >
                  Make Payment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

ContractStatus.propTypes = {
  contract: PropTypes.shape({
    date: PropTypes.string.isRequired,
    farmerName: PropTypes.string.isRequired,
    farmerId: PropTypes.string.isRequired,
    buyerName: PropTypes.string.isRequired,
    buyerId: PropTypes.string.isRequired,
    crop: PropTypes.string.isRequired,
    totalAmt: PropTypes.string.isRequired,
    installmentAmt: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    contractId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};
