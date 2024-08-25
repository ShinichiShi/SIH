import { useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { getAuth,signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';
import { app } from "../../../firebase";
import {useNavigate } from 'react-router-dom';
import '../Buyer/Signup.css';

const auth=getAuth(app);

const FSignup = () => {
  const [phno,setphno]=useState("")
  // const [otp,setotp]=useState("")
  const navigate=useNavigate()
  

  const getOtp= async(e)=>{
    e.preventDefault()
    if(phno === "" || phno ===undefined)
    {
      alert("INVALID PHONE NUMBER")
    }
    try{
      const response= await Recaptcha(phno);
      console.log(response)
    }catch(error){
      alert(`Error: ${error.message}`);
    }
    console.log(phno)
  }
  
  function Recaptcha(phno){
    const recaptchaVerifier=new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth,phno,recaptchaVerifier)
  }

  return (
    <>
     <div className="header">
      </div>
      <div className="box">
        <div className="container">
          <div className="heading">
            <h1>Create Account</h1>
          </div>
          <div className="form">
            <PhoneInput defaultCountry='IN' 
            value={phno}
            onChange={setphno}
            placeholder="Phone Number"/>
          </div>
          <div className="btn">
            <button onClick={getOtp}>Send OTP</button>
          </div>
          <p>
           Already have account? <a onClick={()=>{
             navigate('/FLogin')
            }}>Login</a>
          </p>
          <div id="recaptcha-container"></div>
        </div>
      </div>
    </>
  )
}

export default FSignup
