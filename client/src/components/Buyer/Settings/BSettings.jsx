import { useState } from 'react';
import ProfileSetting from './ProfileSetting';
import PaymentSetting from './PaymentSetting';
import ContractSetting from './ContractSetting';
export default function BSettings() {
  const [choice, setChoice] = useState('profile');
  return (
    <>
      <div className="w-full mx-auto p-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-white shadow p-4">
            <div className="space-y-4">
              <div
                className={` p-3 text-gray-700 rounded-lg flex items-center cursor-pointer space-x-2 ${choice === 'profile' ? 'bg-green-200 font-bold' : ''}`}
                onClick={() => {
                  setChoice('profile');
                }}
              >
                <span>Profile</span>  
              </div>
              <div
                className={`p-3 text-gray-700 rounded-lg flex items-center cursor-pointer space-x-2 ${choice === 'payment' ? 'bg-green-200 font-bold' : ''}`}
                onClick={() => {
                  setChoice('payment');
                }}
              >
                <span>Payment Credentials</span>
              </div>
              <div
                className={`p-3 text-gray-700 rounded-lg flex items-center cursor-pointer space-x-2 ${choice === 'contract' ? 'bg-green-200 font-bold' : ''}`}
                onClick={() => {
                  setChoice('contract');
                }}
              >
                <span>Contract History</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {choice === 'profile' && <ProfileSetting />}
          {choice === 'contract' && <ContractSetting />}
          {choice === 'payment' && <PaymentSetting />}
        </div>
      </div>
    </>
  );
}
