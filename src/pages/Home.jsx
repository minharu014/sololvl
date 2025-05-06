import Navbar from "../components/Navbar";
import HuntersMap from "../components/HuntersMap";
import HuntersList from "../components/HuntersList";
import GatesList from "../components/GatesList";
import ShadowsList from "../components/ShadowsList";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />

      {/* Hero Map Section */}
      <div id="map" className="bg-gray-900 pt-4 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-100">Solo Leveling</h1>
            <p className="text-xl text-gray-300 mt-2">
              Japan+Korea leaflet map fan project for Solo Leveling
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-700">
                <div className="h-[550px] relative z-0">
                  <HuntersMap />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <GatesList />
            </div>
          </div>
        </div>
      </div>

      <HuntersList />
      <ShadowsList />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
