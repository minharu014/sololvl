import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
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
      <Hero />
      <div id="map" className="bg-gray-900 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            Locations & Gates
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <HuntersMap />
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
