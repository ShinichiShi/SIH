import { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';
import styles from '../Buyer/signup.module.css'; // Import the CSS Module
import Navi from '../Buyer/Navi';
import { toast, ToastContainer } from 'react-toastify';
import img from '../../assets/bgimg.jpeg';
import { getAuth } from 'firebase/auth';
import { app } from '../../../firebase';

const auth = getAuth(app);
const FLogin = () => {
  const [phno, setphno] = useState('');
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await signInWithPhoneNumber(auth, phno).then(() => {
        toast.success('Welcome');
        navigate('/farmerdashboard');
      });
    } catch (error) {
      // Handle errors here
      toast.error('Error Loging in:', error);
    }
  };

  return (
    <>
      <div className={styles.mainvg}>
        <div className={styles.bgimg}>
          <img src={img} alt="" />
          <div className={styles.fade}>
            <div className={styles.headervg}>
              <Navi />
            </div>
            <div className={styles.boxvg}>
              <div className={styles.containervg}>
                <div className={styles.heading}>
                  <h1>Login as Farmer</h1>
                </div>
                <div className={styles.formvg}>
                  <PhoneInput
                    defaultCountry="IN"
                    value={phno}
                    onChange={setphno}
                    placeholder="Phone Number"
                    className={styles.i3}
                  />
                </div>
                <div className={styles.btn}>
                  <button
                    className={styles.bt1}
                    onClick={loginUser}
                    onChange={setphno}
                  >
                    Login
                  </button>
                </div>
                <p className={styles.p1}>
                  Don&apos;t have an account?{' '}
                  <a onClick={() => navigate('/FSignup')} className={styles.a1}>
                    Register
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default FLogin;
