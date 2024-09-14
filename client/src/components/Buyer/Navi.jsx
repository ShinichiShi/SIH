import styles from './signup.module.css';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navi() {
  const navigate = useNavigate();
  return (
    <div className={styles.navi}>
      <div className={styles.brand} onClick={() => navigate('/')}>
        <div className={styles.first}>
          <h1>Krishi</h1>
        </div>
        <div className={styles.second}>
          <h1>Seva</h1>
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.bt3} onClick={() => navigate('/')}>
          <FaHome />
          <h2>Home</h2>
        </button>
      </div>
    </div>
  );
}
