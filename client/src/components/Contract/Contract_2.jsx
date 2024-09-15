import { useState, useEffect } from 'react';
import Web3 from 'web3';
// import { Alert, AlertDescription, AlertTitle, AlertDialog, AlertDialogAction } from '@/components/ui/alert';
import MultiAgriConnect from '../../contractAddress/MultiAgriConnect.json';

const MultiAgriConnectInteract = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [contractCount, setContractCount] = useState(0);
  const [farmerAddress, setFarmerAddress] = useState('');
  const [contractDetails, setContractDetails] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [installmentAmount, setInstallmentAmount] = useState('');
  const [selectedContractId, setSelectedContractId] = useState('');
  const [contractInfo, setContractInfo] = useState(null);
  const [paymentsMade, setPaymentsMade] = useState(0);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const contractInstance = new web3Instance.eth.Contract(
            MultiAgriConnect.abi,
            MultiAgriConnect.networks[5777].address
          );
          setContract(contractInstance);
        } catch (error) {
          console.error('User denied account access', error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };
    initWeb3();
  }, []);

  useEffect(() => {
    const getContractCount = async () => {
      if (contract) {
        console.log(contract.methods);
        const count = await contract.methods.contractCount().call();
        setContractCount(count);
      }
    };
    getContractCount();
    console.log(contractCount);
  });

  const handleCreateContract = async () => {
    try {
      const result = await contract.methods
        .createContract(
          farmerAddress,
          contractDetails,
          web3.utils.toWei(totalAmount, 'ether'),
          web3.utils.toWei(installmentAmount, 'ether')
        )
        .send({ from: account });
      const newContractId =
        result.events.ContractCreated.returnValues.contractId;
      console.log(result.events.ContractCreated.returnValues);
      alert(`Contract created with ID: ${newContractId}`);
    } catch (error) {
      console.error('Error creating contract:', error);
    }
  };

  const handleGetContractDetails = async () => {
    try {
      const details = await contract.methods
        .getContractDetails(selectedContractId)
        .call();
      setContractInfo({
        farmer: details.farmer,
        buyer: details.buyer,
        contractDetails: details.contractDetails,
        isSigned: details.isSigned,
        totalAmount: web3.utils.fromWei(details.totalAmount, 'ether'),
        installmentAmount: web3.utils.fromWei(
          details.installmentAmount,
          'ether'
        ),
        installmentsRemaining: details.installmentsRemaining,
        // nextPaymentDue: new Date(details.nextPaymentDue * 1000).toLocaleString()
      });
    } catch (error) {
      console.error('Error getting contract details:', error);
    }
  };

  const handleGetPaymentsMade = async () => {
    try {
      const payments = await contract.methods
        .paymentsMade(selectedContractId, account)
        .call();
      setPaymentsMade(web3.utils.fromWei(payments, 'ether'));
    } catch (error) {
      console.error('Error getting payments made:', error);
    }
  };

  const handleSignContract = async () => {
    try {
      await contract.methods
        .signContract(selectedContractId)
        .send({ from: account });
      alert(`Contract with ID ${selectedContractId} has been signed.`);
    } catch (error) {
      console.error('Error signing contract:', error);
    }
  };

  const handleMakePayment = async () => {
    try {
      await contract.methods
        .makePayment(selectedContractId)
        .send({
          from: account,
          value: web3.utils.toWei(installmentAmount, 'ether'),
        });
      alert(
        `Payment of ${installmentAmount} ETH made for contract with ID ${selectedContractId}.`
      );
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">KrishiSeva Test contract Interaction</h1>
      {/* <Alert className="mb-4">
        <AlertTitle>Contract Count: {contractCount}</AlertTitle> */}
      Contract Count: {contractCount}
      {/* <AlertDescription>Total number of contracts created</AlertDescription>
      </Alert> */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create Contract</h2>
        <input
          type="text"
          placeholder="Farmer Address"
          value={farmerAddress}
          onChange={(e) => setFarmerAddress(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Contract Details"
          value={contractDetails}
          onChange={(e) => setContractDetails(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="Total Amount (ETH)"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="Installment Amount (ETH)"
          value={installmentAmount}
          onChange={(e) => setInstallmentAmount(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleCreateContract}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Contract
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Get Contract Details</h2>
        <input
          type="number"
          placeholder="Contract ID"
          value={selectedContractId}
          onChange={(e) => setSelectedContractId(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleGetContractDetails}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Get Details
        </button>
        {contractInfo && (
          <div className="mt-2 p-2 border rounded">
            <p>Farmer: {contractInfo.farmer}</p>
            <p>Buyer: {contractInfo.buyer}</p>
            <p>Details: {contractInfo.contractDetails}</p>
            <p>Signed: {contractInfo.isSigned ? 'Yes' : 'No'}</p>
            <p>Total Amount: {contractInfo.totalAmount} ETH</p>
            <p>Installment Amount: {contractInfo.installmentAmount} ETH</p>
            <p>Installments Remaining: {contractInfo.installmentsRemaining}</p>
            <p>Next Payment Due: {contractInfo.nextPaymentDue}</p>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Get Payments Made</h2>
        <input
          type="number"
          placeholder="Contract ID"
          value={selectedContractId}
          onChange={(e) => setSelectedContractId(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleGetPaymentsMade}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Get Payments Made
        </button>
        {paymentsMade > 0 && (
          <p className="mt-2">Total Payments Made: {paymentsMade} ETH</p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Sign Contract</h2>
        <input
          type="number"
          placeholder="Contract ID"
          value={selectedContractId}
          onChange={(e) => setSelectedContractId(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        {/* <button
          onClick={() => setShowSignContractDialog(true)}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sign Contract
        </button> */}
        {/* <AlertDialog
          open={showSignContractDialog}
          onClose={() => setShowSignContractDialog(false)}
        > */}
        {/* <AlertDescription> */}
        Are you sure you want to sign the contract with ID {selectedContractId}?
        {/* </AlertDescription> */}
        {/* <AlertDialogAction> */}
        <button
          onClick={handleSignContract}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sign
        </button>
        {/* </AlertDialogAction> */}
        {/* </AlertDialog> */}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Make Payment</h2>
        <input
          type="number"
          placeholder="Contract ID"
          value={selectedContractId}
          onChange={(e) => setSelectedContractId(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="Installment Amount (ETH)"
          value={installmentAmount}
          onChange={(e) => setInstallmentAmount(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        {/* <button
          onClick={() => setShowMakePaymentDialog(true)}
          className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Make Payment
        </button> */}
        {/* <AlertDialog
          open={showMakePaymentDialog}
          onClose={() => setShowMakePaymentDialog(false)}
        > */}
        <b>Make Payment</b>
        {/* <AlertDescription> */}
        <p>
          Are you sure you want to make a payment of {installmentAmount} ETH for
          the contract with ID {selectedContractId}?
        </p>
        {/* </AlertDescription> */}
        {/* <AlertDialogAction> */}
        <button
          onClick={handleMakePayment}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Make Payment
        </button>
        {/* </AlertDialogAction> */}
        {/* </AlertDialog> */}
      </div>
    </div>
  );
};

export default MultiAgriConnectInteract;
