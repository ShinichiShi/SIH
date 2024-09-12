import { useState, useEffect } from 'react';
import styles from './profilesetup.module.css'; // Import the CSS module

import { db } from '../../../firebase';
import { addDoc, collection } from 'firebase/firestore';

import Navbar from '../Farmer/FarmNav';

export default function Profilesetup() {
  const port = import.meta.env.VITE_PORT;
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);

  // Form state
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [photoidtype, setPhotoidtype] = useState('');
  const [photoidnumber, setPhotoidnumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accountnumber, setAccountnumber] = useState('');
  const [bankname, setBankname] = useState('');
  const [branchname, setBranchname] = useState('');
  const [branchaddress, setBranchaddress] = useState('');
  const [accountname, setAccountname] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [subdistricts, setSubdistricts] = useState([]);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState('');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:${port}/states`)
      .then((response) => response.json())
      .then((data) => setStates(data));
  }, [port]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
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
    setSelectedDistrict(district);
    fetch(`http://localhost:${port}/subdistricts/${selectedState}/${district}`)
      .then((response) => response.json())
      .then((data) => {
        setSubdistricts(data);
        setAreas([]);
      });
  };

  const handleSubdistrictChange = (e) => {
    const subdistrict = e.target.value;
    setSelectedSubdistrict(subdistrict);
    fetch(
      `http://localhost:${port}/areas/${selectedState}/${selectedDistrict}/${subdistrict}`
    )
      .then((response) => response.json())
      .then((data) => setAreas(data));
  };

  const userCollectionRef = collection(db, 'farmers');

  // Image handling
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview1(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview1(null);
    }
  };

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview2(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview2(null);
    }
  };

  const removeImage1 = () => {
    setImagePreview1(null);
    document.getElementById('formFile1').value = '';
  };

  const removeImage2 = () => {
    setImagePreview2(null);
    document.getElementById('formFile2').value = '';
  };

  // Validate form fields
  const validateForm = () => {
    let tempErrors = {};
    if (!firstname) tempErrors.firstname = 'First name is required.';
    if (!lastname) tempErrors.lastname = 'Last name is required.';
    if (!gender) tempErrors.gender = 'Gender is required.';
    if (!dob || new Date(dob) >= new Date('2003-01-01'))
      tempErrors.dob = 'DOB must be before 2002.';
    if (!address) tempErrors.address = 'Address is required.';
    if (!pincode || pincode.length !== 6)
      tempErrors.pincode = 'Pincode must be 6 digits.';
    if (!photoidtype) tempErrors.photoidtype = 'Photo ID type is required.';
    if (!photoidnumber)
      tempErrors.photoidnumber = 'Photo ID number is required.';
    if (!ifsc) tempErrors.ifsc = 'IFSC code is required.';
    if (!accountnumber)
      tempErrors.accountnumber = 'Account number is required.';
    if (!bankname) tempErrors.bankname = 'Bank name is required.';
    if (!branchname) tempErrors.branchname = 'Branch name is required.';
    if (!branchaddress)
      tempErrors.branchaddress = 'Branch address is required.';

    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill all required fields correctly.');
      return;
    }

    try {
      await addDoc(userCollectionRef, {
        firstname: firstname.toUpperCase(),
        lastname: lastname.toUpperCase(),
        gender,
        dob,
        address: address.toUpperCase(),
        pincode: parseInt(pincode, 10),
        photoidtype,
        photoidnumber: parseInt(photoidnumber, 10),
        ifsc: ifsc.toUpperCase(),
        accountnumber: parseInt(accountnumber, 10),
        bankname: bankname.toUpperCase(),
        branchname: branchname.toUpperCase(),
        branchaddress: branchaddress.toUpperCase(),
        accountname: accountname.toUpperCase(),
        passbookImage: imagePreview1,
        idProofImage: imagePreview2,
        state: selectedState,
        district: selectedDistrict,
        subdistrict: selectedSubdistrict,
        area: areas.length > 0 ? areas[0] : '',
      });
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    }
  };

  return (
    <>
    <Navbar />
    <div className={styles.pfp}>
    <div className={styles.litem}>
            <nav>
              <a>
                Registration Form
              </a>
            </nav>
        </div>
      <div className={styles.cc}>
        {/* <div className={styles.litem}>
          <nav
            id="navbar-example3"
          >
            <nav>
              <a>
                Registration Form
              </a>
            </nav>
          </nav>
        </div> */}
        <div className={styles.col8}>
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example3"
            data-bs-smooth-scroll="true"
            className={styles.scrollSpyExample}
            tabIndex="0"
          >
            <div id="item-1">
              <h1 className={styles.pdtext}>Personal Details</h1>
              <form className={styles.needsValidation} onSubmit={handleSubmit}>
                <div>
                  <div className={styles.pd}>
                    <div className={styles.bfl1}>
                      <div className={styles.fname111}>
                        <div className={styles.labels}>
                          <label
                            htmlFor="firstName"
                            className={styles.formLabel}
                          >
                            <strong>First Name</strong>
                          </label>
                        </div>
                        <input
                          type="text"
                          className={styles.formControl}
                          id="firstName"
                          placeholder="Enter first name"
                          required
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </div>

                      <div className={styles.lname111}>
                        <div className={styles.labels}>
                          <label
                            htmlFor="lastName"
                            className={styles.formLabel}
                          >
                            <strong>Last Name</strong>
                          </label>
                        </div>
                        <input
                          type="text"
                          className={styles.formControl}
                          id="lastName"
                          placeholder="Enter last name"
                          required
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.bfl2}>
                      <div className={styles.gender}>
                        <div className={styles.labels}>
                          <label htmlFor="Gender" className={styles.formLabel}>
                            <strong>Gender</strong>
                          </label>
                        </div>
                        <select
                          className={styles.formSelect}
                          id="gender"
                          required
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Choose...</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className={styles.dob}>
                        <div className={styles.labels}>
                          <label htmlFor="dob" className={styles.formLabel}>
                            <strong>Date of Birth</strong>
                          </label>
                        </div>
                        <input
                          type="date"
                          className={styles.formControl}
                          id="dob"
                          required
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.add}>
                      <div className={styles.labels}>
                        <label htmlFor="address" className={styles.formLabel}>
                          <strong>Address</strong>
                        </label>
                      </div>
                      <textarea
                        className={styles.formControl}
                        id="address"
                        rows="3"
                        placeholder="Enter your full address"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      ></textarea>
                    </div>

                    <div className={styles.ss}>
                      <label>
                        <div>
                          <strong>Select State:</strong>
                        </div>
                        <select
                          value={selectedState}
                          onChange={handleStateChange}
                          className={styles.selst}
                          aria-label="Default select example"
                        >
                          <option value="">Select a state</option>
                          {states.map((state, index) => (
                            <option key={index} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </label>

                      {districts.length > 0 && (
                        <div className={styles.sd111}>
                          <label>
                            <div>
                              <strong>Select District:</strong>
                            </div>
                            <select
                              value={selectedDistrict}
                              onChange={handleDistrictChange}
                              className={styles.seld}
                              aria-label="Default select example"
                            >
                              <option value="">Select a district</option>
                              {districts.map((district, index) => (
                                <option key={index} value={district}>
                                  {district}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      )}

                      {subdistricts.length > 0 && (
                        <div className={styles.sss111}>
                          <label>
                            <div>
                              <strong>Select Subdistrict:</strong>
                            </div>
                            <select
                              value={selectedSubdistrict}
                              className={styles.selsd}
                              aria-label="Default select example"
                              onChange={handleSubdistrictChange}
                            >
                              <option value="">Select a subdistrict</option>
                              {subdistricts.map((subdistrict, index) => (
                                <option key={index} value={subdistrict}>
                                  {subdistrict}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      )}

                      {areas.length > 0 && (
                        <div className={styles.sa111}>
                          <label>
                            <div>
                              <strong>Select Area:</strong>
                            </div>
                            <select
                              className={styles.sela}
                              aria-label="Default select example"
                            >
                              <option value="">Select an area</option>
                              {areas.map((area, index) => (
                                <option key={index} value={area}>
                                  {area}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      )}
                    </div>

                    <div className={styles.pincode}>
                      <div className={styles.labels}>
                        <label htmlFor="pincode" className={styles.formLabel}>
                          <strong>Pincode</strong>
                        </label>
                      </div>
                      <input
                        type="number"
                        className={styles.formControl}
                        id="pincode"
                        placeholder="Enter 6-digit pincode"
                        required
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>

                    <div className={styles.pln}>
                      <div className={styles.pit}>
                        <div className={styles.labels}>
                          <label
                            htmlFor="photoidtype"
                            className={styles.formLabel}
                          >
                            <strong>Photo-Id Type</strong>
                          </label>
                        </div>
                        <select
                          className={styles.formSelect}
                          id="photoidtype"
                          required
                          onChange={(e) => setPhotoidtype(e.target.value)}
                        >
                          <option value="">Choose...</option>
                          <option value="Aadhaar">Aadhaar</option>
                          <option value="PAN">PAN</option>
                        </select>
                      </div>

                      <div className={styles.pinn}>
                        <div className={styles.labels}>
                          <label
                            htmlFor="photoidnumber"
                            className={styles.formLabel}
                          >
                            <strong>Photo-Id Number</strong>
                          </label>
                        </div>
                        <input
                          type="number"
                          className={styles.formControl}
                          id="photoidnumber"
                          placeholder="Enter ID number"
                          required
                          onChange={(e) => setPhotoidnumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <h1 className={styles.pdtext}>Bank Details</h1>

                  <div className={styles.bs}>
                    <div className={styles.bfl1}>
                      <div className={styles.ifsc}>
                        <div className={styles.labels}>
                          <label htmlFor="ifsc" className={styles.formLabel}>
                            <strong>IFSC Code</strong>
                          </label>
                        </div>
                        <input
                          type="text"
                          className={styles.formControl}
                          id="ifsc"
                          placeholder="Enter IFSC code"
                          required
                          onChange={(e) => setIfsc(e.target.value)}
                        />
                      </div>

                      <div className={styles.accname}>
                        <div className={styles.labels}>
                          <label
                            htmlFor="accountname"
                            className={styles.formLabel}
                          >
                            <strong>Account Holder Name</strong>
                          </label>
                        </div>
                        <input
                          type="text"
                          className={styles.formControl}
                          id="accountname"
                          placeholder="Enter account holder's name"
                          required
                          onChange={(e) => setAccountname(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.bfl2}>
                      <div className={styles.bn}>
                        <div className={styles.labels}>
                          <label
                            htmlFor="bankname"
                            className={styles.formLabel}
                          >
                            <strong>Bank Name</strong>
                          </label>
                        </div>
                        <input
                          type="text"
                          className={styles.formControl}
                          id="bankname"
                          placeholder="Enter bank name"
                          required
                          onChange={(e) => setBankname(e.target.value)}
                        />
                      </div>

                      <div className={styles.baccn}>
                        <div className={styles.labels}>
                          <label
                            htmlFor="accountnumber"
                            className={styles.formLabel}
                          >
                            <strong>Bank Account Number</strong>
                          </label>
                        </div>
                        <input
                          type="number"
                          className={styles.formControl}
                          id="accountnumber"
                          placeholder="Enter bank account number"
                          required
                          onChange={(e) => setAccountnumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.bfl3}>
                      <div className={styles.bbn}>
                        <div className={styles.labels}>
                          <label
                            htmlFor="branchname"
                            className={styles.formLabel}
                          >
                            <strong>Branch Name</strong>
                          </label>
                        </div>
                        <input
                          type="text"
                          className={styles.formControl}
                          id="branchname"
                          placeholder="Enter branch name"
                          required
                          onChange={(e) => setBranchname(e.target.value)}
                        />
                      </div>

                      <div className={styles.bba}>
                        <div className={styles.labels}>
                          <label
                            htmlFor="branchaddress"
                            className={styles.formLabel}
                          >
                            <strong>Branch Address</strong>
                          </label>
                        </div>
                        <input
                          type="text"
                          className={styles.formControl}
                          id="branchaddress"
                          placeholder="Enter branch address"
                          required
                          onChange={(e) => setBranchaddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <h1 className={styles.pdtext}>Upload Documents</h1>

                  <div className={styles.pig}>
                    <div className={styles.img111}>
                      <div className={styles.labels}>
                        <label htmlFor="formFile1" className={styles.formLabel}>
                          <strong>Upload Passbook</strong>
                        </label>
                      </div>
                      <input
                        className={styles.formControl}
                        type="file"
                        id="formFile1"
                        onChange={handleImageChange1}
                      />
                    </div>

                    {imagePreview1 && (
                      <div>
                        <img
                          src={imagePreview1}
                          alt="Preview"
                          className={styles.previewImage}
                        />
                        <button type="button" onClick={removeImage1}>
                          Remove Image
                        </button>
                      </div>
                    )}

                    <div className={styles.img112}>
                      <div className={styles.labels}>
                        <label htmlFor="formFile2" className={styles.formLabel}>
                          <strong>Upload ID Proof (Aadhaar, PAN, etc.)</strong>
                        </label>
                      </div>
                      <input
                        className={styles.formControl}
                        type="file"
                        id="formFile2"
                        onChange={handleImageChange2}
                      />
                    </div>

                    {imagePreview2 && (
                      <div>
                        <img
                          src={imagePreview2}
                          alt="Preview"
                          className={styles.previewImage}
                        />
                        <button type="button" onClick={removeImage2}>
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>

                  <button className={styles.btnSubmit} type="submit">
                    Submit Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
