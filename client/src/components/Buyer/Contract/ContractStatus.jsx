export default function ContractStatus({ contract, key }) {
  return (
    <div className="w-full h-12 bg-green-200 flex flex-row items-center justify-between px-4 mb-2">
      {/* Assuming `contract.id` is available */}
      <div className="flex-1 text-center">{contract.date || 'N/A'}</div>
      <div className="flex-1 text-center">{contract.total || 'N/A'}</div>
      <div className="flex-1 text-center">{contract.status || 'N/A'}</div>
      <div className="flex-1 text-center text-green-800 cursor-pointer">
        View Details
      </div>
    </div>
  );
}
