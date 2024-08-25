export default function ProfileSetting(){
  return (
    <div className="w-3/4 ml-8">
            <div className="bg-white shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <div className="flex space-x-6">
                <div className="flex-grow space-y-4">
                  <div className="flex space-x-4">
                    <input 
                      type="text"
                      placeholder="First Name"
                      className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Profile"
                    className="rounded-full border border-gray-300"
                  />
                  <button className="text-green-500 border border-green-500 px-4 py-2 rounded">
                    Choose Image
                  </button>
                </div>
              </div>
              <div className='flex gap-2'>
              <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded">
                Edit 
              </button>
              <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded">
                Save 
              </button>
              
              </div>
              
            </div>
            

            {/*  Address */}
            <div className="bg-white shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Address</h2>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Company Name (optional)"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-4">
                  <select className="w-1/3 p-2 border border-gray-300 rounded">
                    <option>India</option>
                  </select>
                  <input
                    type="text"
                    placeholder="States"
                    className="w-1/3 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="w-1/3 p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex space-x-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className='flex gap-2'>
              <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded">
                Edit 
              </button>
              <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded">
                Save 
              </button>
              
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className='flex gap-2'>
              <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded">
                Edit 
              </button>
              <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded">
                Save 
              </button>
              
              </div>
            </div>
          </div>
  )
}
