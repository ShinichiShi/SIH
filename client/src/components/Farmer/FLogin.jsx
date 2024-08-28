import { useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
// import { getAuth,signInWithPhoneNumber} from 'firebase/auth';
// import { app,auth } from '../../../firebase';
import {useNavigate } from 'react-router-dom';
// import '../Buyer/Signup.css';

// const auth=getAuth(app);

const FLogin = () => {
  const [phno,setphno]=useState("")
  // const [otp,setotp]=useState("")
  const navigate=useNavigate()

  

  return (
    <>
     <div className="header">
      </div>
      <div className="box">
        <div className="container">
          <div className="heading">
            <h1>Login</h1>
          </div>
          <div className="form">
            <PhoneInput defaultCountry='IN' 
            value={phno}
            onChange={setphno}
            placeholder="Phone Number"/>
          </div>
          <div className="btn">
            <button >Login</button>
          </div>
          <p>
           Don&apos;t have account? <a onClick={()=>{
            navigate('/FSignup')
           }}>Register</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default FLogin
