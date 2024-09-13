import BDealsSection from './BDealsSection';
function BDeals() {
  return (
    <div className="flex px-4 py-6">
      {/* Sidebar Section */}
      <aside className="w-1/4 pr-4">
        {/* Categories */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">All Categories</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="text-gray-700 hover:text-green-500">
                Vegetables (10)
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-700 hover:text-green-500">
                Fruits (15)
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-700 hover:text-green-500">
                Beverages (12)
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-700 hover:text-green-500">
                Snacks (5)
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-700 hover:text-green-500">
                Frozen Foods (8)
              </a>
            </li>
          </ul>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">Price</h2>
          <input type="range" min="0" max="1000" className="w-full" />
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">Rating</h2>
          <ul>
            <li className="mb-2">
              <input type="checkbox" /> 5 Stars
            </li>
            <li className="mb-2">
              <input type="checkbox" /> 4 Stars
            </li>
            <li className="mb-2">
              <input type="checkbox" /> 3 Stars
            </li>
            <li className="mb-2">
              <input type="checkbox" /> 2 Stars
            </li>
            <li className="mb-2">
              <input type="checkbox" /> 1 Star
            </li>
          </ul>
        </div>

        {/* Popular Tags */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-200 rounded">Organic</span>
            <span className="px-2 py-1 bg-gray-200 rounded">Fresh</span>
            <span className="px-2 py-1 bg-gray-200 rounded">Healthy</span>
            <span className="px-2 py-1 bg-gray-200 rounded">Discount</span>
          </div>
        </div>
      </aside>

      {/* Deals Section */}
      <main className="w-3/4">
        {/* Sorting and Filter Bar */}
        <div className="flex justify-end items-center mb-6">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded">
              Filter
            </button>
            <select className="px-4 py-2 border rounded">
              <option>Sort by</option>
              <option>Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex flex-col gap-3">
          <BDealsSection />
          <BDealsSection />
          <BDealsSection />
          <BDealsSection />
        </div>
        {/* Pagination */}
        {/* <div className="flex justify-center mt-6">
          <button className="px-4 py-2 bg-gray-200 rounded mx-1">1</button>
          <button className="px-4 py-2 bg-gray-200 rounded mx-1">2</button>
          <button className="px-4 py-2 bg-gray-200 rounded mx-1">3</button>
        </div> */}
      </main>
    </div>
  );
}

export default BDeals;
