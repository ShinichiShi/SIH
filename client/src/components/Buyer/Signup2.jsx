import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';

const PhoneAuth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const auth = getAuth();

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('Recaptcha verified');
        },
      },
      auth
    );
  };

  const handleSendOtp = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, `+${phone}`, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        console.log('OTP sent');
      })
      .catch((error) => {
        console.error('Error during signInWithPhoneNumber', error);
      });
  };

  const handleVerifyOtp = () => {
    const credential = auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );
    auth
      .signInWithCredential(credential)
      .then((result) => {
        console.log('User signed in successfully', result);
      })
      .catch((error) => {
        console.error('Error during verification', error);
      });
  };

  return (
    <div>
      <PhoneInput
        country={'in'}
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneAuth;
