import { useState, useEffect, useContext } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../../../firebase';
import { AuthContext } from '../../../context/auth_context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function FSettings() {
  const { currentUser } = useContext(AuthContext);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);

    useEffect(() => {
      if (currentUser === null) {
        navigate('/farmerlogin');
      }
    }, [currentUser, navigate]);

  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    dob: '',
    photoidtype: '',
    photoidnumber: '',
    photoUrl: '',
  });

  const [address, setAddress] = useState({
    address: '',
    state: '',
    district: '',
    subdistrict: '',
    area: '',
    pincode: '',
  });

  const [bankDetails, setBankDetails] = useState({
    ifsc: '',
    accountname: '',
    accountnumber: '',
    bankname: '',
    branchname: '',
    branchaddress: '',
  });
  const handleEdit = (section) => {
    setIsEditable((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  const port = import.meta.env.VITE_SERVER_PORT;

  useEffect(() => {
    fetch(`http://localhost:${port}/states`)
      .then((response) => response.json())
      .then((data) => setStates(data));
    const fetchDetails = async () => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        const data = docSnap.data(); // Get document data
        console.log(data);
        if (docSnap.exists()) {
          setProfile({
            firstname: data.profile.firstname || '',
            lastname: data.profile.lastname || '',
            gender: data.profile.gender || '',
            dob: data.profile.dob || '',
            photoUrl: data.profile.photoUrl || '',
            photoidtype: data.profile.photoidtype || '',
            photoidnumber: data.profile.photoidnumber || '',
            uid: data.profile.uid || currentUser.uid,
            userType: 'farmer',
          });
          setAddress({
            address: data.address.address || '',
            streetAddr: data.address.streetAddr || '',
            state: data.address.state || '',
            district:data.address.district || '',
            subdistrict: data.address.subdistrict || '',
            area: data.address.area || '',
            pincode:data.address.pincode || '',
          });
          setBankDetails({
            ifsc: data.bankDetails.ifsc || '',
            accountname: data.bankDetails.accountname || '',
            accountnumber: data.bankDetails.accountnumber || '',
            bankname: data.bankDetails.bankname || '',
            branchname: data.bankDetails.branchname || '',
            branchaddress: data.bankDetails.branchaddress || '',
          });
        }
      }
    };

    fetchDetails();
  }, [port, currentUser]);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    switch (section) {
      case 'profile':
        setProfile((prev) => ({ ...prev, [name]: value }));
        break;
      case 'address':
        setAddress((prev) => ({ ...prev, [name]: value }));
        break;
      case 'bankDetails':
        setBankDetails((prev) => ({ ...prev, [name]: value }));
        break;
      default:
        break;
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setAddress((prev) => ({ ...prev, state }));
    fetch(`http://localhost:${port}/districts/${state}`)
      .then((response) => response.json())
      .then((data) => {
        setDistricts(data);
        setSubdistricts([]);
        setAreas([]);
      });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setAddress((prev) => ({ ...prev, district }));
    fetch(`http://localhost:${port}/subdistricts/${address.state}/${district}`)
      .then((response) => response.json())
      .then((data) => {
        setSubdistricts(data);
        setAreas([]);
      });
  };

  const handleSubdistrictChange = (e) => {
    const subdistrict = e.target.value;
    setAddress((prev) => ({ ...prev, subdistrict }));
    fetch(
      `http://localhost:${port}/areas/${address.state}/${address.district}/${subdistrict}`
    )
      .then((response) => response.json())
      .then((data) => setAreas(data));
  };

  const handleImageChange = (event, setImagePreview) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = (setImagePreview, inputId) => {
    setImagePreview(null);
    document.getElementById(inputId).value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser) {
      const farmerDocRef = doc(db, 'users', currentUser.uid);
      const storage = getStorage();

      try {
        // Upload Passbook image
        let passbookUrl = '';
        if (imagePreview1) {
          const passbookRef = ref(
            storage,
            `farmers/${currentUser.uid}/passbook`
          );
          await uploadBytes(
            passbookRef,
            await fetch(imagePreview1).then((r) => r.blob())
          );
          passbookUrl = await getDownloadURL(passbookRef);
        }

        // Upload ID Proof image
        let idProofUrl = '';
        if (imagePreview2) {
          const idProofRef = ref(storage, `farmers/${currentUser.uid}/idproof`);
          await uploadBytes(
            idProofRef,
            await fetch(imagePreview2).then((r) => r.blob())
          );
          idProofUrl = await getDownloadURL(idProofRef);
        }

        await setDoc(farmerDocRef, {
          profile: {
            ...profile,
            uid: currentUser.uid,
            userType: 'farmer',
            photoUrl: profile.photoUrl || '',
          },
          address: {
            ...address,
            area: areas.length > 0 ? areas[0] : '',
          },
          bankDetails: {
            ...bankDetails,
          },
          passbookImage: passbookUrl,
          idProofImage: idProofUrl,
        });

        toast.success('Data submitted successfully!');
        setIsEditable(false);
        // navigate('/farmer/dashboard');
      } catch (error) {
        toast.error('Error submitting data:', error);
        alert('Error submitting data. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="w-3/4 mx-auto mt-8 p-2">
        <div className="space-y-6 flex flex-col gap-2">
          {/* Personal Details */}
          <div className="bg-white shadow p-6 rounded-lg">
          <div className='flex items-center justify-between w-[100vw] '>

            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <button
              className={`mb-2 px-6 py-2 bg-green-500 text-white rounded ${isEditable.password ? 'bg-green-700' : ' bg-green-500'}`}
              onClick={() => handleEdit(true)}
            >
              Edit
            </button>
                
            </div>
            <div className="flex flex-col md:flex-row flex-wrap gap-2">
              <input
                type="text"
                name="firstname"
                value={profile.firstname}
                onChange={(e) => handleInputChange(e, 'profile')}
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded"
                required
                disabled={!isEditable}
              />
              <input
                type="text"
                name="lastname"
                value={profile.lastname}
                onChange={(e) => handleInputChange(e, 'profile')}
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded"
                required
                disabled={!isEditable}
              />
              <select
                name="gender"
                value={profile.gender}
                onChange={(e) => handleInputChange(e, 'profile')}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!isEditable}
                required
              >
                <option value="">Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                name="dob"
                disabled={!isEditable}
                value={profile.dob}
                onChange={(e) => handleInputChange(e, 'profile')}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <select
                name="photoidtype"
                disabled={!isEditable}
                value={profile.photoidtype}
                onChange={(e) => handleInputChange(e, 'profile')}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Choose Photo-Id Type</option>
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
              </select>
              <input
                type="text"
                disabled={!isEditable}
                name="photoidnumber"
                value={profile.photoidnumber}
                onChange={(e) => handleInputChange(e, 'profile')}
                placeholder="Photo-Id Number"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Address Details</h2>
            <div className="space-y-4">
              <textarea
                name="address"
                disabled={!isEditable}
                value={address.address}
                onChange={(e) => handleInputChange(e, 'address')}
                placeholder="Enter your full address"
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
                required
              ></textarea>
              <div className="flex flex-col md:flex-row flex-wrap gap-2">
                <select
                  name="state"
                  disabled={!isEditable}
                  value={address.state}
                  onChange={handleStateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a state</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {districts.length > 0 && (
                  <select
                    name="district"
                    value={address.district}
                    onChange={handleDistrictChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select a district</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                )}
                {subdistricts.length > 0 && (
                  <select
                    name="subdistrict"
                    value={address.subdistrict}
                    onChange={handleSubdistrictChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select a subdistrict</option>
                    {subdistricts.map((subdistrict, index) => (
                      <option key={index} value={subdistrict}>
                        {subdistrict}
                      </option>
                    ))}
                  </select>
                )}
                {areas.length > 0 && (
                  <select
                    name="area"
                    value={address.area}
                    onChange={(e) => handleInputChange(e, 'address')}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select an area</option>
                    {areas.map((area, index) => (
                      <option key={index} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <input
                type="text"
                disabled={!isEditable}
                name="pincode"
                value={address.pincode}
                onChange={(e) => handleInputChange(e, 'address')}
                placeholder="Enter 6-digit pincode"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
            <div className="flex flex-col md:flex-row flex-wrap gap-2">
              <input
                type="text"
                name="ifsc"
                disabled={!isEditable}
                value={bankDetails.ifsc}
                onChange={(e) => handleInputChange(e, 'bankDetails')}
                placeholder="IFSC Code"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="accountname"
                disabled={!isEditable}
                value={bankDetails.accountname}
                onChange={(e) => handleInputChange(e, 'bankDetails')}
                placeholder="Account Holder Name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="bankname"
                disabled={!isEditable}
                value={bankDetails.bankname}
                onChange={(e) => handleInputChange(e, 'bankDetails')}
                placeholder="Bank Name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="accountnumber"
                disabled={!isEditable}
                value={bankDetails.accountnumber}
                onChange={(e) => handleInputChange(e, 'bankDetails')}
                placeholder="Bank Account Number"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="branchname"
                disabled={!isEditable}
                value={bankDetails.branchname}
                onChange={(e) => handleInputChange(e, 'bankDetails')}
                placeholder="Branch Name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="branchaddress"
                disabled={!isEditable}
                value={bankDetails.branchaddress}
                onChange={(e) => handleInputChange(e, 'bankDetails')}
                placeholder="Branch Address"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="formFile1" className="block mb-2 font-medium">
                  Upload Passbook
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="file"
                  id="formFile1"
                  disabled={!isEditable}
                  onChange={(e) => handleImageChange(e, setImagePreview1)}
                />
              </div>
              {imagePreview1 && (
                <div className="mt-2">
                  <img
                    src={imagePreview1}
                    alt="Passbook Preview"
                    className="max-w-xs h-auto mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(setImagePreview1, 'formFile1')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="formFile2" className="block mb-2 font-medium">
                Upload ID Proof (Aadhaar, PAN, etc.)
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="file"
                id="formFile2"
                disabled={!isEditable}
                onChange={(e) => handleImageChange(e, setImagePreview2)}
              />
              {imagePreview2 && (
                <div className="mt-2">
                  <img
                    src={imagePreview2}
                    alt="ID Proof Preview"
                    className="max-w-xs h-auto mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(setImagePreview2, 'formFile2')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
           
            <button
              type="submit"
              onClick={handleSubmit}
              className={`mt-6 px-6 py-2 bg-blue-400 ${isEditable ? 'cursor-pointer' : 'cursor-not-allowed'} text-white rounded`}
              disabled={!isEditable} // Disable when isEditable.profile is false
            >
              Save
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
