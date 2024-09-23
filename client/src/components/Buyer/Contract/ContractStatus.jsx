import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/auth_context';
import { db } from '../../../../firebase';
import MultiAgriConnect from '../../../contractAddress/MultiAgriConnect.json';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { FaCcStripe } from 'react-icons/fa6';
import ShippingForm from '../Shipping/ShippingForm';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY); // Publishable Key from your Stripe dashboard
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export default function ContractStatus({ contract }) {
  const { t } = useTranslation(); // Initialize translation function

  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [localContract, setLocalContract] = useState(contract);
  const [web3, setWeb3] = useState(null);
  const [contractState, setContractState] = useState(null);
  const [currentMetaUser, setCurrentMetaUser] = useState('');
  const [account, setAccount] = useState('');
  const [shipping, setShipping] = useState(false);
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
    return t('date_not_available');
  };

  const handleSignContract = async () => {
    if (!contractState || !account) {
      toast.error(t('web3_or_contract_not_initialized'));
      return;
    }

    if (currentMetaUser !== contract.buyerId) {
      toast.error(t('login_meta_account'));
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
        t('contract_signed_and_updated', { contractId: contract.contractId })
      );
    } catch (error) {
      console.error('Error in handleSignContract:', error);
      toast.error(t('failed_to_sign_contract'));
    }
  };

  const signContractOnBlockchain = async (contractId) => {
    try {
      await contractState.methods
        .signContract(contractId)
        .send({ from: account });
    } catch (error) {
      console.error('Error signing contract on blockchain:', error);
      throw new Error(t('failed_to_sign_contract_on_blockchain'));
    }
  };

  const updateContractStatusInFirebase = async (contractId) => {
    try {
      const buyerRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(buyerRef);

      if (!docSnap.exists()) {
        throw new Error(t('buyer_profile_not_found'));
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
      throw new Error(t('failed_to_update_contract_status'));
    }
  };

  const handleMakePayment = async () => {
    if (!contractState || !account || !web3) {
      toast.error(t('web3_or_contract_not_initialized'));
      return;
    }

    if (currentMetaUser !== contract.buyerId) {
      toast.error(t('login_meta_account'));
      return;
    }

    try {
      // Make payment on the blockchain
      await makePaymentOnBlockchain(
        contract.contractId,
        contract.installmentAmt
      );

      // Update the contract status in Firebase
      // Get updated payments made
      const paymentsMade = await getPaymentsMade(contract.contractId);

      // Convert totalAmt and paymentsMade to Wei for accurate comparison
      const totalAmtWei = web3.utils.toWei(contract.totalAmt, 'wei');
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
        t('payment_made', {
          amount: contract.installmentAmt,
          unit: 'wei',
          contractId: contract.contractId,
        })
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
  const makePaymentOnBlockchain = async (contractId, amount) => {
    try {
      await contractState.methods.makePayment(contractId).send({
        from: account,
        value: web3.utils.toWei(amount, 'wei'),
      });
    } catch (error) {
      console.error('Error making payment on blockchain:', error);
      throw new Error(t('failed_to_make_payment_on_blockchain'));
    }
  };

  const updateContractPaymentInFirebase = async (contractId) => {
    try {
      const buyerRef = doc(db, 'users', currentUser.uid);
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
      throw new Error(t('failed_to_update_contract_payment_status'));
    }
  };

  const makeStripePayment = async () => {
    console.log('stripe payment');
    const response = await fetch(
      `http://localhost:${SERVER_PORT}/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: contract.crop,
          total_amount: contract.installmentAmt,
        }),
      }
    );

    const { id } = await response.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className="w-full">
      {/* Contract Row */}
      <div className="w-full h-12 bg-green-200 flex flex-row items-center px-4 mb-2">
        <div className="flex-1 text-center">
          #{contract.contractId || t('not_available')}
        </div>
        <div className="flex-1 text-center">
          {contract.crop || t('not_available')}
        </div>
        <div className="flex-1 text-center">
          {contract.farmerName || t('not_available')}
        </div>
        <div className="flex-1 text-center">
          {localContract.status || t('not_available')}
        </div>
        <div className="flex-1 text-center">
          {formatDate(contract.createdAt)}
        </div>
        <div
          className="flex-1 text-center text-green-800 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          {t('view_details')}{' '}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex w-full items-center justify-center z-50">
          <div className="absolute w-full inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 w-full rounded-lg shadow-lg z-10">
            <div>
              <strong>{t('contract_id')}</strong> {contract.contractId || 'N/A'}
            </div>
            <div>
              <strong>{t('crop')}</strong> {contract.crop || 'N/A'}
            </div>
            <div>
              <strong>{t('farmer_name')}</strong> {contract.farmerName || 'N/A'}
            </div>
           
            <div>
              <strong>{t('buyer_name')}</strong> {contract.buyerName || 'N/A'}
            </div>
            <div>
              <strong>{t('buyer_id')}</strong> {contract.buyerId || 'N/A'}
            </div>
            <div>
              <strong>{t('final_date')}</strong> {contract.date || 'N/A'}
            </div>
            <div>
              <strong>{t('total_amount')}</strong>{' '}
              {'Rs.' + contract.totalAmt || 'N/A'}
            </div>
            <div>
              <strong>{t('installment_amount')}</strong>{' '}
              {'Rs.' + contract.installmentAmt || 'N/A'}
            </div>
            <div>
              <strong>{t('location')}:</strong> {contract.location || 'N/A'}
            </div>
            <div>
              <strong>{t('status')}</strong> {localContract.status || 'N/A'}
            </div>
            <div>
              <strong>{t('created_at')}</strong>{' '}
              {formatDate(contract.createdAt)}
            </div>
            <div className="flex gap-2">
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowModal(false)}
              >
                {t('close')}
              </button>
              {localContract.status === 'Created' && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded  hover:bg-blue-600"
                  onClick={handleSignContract}
                >
                  {t('sign_contract')}
                </button>
              )}
              {localContract.status === 'Signed' && (
                <Elements stripe={stripePromise}>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 flex items-center justify-center gap-2 text-white rounded hover:bg-blue-600 "
                    onClick={makeStripePayment}
                  >
                    <FaCcStripe />
                    Make Payment
                  </button>
                </Elements>
              )}
              {localContract.status === 'Signed' && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 flex items-center justify-center gap-2 text-white rounded hover:bg-blue-600 "
                  onClick={() => setShipping(true)}
                >
                  Initiate Shipping
                </button>
              )}
            </div>
            {shipping === true && (
              <div>
                <ShippingForm onClose={() => setShipping(false)}/>
              </div>
            )}
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
    buyerName: PropTypes.string.isRequired,
    buyerId: PropTypes.string.isRequired,
    crop: PropTypes.string.isRequired,
    totalAmt: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    installmentAmt: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    contractId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};
