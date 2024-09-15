import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BNavbar({ handleNavigate, navigate }) {
  const navigateChat = useNavigate();
  const { t } = useTranslation();

  return (
    <nav className="bg-white border-t">
      <div className=" mx-auto flex justify-between items-center px-4 py-3">
        <ul className="flex space-x-5">
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'deals' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('deals')}
          >
              {t('navbar.deals')}
          </li>
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'contract' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('contract')}
          >
                        {t('navbar.contracts')}

          </li>
                   
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'settings' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('settings')}
          >
            {t('navbar.settings')}
            </li>
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'chat' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => {
              navigateChat('/chat',{
                state: { userType: 'buyers' }, 
            })
          }}
          >
                        {t('navbar.chats')}

          </li>
        </ul>
      </div>
    </nav>
  );
}

BNavbar.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
  navigate: PropTypes.string.isRequired,
};
