import PropTypes from 'prop-types';

const PdfDetails = ({ formData, handleChange }) => {
  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Fill Contract Details</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Date: </label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Farmer Name: </label>
          <input
            type="text"
            name="farmerName"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.farmerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Farmer ID: </label>
          <input
            type="text"
            name="farmerId"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.farmerId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Crop Being Harvested: </label>
          <input
            type="text"
            name="crop"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.crop}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 flex-col">
          <label>Total Amount to Be Paid: </label>
          <input
            type="number"
            name="totalAmt"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.totalAmt}
            onChange={handleChange}
          />
          <label>Amount to Be Paid in each Installment: </label>
          <input
            type="number"
            name="installmentAmt"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.installmentAmt}
            onChange={handleChange}
          />
          <select
            name="unit"
            id="unit"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.unit}
            onChange={handleChange}
          >
            <option value="unit">Select Unit</option>
            <option value="gwei">Gwei</option>
            <option value="ether">Ether</option>
            <option value="finney">Finney</option>
            <option value="kether">Kether</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Location: </label>
          <input
            type="text"
            name="location"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

PdfDetails.propTypes = {
  formData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    farmerName: PropTypes.string.isRequired,
    farmerId: PropTypes.string.isRequired,
    crop: PropTypes.string.isRequired,
    totalAmt: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    installmentAmt: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    location: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PdfDetails;
