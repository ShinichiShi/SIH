import { useState } from 'react';
import { MdDone } from 'react-icons/md';
import PdfDetails from './PdfDetails';
import Metamask from './Metamask';
import Download from './Download';
import { ToastContainer,toast } from 'react-toastify';
export default function GenerateContract() {
  const [formData, setFormData] = useState({
    date: '',
    farmerId: '0x5993D0db1b64f5DC1aD2770a889dF6B9D0491449',
    buyerId: '',
    buyerName: '',
    farmerName: '',
    crop: '',
    totalAmt: 0,
    installmentAmt: 0,
    location: '',
  });
  const [flag, setFlag] = useState(false)
  const [validationErrors, setValidationErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.farmerId) errors.farmerId = 'Farmer ID is required';
    if (!formData.farmerName) errors.farmerName = 'Farmer name is required';
    if (!formData.crop) errors.crop = 'Crop is required';
    if (formData.totalAmt <= 0)
      errors.totalAmt = 'Total amount must be greater than 0';
    if (formData.installmentAmt <= 0)
      errors.installmentAmt = 'Installment amount must be greater than 0';
    if (!formData.location) errors.location = 'Location is required';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGenerateNext = () => {
    setFormData({
      date: '',
      farmerId: '0x5993D0db1b64f5DC1aD2770a889dF6B9D0491449',
      buyerId: '',
      buyerName: '',
      farmerName: '',
      crop: '',
      totalAmt: 0,
      installmentAmt: 0,
      location: '',
    });
    setValidationErrors({})
    setCurrentStep(1)
  };
  const steps = ['Fill Details', 'Sign via Metamask', 'Download Pdf'];
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep === 1) {
      const errors = validateForm();
      if (Object.keys(errors).length === 0) {
        setValidationErrors({});
        setCurrentStep((prev) => prev + 1);
      } else {
        setValidationErrors(errors);
        alert('fill all details');
      }
    } 
    else if(currentStep == 2) {
      if(flag!=true){
        toast.error('Sign contract to proceed')
      }
      else {
        setCurrentStep((prev) => prev + 1);
      }
    } 
    else if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  return (
    <>
      <div className="w-3/4 p-4 h-full shadow  rounded-4 flex flex-col self-start items-start justify-start gap-2">
        <div className="flex w-full justify-between">
          {steps?.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col w-full justify-center items-center ${
                currentStep === i + 1 ? 'active' : ''
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center z-10 relative rounded-full font-semibold text-white ${
                  currentStep === i + 1
                    ? 'bg-sky-600'
                    : i < currentStep
                      ? 'bg-green-600'
                      : 'bg-slate-700'
                }`}
              >
                {i + 1 < currentStep ? <MdDone size={24} /> : i + 1}
              </div>
              <p
                className={`mt-2 ${
                  i + 1 < currentStep ? 'text-white' : 'text-gray-500'
                }`}
              >
                {step}
              </p>
              {i !== 0 && (
                <div
                  className={`absolute w-full h-[3px] top-1/2 transform -translate-y-1/2 ${
                    i < currentStep ? 'bg-green-600' : 'bg-slate-200'
                  }`}
                  style={{ right: '50%' }}
                />
              )}
            </div>
          ))}
        </div>
        {steps[currentStep - 1] === 'Fill Details' && (
          <>
            <PdfDetails formData={formData} handleChange={handleChange} />
          </>
        )}
        {steps[currentStep - 1] === 'Sign via Metamask' && (
          <>
            <Metamask formData={formData} setFormData={setFormData} setFlag={setFlag}/>
          </>
        )}
        {steps[currentStep - 1] === 'Download Pdf' && (
          <>
            <Download formData={formData} />
          </>
        )}

        <div className="mt-4 flex justify-around w-full space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={
              currentStep === steps.length
                ? handleGenerateNext 
                : handleNext 
            }
          >
            {currentStep === steps.length ? 'Generate Another' : 'Next'}
          </button>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}
