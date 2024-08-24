import ContractHistory from "./ContractHistory"
export default function ContractSetting() {
  return (
    <div className="w-3/4 ml-8">
      <div className="bg-white shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Contract History:</h2>
        <div className="flex flex-col items-center justify-center ">
          <ContractHistory />
          <ContractHistory />
          <ContractHistory />
          <ContractHistory />
          <ContractHistory />
        </div>
       
      </div>
      
    </div>
  )
}