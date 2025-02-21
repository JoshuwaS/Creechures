export const PacksTab = () => {
    return (
      <div>
        <h2 className="text-xl mb-4">Pack Shop</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700 rounded">
            <h3>Starter Pack</h3>
            <p className="text-sm text-gray-400 mt-2">Contains 1 Neural Master and 3 Synthetics</p>
            <button className="mt-4 px-4 py-2 bg-purple-600 rounded w-full">Coming Soon</button>
          </div>
        </div>
      </div>
    );
  };