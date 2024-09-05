import { useNavigate } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import BHeader from './Buyer/BHeader';

import errImage from '../assets/err.jpg';
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <BHeader />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <img src={errImage} alt="404 Illustration" className="w-20" />
          </div>
          <h1 className="text-6xl font-bold text-green-500">404</h1>
          <p className="mt-4 text-xl text-gray-600">Oops! Page not found</p>
          <p className="mt-2 text-gray-500">
            It looks like the page you are looking for doesn&apos;t exist or has
            been moved.
          </p>

          <button
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <MdHome /> Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
