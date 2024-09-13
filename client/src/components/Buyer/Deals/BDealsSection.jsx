export default function BDealsSection() {
  return (
    <div className="bg-white p-4 rounded shadow flex gap-4">
      <img
        src="https://via.placeholder.com/100"
        alt="Profile"
        className="rounded-full border border-gray-300"
      />
      <div>
        <h3 className="text-gray-800 font-semibold mb-2">Green Cabbage</h3>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
