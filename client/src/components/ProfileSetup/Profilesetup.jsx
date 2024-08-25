import { useState,useEffect } from 'react';
import './profilesetup.css';

import { db } from '../../../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function Profilesetup() {
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
    fetch('http://localhost:5002/states')
      .then(response => response.json())
      .then(data => setStates(data));
  }, []);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    fetch(`http://localhost:5002/districts/${state}`)
      .then(response => response.json())
      .then(data => {
        setDistricts(data);
        setSubdistricts([]);
        setAreas([]);
      });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    fetch(`http://localhost:5002/subdistricts/${selectedState}/${district}`)
      .then(response => response.json())
      .then(data => {
        setSubdistricts(data);
        setAreas([]);
      });
  };

  const handleSubdistrictChange = (e) => {
    const subdistrict = e.target.value;
    setSelectedSubdistrict(subdistrict);
    fetch(`http://localhost:5002/areas/${selectedState}/${selectedDistrict}/${subdistrict}`)
      .then(response => response.json())
      .then(data => setAreas(data));
  };

  const userCollectionRef = collection(db, 'farmerdata');

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
    if (!firstname) tempErrors.firstname = "First name is required.";
    if (!lastname) tempErrors.lastname = "Last name is required.";
    if (!gender) tempErrors.gender = "Gender is required.";
    if (!dob || new Date(dob) >= new Date('2003-01-01')) tempErrors.dob = "DOB must be before 2002.";
    if (!address) tempErrors.address = "Address is required.";
    if (!pincode || pincode.length !== 6) tempErrors.pincode = "Pincode must be 6 digits.";
    if (!photoidtype) tempErrors.photoidtype = "Photo ID type is required.";
    if (!photoidnumber) tempErrors.photoidnumber = "Photo ID number is required.";
    if (!ifsc) tempErrors.ifsc = "IFSC code is required.";
    if (!accountnumber) tempErrors.accountnumber = "Account number is required.";
    if (!bankname) tempErrors.bankname = "Bank name is required.";
    if (!branchname) tempErrors.branchname = "Branch name is required.";
    if (!branchaddress) tempErrors.branchaddress = "Branch address is required.";

    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fill all required fields correctly.");
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
      <div className="row mt-4">
        <div className="col-3">
          <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
            <nav className="nav nav-pills flex-column btn-success">
              <a className="nav-link" href="#item-1">Registration Form</a>
            </nav>
          </nav>
        </div>
        <div className="col-8">
          <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabIndex="0">
            <div id="item-1">
              <h1>Personal Details</h1>
              <form className="needs-validation" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-5">
                    <label htmlFor="firstName" className="form-label"><strong>First Name</strong></label>
                    <input type="text" className="form-control" id="firstName" placeholder="Enter first name" required onChange={(e) => setFirstname(e.target.value)} />
                  </div>

                  <div className="col-sm-5">
                    <label htmlFor="lastName" className="form-label"><strong>Last Name</strong></label>
                    <input type="text" className="form-control" id="lastName" placeholder="Enter last name" required onChange={(e) => setLastname(e.target.value)} />
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="Gender" className="form-label"><strong>Gender</strong></label>
                    <select className="form-select" id="gender" required onChange={(e) => setGender(e.target.value)}>
                      <option value="">Choose...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="dob" className="form-label"><strong>Date of Birth</strong></label>
                    <input type="date" className="form-control" id="dob" required onChange={(e) => setDob(e.target.value)} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label"><strong>Address</strong></label>
                    <textarea className="form-control" id="address" rows="3" placeholder="Enter your full address" required onChange={(e) => setAddress(e.target.value)}></textarea>
                  </div>

                  <div>
      <label>
        <strong>Select State:</strong>
        <select value={selectedState} onChange={handleStateChange} className="form-select m-2" aria-label="Default select example">
          <option value="">Select a state</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      {districts.length > 0 && (
        <label>
          <strong>Select District:</strong>
          <select value={selectedDistrict} onChange={handleDistrictChange} className="form-select m-2" aria-label="Default select example">
            <option value="">Select a district</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </label>
      )}

      {subdistricts.length > 0 && (
        <label>
         <strong>Select Subdistrict:</strong> 
          <select value={selectedSubdistrict} className="form-select mx-4" aria-label="Default select example" onChange={handleSubdistrictChange}>
            <option value="">Select a subdistrict</option>
            {subdistricts.map((subdistrict, index) => (
              <option key={index} value={subdistrict}>
                {subdistrict}
              </option>
            ))}
          </select>
        </label>
      )}

      {areas.length > 0 && (
        <label>
         <strong>Select Area:</strong> 
          <select className="form-select mx-4" aria-label="Default select example">
            <option value="">Select an area</option>
            {areas.map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>

                  <div className="col-md-5">
                    <label htmlFor="pincode" className="form-label"><strong>Pincode</strong></label>
                    <input type="number" className="form-control" id="pincode" placeholder="Enter 6-digit pincode" required onChange={(e) => setPincode(e.target.value)} />
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="photoidtype" className="form-label"><strong>Photo-Id Type</strong></label>
                    <select className="form-select" id="photoidtype" required onChange={(e) => setPhotoidtype(e.target.value)}>
                      <option value="">Choose...</option>
                      <option value="Aadhaar">Aadhaar</option>
                      <option value="PAN">PAN</option>
                    </select>
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="photoidnumber" className="form-label"><strong>Photo-Id Number</strong></label>
                    <input type="number" className="form-control" id="photoidnumber" placeholder="Enter ID number" required onChange={(e) => setPhotoidnumber(e.target.value)} />
                  </div>

                  <h1>Bank Details</h1>

                  <div className="col-sm-6">
                    <label htmlFor="ifsc" className="form-label"><strong>IFSC Code</strong></label>
                    <input type="text" className="form-control" id="ifsc" placeholder="Enter IFSC code" required onChange={(e) => setIfsc(e.target.value)} />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="accountname" className="form-label"><strong>Account Holder Name</strong></label>
                    <input type="text" className="form-control" id="accountname" placeholder="Enter account holder's name" required onChange={(e) => setAccountname(e.target.value)} />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="bankname" className="form-label"><strong>Bank Name</strong></label>
                    <input type="text" className="form-control" id="bankname" placeholder="Enter bank name" required onChange={(e) => setBankname(e.target.value)} />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="accountnumber" className="form-label"><strong>Bank Account Number</strong></label>
                    <input type="number" className="form-control" id="accountnumber" placeholder="Enter bank account number" required onChange={(e) => setAccountnumber(e.target.value)} />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="branchname" className="form-label"><strong>Branch Name</strong></label>
                    <input type="text" className="form-control" id="branchname" placeholder="Enter branch name" required onChange={(e) => setBranchname(e.target.value)} />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="branchaddress" className="form-label"><strong>Branch Address</strong></label>
                    <input type="text" className="form-control" id="branchaddress" placeholder="Enter branch address" required onChange={(e) => setBranchaddress(e.target.value)} />
                  </div>

                  <h1>Upload Documents</h1>

                  <div className="mb-3">
                    <label htmlFor="formFile1" className="form-label"><strong>Upload Front Page of Passbook</strong></label>
                    <input className="form-control" type="file" id="formFile1" onChange={handleImageChange1} />
                  </div>

                  {imagePreview1 && (
                    <div>
                      <img src={imagePreview1} alt="Preview" className="preview-image" />
                      <button type="button" onClick={removeImage1}>Remove Image</button>
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="formFile2" className="form-label">Upload ID Proof (Aadhaar, PAN, etc.)</label>
                    <input className="form-control" type="file" id="formFile2" onChange={handleImageChange2} />
                  </div>

                  {imagePreview2 && (
                    <div>
                      <img src={imagePreview2} alt="Preview" className="preview-image" />
                      <button type="button" onClick={removeImage2}>Remove Image</button>
                    </div>
                  )}

                  <button className="w-100 btn btn-primary btn-lg" type="submit">Submit Form</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
