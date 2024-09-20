import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function FNavbar({ handleNavigate, navigate }) {
  const navigateChat = useNavigate();

  return (
    <nav className="bg-white border-t">
      <div className=" mx-auto flex justify-between items-center px-4 py-3">
        <ul className="flex space-x-5">
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'explore' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('explore')}
          >
            Explore
          </li>
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'sell_crops' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('sell_crops')}
          >
            Sell Crops
          </li>
                   
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'settings' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('settings')}
          >
            Settings
            </li>
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'chat' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => {
              navigateChat('/chat',{
                state: { userType: 'farmers' }, 
            })
          }}
          >
            Chats

          </li>
        </ul>
      </div>
    </nav>
  );
}

FNavbar.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
  navigate: PropTypes.string.isRequired,
};
