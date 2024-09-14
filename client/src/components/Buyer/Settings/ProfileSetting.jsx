import { useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { db } from '../../../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileSetting() {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    displayName: '',
    lname: '',
    email: '',
    phone: '',
    photoUrl: '',
    uid:'',
    userType:'buyer',
  });

  const [address, setAddress] = useState({
    addr1: '',
    addr2: '',
    companyName: '',
    streetAddr: '',
    country: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [photo, setPhoto] = useState(null); // State to store selected photo
  const [photoPreview, setPhotoPreview] = useState('');
  useEffect(() => {
    const fetchDetails = async () => {
      if (currentUser) {
        const buyerRef = doc(db, 'buyers', currentUser.uid);
        const docSnap = await getDoc(buyerRef);
        const data = docSnap.data(); // Get document data

        if (docSnap.exists()) {
          setProfile({
            displayName: data.profile.displayName || '',
            lname: data.profile.lname || '',
            email: data.profile.email || '',
            phone: data.profile.phone || '',
            photoUrl: data.profile.photoUrl || '',
            uid:data.profile.uid || currentUser.uid,
            userType:'buyer',
          });
          setAddress({
            addr1: data.address.addr1 || '',
            addr2: data.address.addr2 || '',
            companyName: data.address.companyName || '',
            streetAddr: data.address.streetAddr || '',
            country: data.address.country || '',
            state: data.address.state || '',
            zipCode: data.address.zipCode || '',
            phone: data.address.phone || '',
          });
        } else {
          setProfile({
            displayName: '',
            lname: '',
            email: '',
            phone: '',
            photoUrl: '',
            uid:currentUser.uid,
            userType:'buyer',
          });
          setAddress({
            addr1: '',
            addr2: '',
            companyName: '',
            streetAddr: '',
            country: '',
            state: '',
            zipCode: '',
            phone: '',
          });
        }
        setPhotoPreview(data.profile?.photoUrl || '');
      }
    };

    fetchDetails();
  }, [currentUser]);

  // const [password, setPassword] = useState('');
  const [isEditable, setIsEditable] = useState({
    profile: false,
    address: false,
    password: false,
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Function to handle input change
  const handleInputChange = (e, stateUpdater) => {
    const { name, value } = e.target;
    stateUpdater((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle edit mode
  const handleEdit = (section) => {
    setIsEditable((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file)); // Generate a preview of the selected photo
  };
  // Save updated profile and address information to Firebase
  const handleSave = async () => {
    try {
      const buyerRef = doc(db, 'buyers', currentUser.uid);
      const docSnap = await getDoc(buyerRef);
      let photoUrl = profile.photoUrl;
      if (photo) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `profilePictures/buyers/${currentUser.uid}`
        );
        await uploadBytes(storageRef, photo);
        photoUrl = await getDownloadURL(storageRef);
      }

      const updatedProfile = {
        ...profile,
        photoUrl, // Update photo URL
      };

      if (docSnap.exists()) {
        await setDoc(
          buyerRef,
          {
            profile: updatedProfile,
            address,
          },
          { merge: true }
        );
        toast.success('Updated Profile');
      } else {
        await setDoc(buyerRef, {
          profile: updatedProfile,
          address,
        });
        toast.success('Added Profile');
      }
    } catch (error) {
      toast.error('Error saving profile', error);
      console.error('Error saving photo', error);
    }

    setIsEditable({ profile: false, address: false });
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation password do not match');
      return;
    }
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(currentUser, credential);

      await updatePassword(currentUser, newPassword);
      toast.success('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(
        'Failed to update password. Please ensure the current password is correct.'
      );
    }
    setIsEditable({ password: false });
  };
  return (
    <div className="w-3/4 ml-8">
      <div className="bg-white shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="flex space-x-6">
          <div className="flex-grow space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="displayName"
                value={profile.displayName}
                onChange={(e) => handleInputChange(e, setProfile)}
                placeholder="First Name"
                className={`w-1/2 p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.profile ? '' : 'bg-slate-400'} `}
                disabled={!isEditable.profile}
              />
              <input
                type="text"
                name="lname"
                value={profile.lname}
                onChange={(e) => handleInputChange(e, setProfile)}
                placeholder="Last Name"
                className={`w-1/2 p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.profile ? '' : 'bg-slate-400'} `}
                disabled={!isEditable.profile}
              />
            </div>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={(e) => handleInputChange(e, setProfile)}
              placeholder="Email"
              className={`w-full p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.profile ? '' : 'bg-slate-400'} `}
              disabled={!isEditable.profile}
            />
            <input
              type="number"
              name="phone"
              value={profile.phone}
              onChange={(e) => handleInputChange(e, setProfile)}
              placeholder="Phone Number"
              className={`w-full p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.profile ? '' : 'bg-slate-400'} `}
              disabled={!isEditable.profile}
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <img
              src={photoPreview || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="rounded-full border border-gray-300 w-16 h-16 object-cover"
            />
            <label
              className={`text-green-500 border placeholder:text-black border-green-500 px-4 py-2 rounded  `}
            >
              Upload Profile Image
              <input
                type="file"
                className={`hidden ${isEditable.profile ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onChange={handlePhotoChange}
                disabled={!isEditable.profile}
              />
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`mt-6 px-6 py-2 bg-green-500 text-white rounded ${isEditable.profile ? 'bg-green-700' : ' bg-green-500'}`}
            onClick={() => handleEdit('profile')}
          >
            Edit
          </button>
          <button
            className={`mt-6 px-6 py-2 bg-blue-400 ${isEditable.profile ? 'cursor-pointer' : 'cursor-not-allowed'} text-white rounded`}
            onClick={handleSave}
            disabled={!isEditable.profile} // Disable when isEditable.profile is false
          >
            Save
          </button>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Address</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="addr1"
            value={address.addr1}
            onChange={(e) => handleInputChange(e, setAddress)}
            placeholder="Address Line 1"
            className={`w-full p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.address ? '' : 'bg-slate-400'} `}
            disabled={!isEditable.address}
          />
          <input
            type="text"
            name="addr2"
            value={address.addr2}
            onChange={(e) => handleInputChange(e, setAddress)}
            placeholder="Address Line 2"
            className={`w-full p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.address ? '' : 'bg-slate-400'} `}
            disabled={!isEditable.address}
          />
          <input
            type="text"
            name="companyName"
            value={address.companyName}
            onChange={(e) => handleInputChange(e, setAddress)}
            placeholder="Company Name (optional)"
            className={`w-full p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.address ? '' : 'bg-slate-400'} `}
            disabled={!isEditable.address}
          />
          <input
            type="text"
            name="streetAddr"
            value={address.streetAddr}
            onChange={(e) => handleInputChange(e, setAddress)}
            placeholder="Street Address"
            className={`w-full p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.address ? '' : 'bg-slate-400'} `}
            disabled={!isEditable.address}
          />
          <div className="flex space-x-4">
            <select
              name="country"
              value={address.country}
              onChange={(e) => handleInputChange(e, setAddress)}
              className={`w-1/3 p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.address ? '' : 'bg-slate-400'} `}
              disabled={!isEditable.address}
            >
              <option value="India">India</option>
            </select>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={(e) => handleInputChange(e, setAddress)}
              placeholder="State"
              className={`w-1/3 p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.address ? '' : 'bg-slate-400'} `}
              disabled={!isEditable.address}
            />
            <input
              type="number"
              name="zipCode"
              value={address.zipCode}
              onChange={(e) => handleInputChange(e, setAddress)}
              placeholder="Zip Code"
              className={`w-1/3 p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.address ? '' : 'bg-slate-400'} `}
              disabled={!isEditable.address}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`mt-6 px-6 py-2 bg-green-500 text-white rounded ${isEditable.address ? 'bg-green-700' : ' bg-green-500'}`}
            onClick={() => handleEdit('address')}
          >
            Edit
          </button>
          <button
            className={`mt-6 px-6 py-2 bg-blue-400 ${isEditable.address ? 'cursor-pointer' : 'cursor-not-allowed'} text-white rounded`}
            onClick={handleSave}
            disabled={!isEditable.address}
          >
            Save
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`w-full p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.password ? '' : 'bg-slate-400'} `}
            disabled={!isEditable.password}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full p-2 border border-gray-300 placeholder:text-black rounded ${isEditable.password ? '' : 'bg-slate-400'} `}
            disabled={!isEditable.password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className={`w-full p-2 border border-gray-300 rounded placeholder:text-black ${isEditable.password ? '' : 'bg-slate-400'} `}
            disabled={!isEditable.password}
          />
        </div>
        <div className="flex gap-2">
          <button
            className={`mt-6 px-6 py-2 bg-green-500 text-white rounded ${isEditable.password ? 'bg-green-700' : ' bg-green-500'}`}
            onClick={() => handleEdit('password')}
          >
            Edit
          </button>
          <button
            className={`mt-6 px-6 py-2 bg-blue-400 ${isEditable.password ? 'cursor-pointer' : 'cursor-not-allowed'} text-white rounded`}
            onClick={handlePasswordChange}
            disabled={!isEditable.password}
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
