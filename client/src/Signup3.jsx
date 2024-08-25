import { useState } from 'react';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Signup3 = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const configureCaptcha = () => {
    // window.recaptchaVerifier = new RecaptchaVerifier(
      const recaptcha = new RecaptchaVerifier( 
      'sign-in-button',
      {
       
      },
      auth
    );
  };
  // const sendOTP = async () => {
  //   try {
  //     const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', { size: 'invisible',
        // {callback: (response) => {
        //   console.log('reCAPTCHA verified', response);
        //   onSignInSubmit();
        // },
        // defaultCountry: 'IN',});
  //     const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
  //     console.log(confirmation);
  //     setUser(confirmation)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const onSignInSubmit = async (e) => {
    e.preventDefault();
    // configureCaptcha();
    const phoneNumber = `+91${mobile}`;
    // const appVerifier = window.recaptchaVerifier;

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {});


      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
      setVerificationId(confirmationResult.verificationId);
      console.log('OTP has been sent');
    } catch (error) {
      console.log('SMS not sent', error);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();

    if (!verificationId) {
      console.log('Verification ID not found');
      return;
    }

    try {
      const result = await window.confirmationResult.confirm(otp);
      console.log('User is verified', JSON.stringify(result.user));
      alert('User is verified');
    } catch (error) {
      console.log('Invalid OTP', error);
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={onSignInSubmit}>
        <div id="sign-in-button"></div>
        <input
          type="number"
          name="mobile"
          placeholder="Mobile number"
          required
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Enter OTP</h2>
      <form onSubmit={onSubmitOTP}>
        <input
          type="number"
          name="otp"
          placeholder="OTP Number"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup3;
