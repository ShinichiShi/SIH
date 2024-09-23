import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import GoogleTranslateWidget from '../GoogleTranslateWidget';
function BHeader() {

  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged Out');
      navigate('/login');
    } catch (error) {
      toast.error('Error signing out:', error);
    }
  };
  

  return (
    <div className="h-20 font-sans">
      <div className="bg-white h-full shadow flex w-full">
        <div className=" w-full flex justify-between items-center  px-4">
          <div className="text-green-500 text-2xl font-bold">KrishiSeva</div>
          <h1>Welcome to KrishiSeva</h1>
          <div>
            <div className="flex items-center justify-center gap-4">
              <div>
                <GoogleTranslateWidget />
              </div>
              
              <button
                className="py-2 px-2 border rounded-lg flex items-center justify-center bg-green-500 hover:bg-green-600 text-white"
                onClick={handleLogout}
              >
               Logout
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default BHeader;
