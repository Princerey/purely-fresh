export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#074F3B]">Categories</h2>
      <ul className="space-y-4">
        <li>
          <h3 className="text-lg font-semibold text-[#074F3B]">Fruits</h3>
        </li>
        <li>
          <h3 className="text-lg font-semibold text-[#074F3B]">Vegetables</h3>
        </li>
        <li>
          <h3 className="text-lg font-semibold text-[#074F3B]">Dairy Products</h3>
        </li>
        <li>
          <h3 className="text-lg font-semibold text-[#074F3B]">Bakery Items</h3>
        </li>
        <li>
          <h3 className="text-lg font-semibold text-[#074F3B]">Snacks</h3>
        </li>
        <li>
          <h3 className="text-lg font-semibold text-[#074F3B]">Beverages</h3>
        </li>
        <li>
          <h3 className="text-lg font-semibold text-[#074F3B]">Household Supplies</h3>
        </li>
        <li>
          <h3 className="text-lg font-semibold text-[#074F3B]">Personal Care</h3>
        </li>
      </ul>
      <button className="mt-6 bg-[#074F3B] text-white py-2 px-4 rounded hover:bg-[#053d28]">
        Filter
      </button>
    </aside>
  );
}
