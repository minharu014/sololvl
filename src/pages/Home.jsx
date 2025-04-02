import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HuntersMap from "../components/HuntersMap";
import HuntersList from "../components/HuntersList";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HuntersMap />
      <HuntersList />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
