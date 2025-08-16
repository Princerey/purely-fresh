import Link from 'next/link';

const SecondaryNavbar = () => {
  return (
    <div className="bg-blue-50 border-b border-gray-300 hidden md:block">
      <div className="container mx-auto flex items-center py-4">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="text-gray-700 font-medium">Departments</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg p-4 mt-2 rounded-lg">
              <Link href="#"><p className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Option 1</p></Link>
              <Link href="#"><p className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Option 2</p></Link>
            </div>
          </div>
          <div className="relative group">
            <button className="text-gray-700 font-medium">Services</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg p-4 mt-2 rounded-lg">
              <Link href="#"><p className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Service 1</p></Link>
              <Link href="#"><p className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Service 2</p></Link>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 ml-auto text-gray-700">
          <Link href="#"><p>Summer Savings</p></Link>
          <Link href="#"><p>Grocery & Essentials</p></Link>
          <Link href="#"><p>Back To School</p></Link>
          <Link href="#"><p>Home</p></Link>
          <Link href="#"><p>Electronics</p></Link>
          <Link href="#"><p>Fashion</p></Link>
        </div>
      </div>
    </div>
  );
}

export default SecondaryNavbar;
