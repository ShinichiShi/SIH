import { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';
import styles from '../Buyer/signup.module.css'; // Import the CSS Module

const FLogin = () => {
  const [phno, setphno] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.mainvg}>
        <div className={styles.bgimg}>
          <div className={styles.fade}>
            <div className={styles.headervg}>{/* Header content */}</div>
            <div className={styles.boxvg}>
              <div className={styles.containervg}>
                <div className={styles.heading}>
                  <h1>Login</h1>
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
                  <button className={styles.bt1}>Login</button>
                </div>
                <p className={styles.p1}>
                  Don&apos;t have an account?{' '}
                  <a onClick={() => navigate('/FSignup')} className={styles.a1}>Register</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FLogin;
