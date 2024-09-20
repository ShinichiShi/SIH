import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
function Download({formData}) {
    
    const generatePDF = () => {
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text('BILATERAL CONTRACT AGREEMENT', 50, 20);
      
      doc.setFontSize(12);
  
      const lineHeight = 10; // Spacing between lines
      const pageHeight = doc.internal.pageSize.height; // Get page height
      let y = 30; // Starting y position for text
  
      // Helper function to handle page breaks
      const addText = (text, x, yPosition) => {
          const textLines = doc.splitTextToSize(text, 180); // Wrap text within 180 units
          textLines.forEach(line => {
              if (yPosition + lineHeight > pageHeight - 10) { // Check if space is available
                  doc.addPage(); // Add a new page
                  yPosition = 20; // Reset y position for new page
              }
              doc.text(line, x, yPosition);
              yPosition += lineHeight;
          });
          return yPosition; // Return updated y position
      };
  
      y = addText('THIS AGREEMENT is made on the 9th day of September, 2024, between:', 10, y);
      y = addText(`${formData.buyerName}, an individual/entity with ID ${formData.buyerId},`, 10, y);
      y = addText('hereafter referred to as the "Buyer/Investor," and', 10, y);
      y = addText(`${formData.farmerName}, an individual with ID ${formData.farmerId},`, 10, y);
      y = addText('hereafter referred to as the "Farmer."', 10, y);
  
      y = addText(`Whereas the Buyer/Investor is involved in promoting and producing high-quality ${formData.crop}`, 10, y);
      y = addText(`in ${formData.location} and is committed to supporting the agricultural sector for improved`, 10, y);
      y = addText('quality and yield.', 10, y);
  
      y = addText(`The Farmer, ${formData.farmerName}, seeks technical and financial assistance from the`, 10, y);
      y = addText('Buyer/Investor for growing wheat, ensuring quality crops and fulfilling agreed terms.', 10, y);
  
      y = addText('Now, Therefore, in consideration of the mutual covenants and promises contained herein,', 10, y);
      y = addText('the parties agree as follows:', 10, y);
  
      doc.setFontSize(14);
      y = addText('Obligations of the Buyer/Investor', 10, y);
      doc.setFontSize(12);
  
      y = addText('Technical Support:', 10, y);
      y = addText('The Buyer will provide the Farmer with agricultural advice on modern farming practices, crop', 10, y);
      y = addText('management, and pest control to boost productivity.', 10, y);
  
      y = addText('Supply of Inputs:', 10, y);
      y = addText(`The Buyer agrees to provide all necessary inputs for ${formData.crop} production during the growing season,`, 10, y);
      y = addText('subject to the following conditions:', 10, y);
      y = addText(`- Loan Limits: Inputs will be supplied within pre-agreed limits, tailored to the Farmer's needs.`, 10, y);
      y = addText(`- Category-Based Assistance: Fertilizers, seeds, and pesticides provided based on land size and needs.`, 10, y);
  
      // doc.setFontSize(14);
      doc.setFontSize(12);
      y = addText('Pricing and Payment:', 10, y);
      y = addText(`The Buyer shall offer an indicative price of Rupees ${formData.totalAmt} per quintal for the ${formData.crop} crop,`, 10, y);
      y = addText(`and pay an installment of Rupees ${formData.installmentAmt} at specified intervals to cover input costs.`, 10, y);
  
      doc.setFontSize(14);
      y = addText('Obligations of the Farmer', 10, y);
      doc.setFontSize(12);
      y = addText(`Cultivation of ${formData.crop}:`, 10, y);
      y = addText(`The Farmer agrees to cultivate ${formData.crop} on their farmland under the guidance of the Buyer.`, 10, y);
      y = addText('Sustainable farming practices, timely sowing, weeding, and harvesting will be ensured.', 10, y);
  
      y = addText('Exclusive Sale of Produce:', 10, y);
      y = addText(`The Farmer agrees to sell the entire ${formData.crop} crop exclusively to the Buyer/Investor unless`, 10, y);
      y = addText('authorized in writing to sell to a third party.', 10, y);
  
      doc.setFontSize(14);
      y = addText('Mutual Agreements', 10, y);
      doc.setFontSize(12);
      y = addText('Monitoring and Reporting:', 10, y);
      y = addText('The Buyer will conduct regular field visits. The Farmer will provide progress reports as requested.', 10, y);
  
      y = addText('Conflict Resolution:', 10, y);
      y = addText(`Disputes will be resolved through mutual discussion or mediation. Jurisdiction: ${formData.location}.`, 10, y);
  
      doc.setFontSize(14);
      y = addText('Term of Agreement', 10, y);
      doc.setFontSize(12);
      y = addText(`This agreement is valid for the current ${formData.crop} growing season, with an option for renewal.`, 10, y);
  
      doc.setFontSize(14);
      y = addText('Signed:', 10, y);
      doc.setFontSize(12);
      y = addText(`${formData.buyerName} __________________`, 10, y);
      y = addText('Buyer/Investor', 10, y);
  
      y = addText(`${formData.farmerName} ________________`, 10, y);
      y = addText('Farmer', 10, y);
  
      doc.save(`Contract_Agreement_${formData.date}.pdf`);
  };
  

    return(
        <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-bold mb-4">Download Contract Pdf</h2>
            <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={generatePDF}
            >
                Generate Pdf
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
