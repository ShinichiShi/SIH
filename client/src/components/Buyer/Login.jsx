import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css'; // Import the CSS Module

const auth = getAuth(app);

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const navigate = useNavigate();

  const signinUser = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        alert('success');
        navigate('/buyer');
      });
    } catch (error) {
      // Handle errors here
      alert(`Error: ${error.message}`);
    }
  };

  

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
                  <div className={styles.btn}>
                    <button onClick={signinUser} className={styles.bt1}>Login</button>
                  </div>
                  <p className={styles.p1}>
                    Don&apos;t have an account?{' '}
                    <a onClick={() => navigate('/Signup')} className={styles.a1}>Register</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
