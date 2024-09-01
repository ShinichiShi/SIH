import { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { app } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import styles from '../Buyer/signup.module.css'; // Import the CSS Module

const auth = getAuth(app);

const FSignup = () => {
  const [phno, setphno] = useState('');
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    if (phno === '' || phno === undefined) {
      alert('INVALID PHONE NUMBER');
    }
    try {
      const response = await Recaptcha(phno);
      console.log(response);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    console.log(phno);
  };

  function Recaptcha(phno) {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {}
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phno, recaptchaVerifier);
  }

  return (
    <>
      <div className={styles.mainvg}>
        <div className={styles.bgimg}>
          <div className={styles.fade}>
            <div className={styles.headervg}>{/* Header content */}</div>
            <div className={styles.boxvg}>
              <div className={styles.containervg}>
                <div className={styles.heading}>
                  <h1>Create Account</h1>
                </div>
                <div className={styles.formvg}>
                  <PhoneInput
                    defaultCountry="IN"
                    value={phno}
                    onChange={setphno}
                    placeholder="Phone Number"
                    className={styles.i2}
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
                <div className={styles.btn}>
                  <button onClick={getOtp} className={styles.bt1}>Send OTP</button>
                </div>
                <p className={styles.p1}>
                  Already have an account?{' '}
                  <a onClick={() => navigate('/FLogin')} className={styles.a1}>Login</a>
                </p>
                <div id="recaptcha-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FSignup;
