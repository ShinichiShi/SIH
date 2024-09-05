import { useState } from 'react';
import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // Optional: if you want to use table features

const Pdf = () => {
  const [contractDetails, setContractDetails] = useState({
    buyerName: '',
    sellerName: '',
    contractDate: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractDetails({ ...contractDetails, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Contract Details', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Buyer Name: ${contractDetails.buyerName}`, 20, 30);
    doc.text(`Seller Name: ${contractDetails.sellerName}`, 20, 40);
    doc.text(`Contract Date: ${contractDetails.contractDate}`, 20, 50);
    doc.text('Details:', 20, 60);
    doc.text(contractDetails.details, 20, 70);

    doc.save('contract.pdf');
  };

  return (
    <div>
      <h2>Contract Form</h2>
      <form>
        <div>
          <label>Buyer Name:</label>
          <input
            type="text"
            name="buyerName"
            value={contractDetails.buyerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Seller Name:</label>
          <input
            type="text"
            name="sellerName"
            value={contractDetails.sellerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contract Date:</label>
          <input
            type="date"
            name="contractDate"
            value={contractDetails.contractDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Details:</label>
          <textarea
            name="details"
            value={contractDetails.details}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={generatePDF}>
          Generate PDF
        </button>
      </form>
    </div>
  );
};

export default Pdf;
