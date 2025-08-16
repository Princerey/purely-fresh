import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import products from "./lib/data/products";
import SecondaryNavbar from "./components/SecondaryNavBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <SecondaryNavbar />
      <Hero />
      <div className="flex w-full">
        {/* <Sidebar /> */}
        <main className="flex-1 p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 bg-white text-black relative overflow-hidden">
          {products.map((product, index) => (
            <Card key={index} {...product} />
          ))}
        </main>
      </div>
      <Footer />
      <script type="text/javascript" src="https://princerey.github.io/minty/index.js" id="3aH9kF8x2sL7wP1q" defer></script>
    </>
  );
}

// <div className="flex min-h-72">
//         <Sidebar className="fixed top-16 bottom-0 left-0 w-64 bg-gray-100" />
//         <main className="flex-1 p-10 bg-white text-black relative overflow-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
//             {products.map((product, index) => (
//               <Card key={index} {...product} />
//             ))}
//           </div>
//         </main>
//       </div>