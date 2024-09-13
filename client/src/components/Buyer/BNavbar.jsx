import PropTypes from 'prop-types';

export default function BNavbar({ handleNavigate, navigate }) {
  return (
    <nav className="bg-white border-t">
      <div className=" mx-auto flex justify-between items-center px-4 py-3">
        <ul className="flex space-x-5">
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'deals' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('deals')}
          >
            Deals
          </li>
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'contract' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('contract')}
          >
            Contracts
          </li>
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'transactions' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('transactions')}
          >
            Transactions
          </li>
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'notifications' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('notifications')}
          >
            Notifications
          </li>
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'settings' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('settings')}
          >
            Settings
          </li>
          <li
            className={`cursor-pointer py-1 px-2 rounded-lg ${navigate === 'chat' ? 'bg-green-300' : ''} hover:bg-green-200`}
            onClick={() => handleNavigate('chats')}
          >
            Chats
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
