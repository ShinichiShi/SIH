import ContractStatus from './ContractStatus';
export default function BContract() {
  return (
    <div className="w-full flex justify-center bg-slate-50">
      <div className="w-3/4 p-4 container h-full shadow flex flex-col items-center justify-center gap-2">
        <div className="font-bold text-xl self-start">Contract History :</div>
        <div className="w-full h-8 bg-slate-400 flex flex-row items-center justify-around">
          <div>Order ID</div>
          <div>Date</div>
          <div>Total</div>
          <div>Status</div>
          <div></div>
        </div>
        <ContractStatus />
        <ContractStatus />
        <ContractStatus />
        <ContractStatus />
      </div>
    </div>
  );
}
