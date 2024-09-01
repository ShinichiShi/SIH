import { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { toast, ToastContainer } from 'react-toastify';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { app } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import styles from '../Buyer/signup.module.css'; // Import the CSS Module
import Navi from '../Buyer/Navi';
import img from '../../assets/bgimg.jpeg';

const auth = getAuth(app);

const FSignup = () => {
  const [phno, setphno] = useState('');
  const navigate = useNavigate();
  const [otp,setOtp]=useState("");
  const [flag,setflag]=useState(false)
  const [flagg,setflagg]=useState(false)
  const [confirmobj,setconfirmobj]=useState("");

  const getOtp = async (e) => {
    e.preventDefault();
    if (phno === '' || phno === undefined) {
      toast.error('INVALID PHONE NUMBER');
    }
    else{
      try {
        const response = await Recaptcha(phno);
        console.log(response);
        setconfirmobj(response)
        setflag(true)
      } catch (error) {
        setflagg(false)
        toast.error(`Error: ${error.message}`);
      }
      console.log(phno);
    }
  };

  function Recaptcha(phno) {
    setflagg(true)
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {}
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phno, recaptchaVerifier);
  }

  const verifyotp=async(e)=>{
    e.preventDefault();
    console.log(otp);
    if(otp ==="" || opt===null) return;
    try{
      await confirmobj.confirm(otp)
      //navigate here
    }catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  }

  return (
    <>
      <div className={styles.mainvg}>
        <div className={styles.bgimg}>
          <img src={img} alt="" />
          <div className={styles.fade}>
            <div className={styles.headervg}><Navi/></div>
            <div className={styles.boxvg}>
              <div className={styles.containervg}>
                <div className={styles.heading}>
                  <h1>Create Account</h1>
                </div>
                <div className={styles.formvg} style={{display: !flag? "block":"none"}}>
                  <PhoneInput
                    defaultCountry="IN"
                    value={phno}
                    onChange={setphno}
                    placeholder="Phone Number"
                    className={styles.i4}
                  /><br></br>
                <div className={styles.btn}>
                  <button onClick={getOtp} className={styles.bt1}>Send OTP</button>
                </div>
                </div>
                <div className={styles.formvg} style={{display: flag ?"block":"none"}}>
                  <input
                    type='text'
                    onChange={(e)=>setOtp(e.target.value)}
                    placeholder="Enter Otp"
                    className={styles.i2}
                    style={{ backgroundColor: 'transparent',borderBottom:'2px solid gray'}}
                  /><br></br><br></br>
                <div className={styles.btn}>
                  <button onClick={verifyotp} className={styles.bt1}>Verify OTP</button>
                </div>
                </div>
                <p className={styles.p1}>
                  Already have an account?{' '}
                  <a onClick={() => navigate('/FLogin')} className={styles.a1}>Login</a><br></br>
                  Are you a Buyer?{' '}
                  <a onClick={() => navigate('/signup')} className={styles.a1}>Click Here</a>
                </p>
                <div id="recaptcha-container" className={styles.captcha} style={{display: flagg? "block":"none"}}></div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default FSignup;
