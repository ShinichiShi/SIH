export default function PaymentSetting() {
  return (
    <div className="w-3/4 ml-8">
      <div className="bg-white shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
        <div className="flex space-x-6">
          <div className="flex-grow space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="IFSC code"
                className="w-1/2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                placeholder="Bank Name"
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
            </div>
            <input
              type="email"
              placeholder="Branch Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Account Holder Name as per Bank A/c"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Bank Account No."
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Confirm Account No."
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Account Holder Name as per Bank A/c"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Branch Address"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex flex-row items-center space-y-4 gap-4">
              <span className="text-lg"> Upload Digital Signature:</span>
              <input type="file" name="signature" id="name" />
            </div>
            {/* Add in captcha for this ? */}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded">
            Edit
          </button>
          <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
      
    </div>
  );
}
