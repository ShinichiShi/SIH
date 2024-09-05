import { useForm } from "react-hook-form";
import { Document, Page, Text, PDFDownloadLink } from "@react-pdf/renderer";

// PDF Document Component
const ContractPDF = ({ formData }) => (
  <Document>
    <Page>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Contract Agreement</Text>
      <Text>Farmer Name: {formData.farmerName}</Text>
      <Text>Buyer Name: {formData.buyerName}</Text>
      <Text>Contract Date: {formData.contractDate}</Text>
      <Text>Crop: {formData.crop}</Text>
      <Text>Quantity: {formData.quantity}</Text>
      <Text>Price: {formData.price}</Text>
      <Text>Delivery Date: {formData.deliveryDate}</Text>
    </Page>
  </Document>
);

// Contract Form Component
const PdfDetails = () => {
  const { register, handleSubmit, watch } = useForm();
  const formData = watch(); // To watch form changes

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Contract</h2>
      <form className="space-y-4" onSubmit={handleSubmit(() => {})}>
        <div>
          <label className="block text-gray-700">Farmer Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("farmerName", { required: true })}
          />
        </div>
        <div>
          <label className="block text-gray-700">Buyer Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("buyerName", { required: true })}
          />
        </div>
        <div>
          <label className="block text-gray-700">Contract Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("contractDate", { required: true })}
          />
        </div>
        <div>
          <label className="block text-gray-700">Crop</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("crop", { required: true })}
          />
        </div>
        <div>
          <label className="block text-gray-700">Quantity (in kg)</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("quantity", { required: true })}
          />
        </div>
        <div>
          <label className="block text-gray-700">Price per kg</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("price", { required: true })}
          />
        </div>
        <div>
          <label className="block text-gray-700">Delivery Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("deliveryDate", { required: true })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Generate PDF
        </button>
      </form>

      {/* Display PDF Download link only if form is filled */}
      {formData.farmerName && (
        <div className="mt-6">
          <PDFDownloadLink
            document={<ContractPDF formData={formData} />}
            fileName="contract.pdf"
            className="text-blue-500 underline"
          >
            Download Contract PDF
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default PdfDetails;
