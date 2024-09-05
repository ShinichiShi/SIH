import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'react-toastify/dist/ReactToastify.css';

export default function PaymentSetting() {
  const { currentUser } = useContext(AuthContext);
  const [isEditable, setIsEditable] = useState(false);
  const [confirmNumber, setConfirmNumber] = useState('');
  const [signaturePreview, setSignaturePreview] = useState('');

  const [bank, setBank] = useState({
    ifsc: '',
    bank_name: '',
    branch_name: '',
    name: '',
    acc_no: '',
    address: '',
    signatureUrl: '', // Add signature URL state
  });
  const [signatureFile, setSignatureFile] = useState(null); // State to store selected file

  useEffect(() => {
    const fetchDetails = async () => {
      if (currentUser) {
        const buyerRef = doc(db, 'buyers', currentUser.uid);
        const docSnap = await getDoc(buyerRef);
        const data = docSnap.data();
        if (docSnap.exists()) {
          setBank({
            ifsc: data.bank?.ifsc || '',
            bank_name: data.bank?.bank_name || '',
            branch_name: data.bank?.branch_name || '',
            name: data.bank?.name || '',
            acc_no: data.bank?.acc_no || '',
            address: data.bank?.address || '',
            signatureUrl: data.bank?.signatureUrl || '', // Load signature URL
          });
        }
        setSignaturePreview(data.bank?.signatureUrl || '');
      }
    };

    fetchDetails();
  }, [currentUser]);

  const handleSave = async () => {
    if (confirmNumber !== bank.acc_no) {
      toast.error('Account number is not matching');
      return;
    }
    try {
      const buyerRef = doc(db, 'buyers', currentUser.uid);

      // Upload the signature file to Firebase Storage
      let signatureUrl = bank.signatureUrl;
      if (signatureFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `signatures/buyers/${currentUser.uid}`);
        await uploadBytes(storageRef, signatureFile);
        signatureUrl = await getDownloadURL(storageRef);
      }

      await setDoc(
        buyerRef,
        {
          bank: {
            ...bank,
            signatureUrl, // Save the signature URL
          },
        },
        { merge: true }
      );

      toast.success('Bank details and signature saved successfully!');
      setIsEditable(false);
    } catch (error) {
      toast.error('Failed to save bank details');
      console.error('Error saving bank details and signature:', error);
    }
  };

  const handleChange = (e, state) => {
    const { name, value } = e.target;
    state((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSignatureFile(e.target.files[0]); // Set the selected file to state
  };

  return (
    <div className="w-3/4 ml-8">
      <div className="bg-white shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
        <div className="flex space-x-6">
          <div className="flex-grow space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="IFSC code"
                name="ifsc"
                value={bank.ifsc}
                onChange={(e) => handleChange(e, setBank)}
                className={`w-1/2 p-2 border placeholder:text-black border-gray-300 rounded ${isEditable ? '' : 'bg-slate-400'} `}
                disabled={!isEditable}
              />
              <input
                type="text"
                placeholder="Bank Name"
                name="bank_name"
                value={bank.bank_name}
                onChange={(e) => handleChange(e, setBank)}
                className={`w-1/2 p-2 border placeholder:text-black border-gray-300 rounded ${isEditable ? '' : 'bg-slate-400'} `}
                disabled={!isEditable}
              />
            </div>
            <input
              type="text"
              placeholder="Branch Name"
              name="branch_name"
              value={bank.branch_name}
              onChange={(e) => handleChange(e, setBank)}
              className={`w-1/2 p-2 border placeholder:text-black border-gray-300 rounded ${isEditable ? '' : 'bg-slate-400'} `}
              disabled={!isEditable}
            />
            <input
              type="text"
              placeholder="Account Holder Name as per Bank A/c"
              name="name"
              value={bank.name}
              onChange={(e) => handleChange(e, setBank)}
              className={`w-1/2 p-2 border placeholder:text-black border-gray-300 rounded ${isEditable ? '' : 'bg-slate-400'} `}
              disabled={!isEditable}
            />
            <input
              type="number"
              placeholder="Bank Account No."
              name="acc_no"
              value={bank.acc_no}
              onChange={(e) => handleChange(e, setBank)}
              className={`w-1/2 p-2 border placeholder:text-black border-gray-300 rounded ${isEditable ? '' : 'bg-slate-400'} `}
              disabled={!isEditable}
            />
            <input
              type="number"
              placeholder="Confirm Account No."
              name="confirm"
              value={confirmNumber}
              onChange={(e) => setConfirmNumber(e.target.value)}
              className={`w-1/2 p-2 border placeholder:text-black border-gray-300 rounded ${isEditable ? '' : 'bg-slate-400'} `}
              disabled={!isEditable}
            />
            <input
              type="text"
              placeholder="Branch Address"
              name="address"
              value={bank.address}
              onChange={(e) => handleChange(e, setBank)}
              className={`w-1/2 p-2 border placeholder:text-black border-gray-300 rounded ${isEditable ? '' : 'bg-slate-400'} `}
              disabled={!isEditable}
            />
            <div className="flex flex-row items-center space-y-4 gap-4">
              <img
                src={signaturePreview || 'https://via.placeholder.com/150'}
                alt="Digital Signature"
                className="rounded-full border border-gray-300 w-16 h-16 object-cover"
              />
              <label
                className={`text-green-500 border border-green-500 px-4 py-2 rounded ${isEditable ? 'cursor-pointer' : 'cursor-not-allowed'} `}
              >
                Upload Digital Signature
                <input
                  type="file"
                  name="signature"
                  className={`hidden ${isEditable ? 'cursor-pointer' : 'cursor-not-allowed'}  `}
                  onChange={handleFileChange}
                  disabled={!isEditable}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`mt-6 px-6 py-2 bg-green-500 text-white rounded ${isEditable ? 'bg-green-700' : ' bg-green-500'}`}
            onClick={() => setIsEditable(true)}
          >
            Edit
          </button>
          <button
            className={`mt-6 px-6 py-2 bg-blue-400 ${isEditable ? 'cursor-pointer' : 'cursor-not-allowed'} text-white rounded`}
            onClick={handleSave}
            disabled={!isEditable}
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
