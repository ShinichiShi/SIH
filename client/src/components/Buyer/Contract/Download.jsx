import jsPDF from 'jspdf';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
function Download({ formData }) {
  const { t } = useTranslation(); // Initialize translation function

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text('BILATERAL CONTRACT AGREEMENT', 50, 20);
    doc.text(`THIS AGREEMENT made on this ${formData.date}`, 20, 40);
    doc.text(
      `between ${formData.buyerName} with id ${formData.buyerId}`,
      20,
      50
    );
    doc.text(
      `(hereafter described as the Buyer/Investor)`,
      20,
      60
    );
    doc.text(
      `AND ${formData.farmerName} with id ${formData.farmerId} (hereafter described as the Farmer).`,
      20,
      70
    );
    doc.text(
      `(hereafter described as the Farmer).`,
      20,
      80
    );
    doc.text(
      `WHEREAS the Buyer/Investor is interested in the promotion of quality ${formData.crop}`,
      20,
      90
    );
    doc.text(`in ${formData.location}.`, 20, 80);
    doc.text(
      `AND WHEREAS the Farmer/Cooperative/Association requires assistance in growing ${formData.crop}`,
      20,
      100
    );

    doc.text(
      `NOW THEREFORE THE Buyer and the Farmer/Cooperative/Association agree as follows:`,
      20,
      120
    );

    doc.text(`1. The Buyer agrees to provide the following:`, 20, 130);
    doc.text(`a) Technical extension and research services.`, 30, 140);
    doc.text(
      `b) All inputs required during the growing season within loan limits.`,
      30,
      150
    );
    doc.text(
      `c) An indicative price for the season's crop is ${formData.totalAmt}.`,
      30,
      160
    );
    doc.text(
      `d) Pay an installment amount of ${formData.installmentAmt}.`,
      30,
      170
    );
    doc.text(
      `2. The Farmer agrees to grow ${formData.crop} as per the Buyer's advice and not sell to another buyer.`,
      20,
      180
    );

    // Save or open the generated PDF
    doc.save('Contract_Agreement.pdf');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('download_contract_pdf')}</h2>
      <button
        type="button"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={generatePDF}
      >
        {t('generate_pdf')}
        </button>
    </div>
  );
}

Download.propTypes = {
  formData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    farmerName: PropTypes.string.isRequired,
    farmerId: PropTypes.string.isRequired,
    buyerName: PropTypes.string.isRequired,
    buyerId: PropTypes.string.isRequired,
    crop: PropTypes.string.isRequired,
    totalAmt: PropTypes.number.isRequired,
    installmentAmt: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
  }),
};

export default Download;
