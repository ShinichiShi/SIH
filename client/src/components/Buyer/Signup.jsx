import { useState } from 'react';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import Navi from './Navi';
import styles from './signup.module.css'; // Import the CSS Module
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import img from '../../assets/bgimg.jpeg';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export default function Signup() {
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const navigate = useNavigate();

  const signupWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      toast.success('Welcome');
      navigate('/buyer');
    });
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        toast.success('Welcome');
        navigate('/buyer');
        const user = auth.currentUser;
        console.log(user);
      });
    } catch (error) {
      toast.error('Error signing in:', error);
    }
  };

  return (
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
                <h1>Create Account</h1>
              </div>
              <div className={styles.formvg}>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  className={styles.i1}
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setpass(e.target.value)}
                  value={password}
                  className={styles.i1}
                />
                <div className={styles.google}>
                  <button onClick={signupWithGoogle} className={styles.bt1}>
                    <FcGoogle />
                    <span>Sign In With Google</span>
                  </button>
                </div>
                <div className={styles.btn}>
                  <button onClick={create} className={styles.bt1}>
                    Create Account
                  </button>
                </div>
                <p className={styles.p1}>
                  Already have an account?{' '}
                  <a onClick={() => navigate('/login')} className={styles.a1}>Login</a><br></br>
                  Signup as a Farmer{' '}
                  <a onClick={() => navigate('/fsignup')} className={styles.a1}>Click Here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
