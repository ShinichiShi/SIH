import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const PdfDetails = ({ formData, handleChange }) => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('fill_contract_details')}</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">{t('date')}: </label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>{t('farmer_name')}: </label>
          <input
            type="text"
            name="farmerName"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.farmerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t('crop_being_harvested')}: </label>
          <input
            type="text"
            name="crop"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.crop}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 flex-col">
          <label>{t('total_amount_to_be_paid')}: </label>
          <input
            type="number"
            name="totalAmt"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.totalAmt}
            onChange={handleChange}
          />
          <label>{t('amount_to_be_paid_in_each_installment')}: </label>
          <input
            type="number"
            name="installmentAmt"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.installmentAmt}
            onChange={handleChange}
          />
          {/* <select
            name="unit"
            id="unit"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.unit}
            onChange={handleChange}
          >
            <option value="unit">{t('select_unit')}</option>
            <option value="gwei">{t('gwei')}</option>
            <option value="ether">{t('ether')}</option>
            <option value="finney">{t('finney')}</option>
            <option value="kether">{t('kether')}</option>
          </select> */}
        </div>

        <div>
          <label className="block text-gray-700">{t('location')}: </label>
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
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PdfDetails;
