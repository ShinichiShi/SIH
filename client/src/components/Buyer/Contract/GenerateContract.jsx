import { useState } from "react";
import { MdDone } from "react-icons/md";
import PdfDetails from "./PdfDetails";
import Metamask from "./Metamask";
import Download from "./Download";
export default function GenerateContract() {
  
     const steps = ["Fill Details", "Connect to Metamask", "Download Pdf"];
  const [currentStep, setCurrentStep] = useState(1);
//   const [complete, setComplete] = useState(false);

  const handleNext = () => {
    if (currentStep === steps.length) {
    //   setComplete(true);
    } else {
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
              currentStep === i + 1 ? "active" : ""
            }`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center z-10 relative rounded-full font-semibold text-white ${
                currentStep === i + 1
                  ? "bg-sky-600"
                  : i < currentStep
                  ? "bg-green-600"
                  : "bg-slate-700"
              }`}
            >
              {i + 1 < currentStep  ? (
                <MdDone size={24} />
              ) : (
                i + 1
              )}
            </div>
            <p
              className={`mt-2 ${
                i + 1 < currentStep  ? "text-white" : "text-gray-500"
              }`}
            >
              {step}
            </p>
            {i !== 0 && (
              <div
                className={`absolute w-full h-[3px] top-1/2 transform -translate-y-1/2 ${
                  i < currentStep  ? "bg-green-600" : "bg-slate-200"
                }`}
                style={{ right: "50%" }}
              />
            )}
          </div>
        ))}
      </div>
    {steps[currentStep-1] === 'Fill Details' && (
      <>
        <PdfDetails />
      </>
    )}
    {currentStep === 'Connect to Metamask' && (
      <>
        <Metamask/>
      </>
    )}
    {currentStep === 'Download Pdf' && (
      <>
        <Download/>
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
            onClick={handleNext}
            >
            {currentStep === steps.length ? "Generate Another" : "Next"}
          </button>
        </div>
      
        </div>
    </>
  );
}
